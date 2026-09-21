import { useCallback, useMemo, useState } from 'react'
import type { FlowerData, FlowerKind } from '../config'

const kinds: FlowerKind[] = ['sunflower', 'tulip', 'daisy', 'wildflower']

const initialFlowers: FlowerData[] = [
  { id: 1, kind: 'daisy', x: 4, scale: 0.75, delay: 1.5, height: 115, depth: 1 },
  { id: 2, kind: 'sunflower', x: 12, scale: 0.9, delay: 0.5, height: 190, depth: 2 },
  { id: 3, kind: 'tulip', x: 21, scale: 0.85, delay: 2.2, height: 145, depth: 1 },
  { id: 4, kind: 'wildflower', x: 29, scale: 0.72, delay: 1.1, height: 120, depth: 1 },
  { id: 5, kind: 'sunflower', x: 38, scale: 1.08, delay: 2.6, height: 220, depth: 3 },
  { id: 6, kind: 'daisy', x: 47, scale: 0.78, delay: 1.8, height: 135, depth: 1 },
  { id: 7, kind: 'sunflower', x: 56, scale: 1.25, delay: 0.9, height: 245, depth: 4, special: true },
  { id: 8, kind: 'tulip', x: 65, scale: 0.92, delay: 2.9, height: 155, depth: 2 },
  { id: 9, kind: 'wildflower', x: 73, scale: 0.68, delay: 1.3, height: 112, depth: 1 },
  { id: 10, kind: 'sunflower', x: 82, scale: 0.95, delay: 2.1, height: 200, depth: 3 },
  { id: 11, kind: 'daisy', x: 91, scale: 0.72, delay: 0.7, height: 130, depth: 1 },
  { id: 12, kind: 'tulip', x: 97, scale: 0.72, delay: 2.5, height: 125, depth: 1 },
]

const milestones: Record<number, string> = {
  5: 'Ya tienes un pequeño ramo 💛',
  10: 'Creo que necesitas un jardín.',
  20: 'Definitivamente mereces todas.',
}

export function useFlowers() {
  const [flowers, setFlowers] = useState<FlowerData[]>(initialFlowers)
  const [count, setCount] = useState(1)
  const [surprise, setSurprise] = useState<string | null>(null)
  const [specialTaps, setSpecialTaps] = useState(0)

  const celebrate = useCallback((message: string, duration = 2800) => {
    setSurprise(message)
    window.setTimeout(() => setSurprise((current) => current === message ? null : current), duration)
  }, [])

  const collectFlower = useCallback((special = false) => {
    setCount((current) => {
      const next = current + 1
      if (milestones[next]) celebrate(milestones[next], 3200)
      return next
    })
    if (special) {
      setSpecialTaps((current) => {
        const next = current + 1
        celebrate(next === 7 ? 'Sabía que ibas a seguir tocándola 😂💛' : 'Encontraste la flor más especial 🌻', next === 7 ? 4000 : 2800)
        return next
      })
    }
  }, [celebrate])

  const addFlower = useCallback(() => {
    setFlowers((current) => {
      const id = Math.max(...current.map((flower) => flower.id), 0) + 1
      return [...current, {
        id,
        kind: kinds[Math.floor(Math.random() * kinds.length)],
        x: 5 + Math.random() * 90,
        scale: 0.68 + Math.random() * 0.48,
        delay: 0,
        height: 120 + Math.random() * 100,
        depth: 2 + Math.floor(Math.random() * 3),
      }]
    })
    celebrate('Una flor nueva acaba de crecer para ti ✨', 2200)
  }, [celebrate])

  return useMemo(() => ({ flowers, count, surprise, specialTaps, collectFlower, addFlower, celebrate }), [flowers, count, surprise, specialTaps, collectFlower, addFlower, celebrate])
}
