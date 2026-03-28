"use client"

import { useRef, useEffect, useState } from "react"

interface ThreeSceneProps {
  className?: string
  interactive?: boolean
}

export default function ThreeScene({ className = "", interactive = true }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Set isClient to true once component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let cleanup: (() => void) | undefined

    const initThree = async () => {
      try {
        // Dynamically import Three.js only on the client side
        const THREE = await import("three")

        if (!containerRef.current) return

        // Initialize scene
        const scene = new THREE.Scene()

        // Initialize camera
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.z = 15

        // Initialize renderer with optimized settings
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump", // Better performance
        })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setClearColor(0x000000, 0)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for better performance
        containerRef.current.appendChild(renderer.domElement)

        // Create particle groups with different behaviors - reduced particle count for better performance
        const particleGroups = []
        const colors = [0xffcc00, 0xff9900, 0xffffff]
        const particleCounts = [400, 300, 150] // Further reduced counts
        const speeds = [0.02, 0.03, 0.01]
        const sizes = [0.05, 0.03, 0.07]

        for (let i = 0; i < 3; i++) {
          const particlesGeometry = new THREE.BufferGeometry()
          const particlesCount = particleCounts[i]
          const posArray = new Float32Array(particlesCount * 3)

          for (let j = 0; j < particlesCount * 3; j++) {
            posArray[j] = (Math.random() - 0.5) * 30
          }

          particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

          const particlesMaterial = new THREE.PointsMaterial({
            size: sizes[i],
            color: colors[i],
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
          })

          const particles = new THREE.Points(particlesGeometry, particlesMaterial)
          scene.add(particles)

          particleGroups.push({
            particles,
            geometry: particlesGeometry,
            material: particlesMaterial,
            speed: speeds[i],
            originalPositions: [...posArray],
          })
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(1, 1, 1)
        scene.add(directionalLight)

        // Handle mouse movement with throttling for better performance
        let lastMouseMoveTime = 0
        const handleMouseMove = (event) => {
          const now = performance.now()
          if (now - lastMouseMoveTime < 50) return // Throttle to 20fps
          lastMouseMoveTime = now

          if (!containerRef.current) return

          // Calculate normalized mouse position (-1 to 1)
          const rect = containerRef.current.getBoundingClientRect()
          mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        }

        if (interactive) {
          window.addEventListener("mousemove", handleMouseMove, { passive: true })
        }

        // Handle resize with throttling
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
          clearTimeout(resizeTimeout)
          resizeTimeout = setTimeout(() => {
            if (!containerRef.current) return

            const width = containerRef.current.clientWidth
            const height = containerRef.current.clientHeight

            camera.aspect = width / height
            camera.updateProjectionMatrix()

            renderer.setSize(width, height)
          }, 100)
        }

        window.addEventListener("resize", handleResize)

        // Animation loop with optimized frame rate
        let frameId: number
        let time = 0
        let lastFrameTime = 0
        const targetFPS = 30
        const frameInterval = 1000 / targetFPS

        const animate = (currentTime) => {
          if (currentTime - lastFrameTime < frameInterval) {
            frameId = requestAnimationFrame(animate)
            return
          }

          lastFrameTime = currentTime
          time += 0.005

          // Animate each particle group differently
          particleGroups.forEach((group, index) => {
            // Rotate particles
            group.particles.rotation.x += 0.0003 * group.speed
            group.particles.rotation.y += 0.0005 * group.speed

            // Only apply complex animations to the first group for better performance
            if (index === 0) {
              const positions = group.particles.geometry.attributes.position.array as Float32Array
              for (let i = 0; i < positions.length; i += 9) {
                // Process every 3rd particle for better performance
                const originalX = group.originalPositions[i]
                const originalY = group.originalPositions[i + 1]
                const originalZ = group.originalPositions[i + 2]

                // Add wave effect
                positions[i] = originalX + Math.sin(time + originalX) * 0.3
                positions[i + 1] = originalY + Math.cos(time + originalY) * 0.3
                positions[i + 2] = originalZ + Math.sin(time + originalZ) * 0.3

                // Add mouse interaction
                if (interactive) {
                  const distX = originalX - mousePosition.current.x * 10
                  const distY = originalY - mousePosition.current.y * 10
                  const distance = Math.sqrt(distX * distX + distY * distY)

                  if (distance < 5) {
                    positions[i] += (mousePosition.current.x * 2 - originalX) * 0.03
                    positions[i + 1] += (mousePosition.current.y * 2 - originalY) * 0.03
                  }
                }
              }
              group.particles.geometry.attributes.position.needsUpdate = true
            }

            // Pulse effect
            if (index === 1) {
              const scale = 1 + Math.sin(time * 2) * 0.1
              group.particles.scale.set(scale, scale, scale)
            }

            // Simplified spiral effect for better performance
            if (index === 2 && time % 0.5 < 0.01) {
              // Only update occasionally
              const positions = group.particles.geometry.attributes.position.array as Float32Array
              for (let i = 0; i < positions.length; i += 9) {
                // Process every 3rd particle
                const originalX = group.originalPositions[i]
                const originalY = group.originalPositions[i + 1]
                const originalZ = group.originalPositions[i + 2]

                const angle =
                  time + Math.sqrt(originalX * originalX + originalY * originalY + originalZ * originalZ) * 0.1

                positions[i] = originalX * Math.cos(angle) - originalY * Math.sin(angle)
                positions[i + 1] = originalX * Math.sin(angle) + originalY * Math.cos(angle)
              }
              group.particles.geometry.attributes.position.needsUpdate = true
            }
          })

          renderer.render(scene, camera)
          frameId = requestAnimationFrame(animate)
        }

        animate(0)
        setIsLoaded(true)

        // Cleanup function
        cleanup = () => {
          cancelAnimationFrame(frameId)

          if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
          }

          window.removeEventListener("resize", handleResize)
          if (interactive) {
            window.removeEventListener("mousemove", handleMouseMove)
          }

          // Dispose resources
          particleGroups.forEach((group) => {
            group.geometry.dispose()
            group.material.dispose()
          })

          renderer.dispose()
        }
      } catch (err) {
        console.error("Failed to initialize Three.js:", err)
        setError("Failed to load 3D scene. Using fallback background.")

        // Create a fallback CSS animation background
        if (containerRef.current) {
          containerRef.current.innerHTML = ""
          containerRef.current.className = `${containerRef.current.className} fallback-background`
        }
      }
    }

    initThree()

    return () => {
      if (cleanup) cleanup()
    }
  }, [isClient, interactive])

  if (error) {
    return (
      <div className={`w-full h-full fallback-background ${className}`}>
        {/* Fallback particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500 animate-float"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              animationDuration: `${Math.random() * 6 + 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {!isLoaded && isClient && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}
    </div>
  )
}
