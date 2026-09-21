import { useEffect, useRef } from 'react'

export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const render = () => {
      currentX += (targetX - currentX) * 0.065
      currentY += (targetY - currentY) * 0.065
      element.style.setProperty('--look-x', currentX.toFixed(3))
      element.style.setProperty('--look-y', currentY.toFixed(3))
      frame = requestAnimationFrame(render)
    }

    const updatePointer = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2
      targetY = (event.clientY / window.innerHeight - 0.5) * 2
    }

    const updateOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return
      targetX = Math.max(-1, Math.min(1, event.gamma / 28))
      targetY = Math.max(-1, Math.min(1, (event.beta - 45) / 35))
    }

    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('deviceorientation', updateOrientation, { passive: true })
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('deviceorientation', updateOrientation)
    }
  }, [])

  return ref
}
