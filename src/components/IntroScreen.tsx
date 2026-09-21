import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { config } from '../config'
import { Fireflies } from './Fireflies'

export function IntroScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section className="intro-screen" exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.08 }} transition={{ duration: 1.1 }}>
      <div className="intro-aurora" />
      <Fireflies intro />
      <motion.div className="intro-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.25 }}>
        <motion.div className="intro-flower-mark" animate={{ rotate: [0, 4, -3, 0], y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>🌻</motion.div>
        <span className="eyebrow">21 · SEPTIEMBRE</span>
        <h1>Para ti<span className="gold-dot">.</span></h1>
        <p>Hola, {config.recipientName}.<br />Tengo algo especial que mostrarte.</p>
        <motion.button className="open-gift" onClick={onOpen} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Sparkles size={18} />
          Abrir mi regalo
          <span className="button-shine" />
        </motion.button>
        <span className="intro-signature">Hecho con cariño por {config.senderName}</span>
      </motion.div>
    </motion.section>
  )
}
