import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Mail, X } from 'lucide-react'
import { config } from '../config'

interface LoveLetterProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
  onHeart: () => void
}

export function LoveLetter({ open, onOpen, onClose, onHeart }: LoveLetterProps) {
  return (
    <>
      <motion.button className="letter-trigger glass-button" type="button" onClick={onOpen} whileTap={{ scale: 0.95 }}>
        <Mail size={17} /> Tengo algo que decirte
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div className="letter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <button className="close-letter" type="button" onClick={onClose} aria-label="Cerrar carta"><X size={21} /></button>
            <motion.div className="envelope" initial={{ y: 80, scale: 0.75, rotateX: 18 }} animate={{ y: 0, scale: 1, rotateX: 0 }} exit={{ y: 60, scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 18 }} onClick={(event) => event.stopPropagation()}>
              <div className="envelope-back" />
              <motion.article className="letter-paper" initial={{ y: 80, zIndex: 3 }} animate={{ y: -55, zIndex: 6 }} transition={{ delay: 0.6, duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}>
                <span className="letter-kicker">PARA {config.recipientName.toUpperCase()}</span>
                <h2>Unas palabras para ti</h2>
                <p>{config.letterMessage}</p>
                <div className="letter-signature">Con cariño,<br /><strong>{config.senderName}</strong></div>
                <button type="button" className="heart-seal" onClick={onHeart} aria-label="Tocar el corazón"><Heart size={18} fill="currentColor" /></button>
              </motion.article>
              <div className="envelope-front" />
              <motion.div className="envelope-flap" initial={{ rotateX: 0 }} animate={{ rotateX: 180 }} transition={{ delay: 0.22, duration: 0.65 }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
