import { motion } from 'framer-motion'
import { RotateCcw, Share2 } from 'lucide-react'
import type { CSSProperties } from 'react'

interface FinalMessageProps { visible: boolean; onReplay: () => void; onShare: () => void }

export function FinalMessage({ visible, onReplay, onShare }: FinalMessageProps) {
  if (!visible) return null
  return (
    <motion.section className="final-card" initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.1 }}>
      <div className="final-sparkles" aria-hidden="true">{Array.from({ length: 12 }).map((_, index) => <i key={index} style={{ '--spark': index } as CSSProperties} />)}</div>
      <motion.span className="final-small" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>Y por si nadie te lo dijo hoy...</motion.span>
      <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8 }}>Qué bonito es que existas<span>.</span></motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>Feliz 21 de septiembre 🌻</motion.p>
      <motion.div className="final-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }}>
        <button type="button" onClick={onReplay}><RotateCcw size={16} /> Volver a ver</button>
        <button type="button" className="share-button" onClick={onShare}><Share2 size={16} /> Compartir</button>
      </motion.div>
    </motion.section>
  )
}
