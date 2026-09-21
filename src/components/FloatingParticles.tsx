import { useEffect, useRef, useState } from 'react'

interface Particle { id: number; x: number; y: number; symbol: string }

export function FloatingParticles({ burst }: { burst: { x: number; y: number; nonce: number } | null }) {
  const [particles, setParticles] = useState<Particle[]>([])
  const idRef = useRef(0)
  const lastMove = useRef(0)

  const spawn = (x: number, y: number, symbols: string[], amount = 1) => {
    const created = Array.from({ length: amount }, () => ({ id: ++idRef.current, x: x + (Math.random() - 0.5) * 42, y: y + (Math.random() - 0.5) * 26, symbol: symbols[Math.floor(Math.random() * symbols.length)] }))
    setParticles((current) => [...current.slice(-34), ...created])
    window.setTimeout(() => setParticles((current) => current.filter((item) => !created.some((made) => made.id === item.id))), 1500)
  }

  useEffect(() => {
    if (burst) spawn(burst.x, burst.y, ['💛', '✨', '🌻', '•'], 12)
  }, [burst])

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || performance.now() - lastMove.current < 55) return
      lastMove.current = performance.now()
      spawn(event.clientX, event.clientY, ['✦', '·'])
    }
    const touch = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') spawn(event.clientX, event.clientY, ['💛', '🌼'], 3)
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', touch, { passive: true })
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', touch) }
  }, [])

  return <div className="interaction-particles" aria-hidden="true">{particles.map((particle) => <i key={particle.id} style={{ left: particle.x, top: particle.y }}>{particle.symbol}</i>)}</div>
}
