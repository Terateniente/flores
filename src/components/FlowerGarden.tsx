import { AnimatePresence, motion } from 'framer-motion'
import { Flower2, Plus, Sparkles } from 'lucide-react'
import type { FlowerData } from '../config'
import { Flower } from './Flower'
import { Fireflies } from './Fireflies'
import { PetalRain } from './PetalRain'

interface FlowerGardenProps {
  flowers: FlowerData[]
  count: number
  surprise: string | null
  glow: boolean
  onCollect: (special: boolean, x: number, y: number) => void
  onAdd: () => void
}

export function FlowerGarden({ flowers, count, surprise, glow, onCollect, onAdd }: FlowerGardenProps) {
  return (
    <div className="garden-scene">
      <div className="sky-grain" />
      <div className="sunset-sun" />
      <div className="distant-hills hill-one" />
      <div className="distant-hills hill-two" />
      <Fireflies />
      <PetalRain />
      <motion.div className="flower-counter" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }}>
        <Flower2 size={16} /><span>Flores para ti</span><strong>{count}</strong>
      </motion.div>
      <div className="garden-bed">
        <div className="ground-glow" />
        {flowers.map((flower) => <Flower key={flower.id} flower={flower} active={glow} onCollect={onCollect} />)}
        <div className="foreground-grass" />
      </div>
      <motion.button className="add-flower" type="button" onClick={onAdd} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.94 }}>
        <span><Plus size={16} /></span> Regalar otra flor
      </motion.button>
      <AnimatePresence mode="wait">
        {surprise && (
          <motion.div className="surprise-toast" key={surprise} initial={{ opacity: 0, y: 22, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.95 }}>
            <Sparkles size={17} /> {surprise}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
