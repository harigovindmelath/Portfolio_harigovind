import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface DottedSurfaceProps {
  className?: string
}

/**
 * Animated dot-grid background.
 * Tries Three.js / WebGL first; silently falls back to a pure-CSS version
 * when WebGL is unavailable (sandboxed environments, old browsers, etc.)
 */
export function DottedSurface({ className }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [webglFailed, setWebglFailed] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || webglFailed) return

    let frameId: number | null = null

    /** WebGL probe — cheap, no teardown needed */
    function isWebGLAvailable(): boolean {
      try {
        const c = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (c.getContext('webgl') || c.getContext('experimental-webgl'))
        )
      } catch {
        return false
      }
    }

    if (!isWebGLAvailable()) {
      setWebglFailed(true)
      return
    }

    let mounted = true

    async function setup() {
      try {
        const THREE = await import('three')
        if (!mounted || !container) return

        const SEPARATION = 150
        const AMOUNTX = 40
        const AMOUNTY = 60
        const { clientWidth, clientHeight } = container

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, clientWidth / clientHeight, 1, 10000)
        camera.position.set(0, 355, 1220)

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(clientWidth, clientHeight)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        const positions: number[] = []
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            positions.push(
              ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
              0,
              iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
            )
          }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        const material = new THREE.PointsMaterial({
          size: 8,
          color: 0x888888,
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true,
        })
        const points = new THREE.Points(geometry, material)
        scene.add(points)

        let count = 0
        const animate = () => {
          frameId = requestAnimationFrame(animate)
          const arr = geometry.attributes.position.array as Float32Array
          let i = 0
          for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
              arr[i * 3 + 1] =
                Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
              i++
            }
          }
          geometry.attributes.position.needsUpdate = true
          renderer.render(scene, camera)
          count += 0.1
        }
        animate()

        const onResize = () => {
          if (!container) return
          const w = container.clientWidth
          const h = container.clientHeight
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)

        return () => {
          window.removeEventListener('resize', onResize)
          if (frameId !== null) cancelAnimationFrame(frameId)
          renderer.dispose()
          geometry.dispose()
          material.dispose()
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
      } catch {
        if (mounted) setWebglFailed(true)
        return undefined
      }
    }

    let cleanup: (() => void) | undefined

    setup().then((fn) => {
      cleanup = fn
    })

    return () => {
      mounted = false
      if (frameId !== null) cancelAnimationFrame(frameId)
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* CSS fallback — a static animated dot pattern via SVG background */
  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--muted-foreground) / 0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          animation: 'dotPulse 6s ease-in-out infinite',
        }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
      aria-hidden="true"
    />
  )
}
