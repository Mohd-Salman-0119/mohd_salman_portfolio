"use client"

import { useRef, useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

export default function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })

  

  useEffect(() => {
    setIsClient(true)

    const mobileCheck =
      window.innerWidth < 768 ||
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    setIsMobile(mobileCheck)
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
        camera.position.z = 30

        // Initialize renderer
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

        // Create stars
        const starGeometry = new THREE.BufferGeometry()
        const starCount = 1000 // Reduced for better performance
        const starPositions = new Float32Array(starCount * 3)
        const starSizes = new Float32Array(starCount)

        for (let i = 0; i < starCount * 3; i += 3) {
          // Create a sphere of stars
          const radius = 30
          const theta = Math.random() * Math.PI * 2
          const phi = Math.acos(2 * Math.random() - 1)

          starPositions[i] = radius * Math.sin(phi) * Math.cos(theta)
          starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
          starPositions[i + 2] = radius * Math.cos(phi)

          // Random star sizes
          starSizes[i / 3] = Math.random() * 2 + 0.5
        }

        starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
        starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))

        // Create shader material for stars
        const starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color(0xffcc00) },
          },
          vertexShader: `
            attribute float size;
            uniform float time;
            varying float vSize;
            
            void main() {
              vSize = size;
              // Add subtle movement to stars
              vec3 pos = position;
              pos.x += sin(time * 0.1 + position.z * 0.5) * 0.2;
              pos.y += cos(time * 0.1 + position.x * 0.5) * 0.2;
              pos.z += sin(time * 0.1 + position.y * 0.5) * 0.2;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z) * (0.7 + 0.3 * sin(time + position.x * 10.0));
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            uniform vec3 color;
            uniform float time;
            varying float vSize;
            
            void main() {
              // Create circular points
              vec2 center = gl_PointCoord - vec2(0.5);
              float dist = length(center);
              if (dist > 0.5) discard;
              
              // Add glow effect
              float strength = 1.0 - dist * 2.0;
              strength = pow(strength, 1.5);
              
              // Add twinkling effect
              float twinkle = 0.8 + 0.2 * sin(time * 3.0 + vSize * 10.0);
              
              gl_FragColor = vec4(color * strength * twinkle, strength);
            }
          `,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })

        const stars = new THREE.Points(starGeometry, starMaterial)
        scene.add(stars)

        // Create nebula clouds - reduced for better performance
        const nebulaCount = 3
        const nebulae: any = []

        for (let i = 0; i < nebulaCount; i++) {
          const nebulaGeometry = new THREE.BufferGeometry()
          const nebulaParticleCount = 300
          const nebulaPositions = new Float32Array(nebulaParticleCount * 3)
          const nebulaSizes = new Float32Array(nebulaParticleCount)
          const nebulaColors = new Float32Array(nebulaParticleCount * 3)

          // Create a cloud of particles
          const centerX = (Math.random() - 0.5) * 20
          const centerY = (Math.random() - 0.5) * 20
          const centerZ = (Math.random() - 0.5) * 20
          const nebulaRadius = Math.random() * 5 + 3

          // Choose a color for this nebula
          const hue = Math.random()
          const nebulaColor = new THREE.Color().setHSL(hue, 1, 0.5)

          for (let j = 0; j < nebulaParticleCount * 3; j += 3) {
            // Create a gaussian distribution of particles
            let x, y, z
            const gaussianRand = () => {
              let u = 0,
                v = 0
              while (u === 0) u = Math.random()
              while (v === 0) v = Math.random()
              return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
            }

            x = gaussianRand() * nebulaRadius + centerX
            y = gaussianRand() * nebulaRadius + centerY
            z = gaussianRand() * nebulaRadius + centerZ

            nebulaPositions[j] = x
            nebulaPositions[j + 1] = y
            nebulaPositions[j + 2] = z

            // Random particle sizes
            nebulaSizes[j / 3] = Math.random() * 3 + 1

            // Slightly vary the color
            const colorVariation = Math.random() * 0.2 - 0.1
            const particleColor = new THREE.Color().setHSL((hue + colorVariation) % 1, 1, 0.5 + Math.random() * 0.3)

            nebulaColors[j] = particleColor.r
            nebulaColors[j + 1] = particleColor.g
            nebulaColors[j + 2] = particleColor.b
          }

          nebulaGeometry.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3))
          nebulaGeometry.setAttribute("size", new THREE.BufferAttribute(nebulaSizes, 1))
          nebulaGeometry.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3))

          // Create shader material for nebula
          const nebulaMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
            },
            vertexShader: `
              attribute float size;
              attribute vec3 color;
              uniform float time;
              varying vec3 vColor;
              varying float vSize;
              
              void main() {
                vColor = color;
                vSize = size;
                // Add subtle movement to nebula
                vec3 pos = position;
                float movement = sin(time * 0.2 + position.x * 0.1) * cos(time * 0.1 + position.y * 0.1);
                pos.x += movement * 0.3;
                pos.y += movement * 0.2;
                pos.z += movement * 0.3;
                
                vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
              }
            `,
            fragmentShader: `
              varying vec3 vColor;
              varying float vSize;
              uniform float time;
              
              void main() {
                // Create soft circular points
                vec2 center = gl_PointCoord - vec2(0.5);
                float dist = length(center);
                if (dist > 0.5) discard;
                
                // Add glow effect
                float strength = 1.0 - dist * 2.0;
                strength = pow(strength, 1.5);
                
                // Add pulsing effect
                float pulse = 0.9 + 0.1 * sin(time + vSize);
                
                gl_FragColor = vec4(vColor * strength * pulse, strength * 0.7);
              }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })

          const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
          scene.add(nebula)
          nebulae.push({
            points: nebula,
            geometry: nebulaGeometry,
            material: nebulaMaterial,
            centerX,
            centerY,
            centerZ,
            radius: nebulaRadius,
            rotationSpeed: Math.random() * 0.001 + 0.0005,
          })
        }

        // Handle mouse movement with throttling
        let lastMouseMoveTime = 0
        const handleMouseMove = (event: any) => {
          const now = performance.now()
          if (now - lastMouseMoveTime < 50) return // Throttle to 20fps
          lastMouseMoveTime = now

          if (!containerRef.current) return

          // Calculate normalized mouse position (-1 to 1)
          const rect = containerRef.current.getBoundingClientRect()
          mousePosition.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mousePosition.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true })

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

        const animate = (currentTime: any) => {
          if (currentTime - lastFrameTime < frameInterval) {
            frameId = requestAnimationFrame(animate)
            return
          }

          lastFrameTime = currentTime
          time += 0.01

          // Update star shader time uniform
          starMaterial.uniforms.time.value = time

          // Rotate stars slowly
          stars.rotation.y += 0.0003
          stars.rotation.x += 0.0001

          // Update nebula shader time uniforms and rotate
          nebulae.forEach((nebula: any) => {
            nebula.material.uniforms.time.value = time
            nebula.points.rotation.y += nebula.rotationSpeed
            nebula.points.rotation.z += nebula.rotationSpeed * 0.7
          })

          // Camera movement based on mouse position - smoother
          camera.position.x += (mousePosition.current.x * 5 - camera.position.x) * 0.01
          camera.position.y += (mousePosition.current.y * 5 - camera.position.y) * 0.01
          camera.lookAt(scene.position)

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
          window.removeEventListener("mousemove", handleMouseMove)

          // Dispose resources
          starGeometry.dispose()
          starMaterial.dispose()

          nebulae.forEach((nebula: any) => {
            nebula.geometry.dispose()
            nebula.material.dispose()
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
  }, [isClient])

  // If mobile, return a simple animated background instead of Three.js
  if (isMobile) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black ${className}`}>
        {/* Simple animated background for mobile */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-yellow-400/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-300/10 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    )
  }


  if (error) {
    return (
      <div className={`w-full h-full fallback-background ${className}`}>
        {/* Fallback stars */}
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-yellow-500 animate-twinkle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`,
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
