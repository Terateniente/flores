import { motion } from 'framer-motion'
import type { CSSProperties, MouseEvent } from 'react'
import type { FlowerData } from '../config'

interface FlowerProps {
  flower: FlowerData
  active: boolean
  onCollect: (special: boolean, x: number, y: number) => void
}

const Petals = ({ kind }: { kind: FlowerData['kind'] }) => {
  const count = kind === 'sunflower' ? 18 : kind === 'daisy' ? 14 : kind === 'wildflower' ? 10 : 6
  return (
    <span className={`flower-head ${kind}`}>
      <span className="petal-ring">
        {Array.from({ length: count }).map((_, index) => (
          <i key={index} className="petal" style={{ '--petal-index': index, '--petal-count': count } as CSSProperties} />
        ))}
      </span>
      <span className="flower-center"><i /></span>
    </span>
  )
}

export function Flower({ flower, active, onCollect }: FlowerProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    onCollect(Boolean(flower.special), rect.left + rect.width / 2, rect.top + rect.height / 3)
  }

  return (
    <motion.button
      type="button"
      className={`flower flower-${flower.kind} ${flower.special ? 'is-special' : ''} ${active ? 'garden-glow' : ''}`}
      style={{
        left: `${flower.x}%`, height: `${flower.height}px`, zIndex: flower.depth,
        '--flower-scale': flower.scale, '--grow-delay': `${flower.delay}s`,
        '--sway-duration': `${3.5 + (flower.id % 4) * 0.45}s`,
      } as CSSProperties}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ delay: flower.delay, duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      aria-label={flower.special ? 'Flor especial. Tócala para descubrir una sorpresa.' : `Recoger ${flower.kind}`}
    >
      {flower.special && <span className="special-halo" aria-hidden="true" />}
      <span className="sway-wrap">
        <Petals kind={flower.kind} />
        <span className="stem"><i className="leaf leaf-left" /><i className="leaf leaf-right" /></span>
      </span>
    </motion.button>
  )
}
