import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { config } from './config'
import { FinalMessage } from './components/FinalMessage'
import { FloatingParticles } from './components/FloatingParticles'
import { FlowerGarden } from './components/FlowerGarden'
import { IntroScreen } from './components/IntroScreen'
import { LoveLetter } from './components/LoveLetter'
import { MusicPlayer } from './components/MusicPlayer'
import { useFlowers } from './hooks/useFlowers'

const story = [
  <>Dicen que el 21 de septiembre<br />se regalan flores amarillas...</>,
  <>Pero algunas personas<br /><em>merecen un jardín entero.</em></>,
  <>{config.mainMessage}</>,
]

function App() {
  const [started, setStarted] = useState(false)
  const [storyIndex, setStoryIndex] = useState(-1)
  const [letterOpen, setLetterOpen] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)
  const [gardenGlow, setGardenGlow] = useState(false)
  const [musicSignal, setMusicSignal] = useState(0)
  const [burst, setBurst] = useState<{ x: number; y: number; nonce: number } | null>(null)
  const { flowers, count, surprise, specialTaps, collectFlower, addFlower, celebrate } = useFlowers()

  useEffect(() => {
    if (!started) return
    const timers = [
      window.setTimeout(() => setStoryIndex(0), 3200),
      window.setTimeout(() => setStoryIndex(1), 7000),
      window.setTimeout(() => setStoryIndex(2), 10400),
      window.setTimeout(() => { setStoryIndex(-1); setFinalVisible(true) }, 16500),
      window.setTimeout(() => setGardenGlow(true), 19500),
      window.setTimeout(() => setGardenGlow(false), 23500),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [started])

  const start = () => { setStarted(true); setMusicSignal((value) => value + 1) }

  const collect = (special: boolean, x: number, y: number) => {
    collectFlower(special)
    setBurst({ x, y, nonce: Date.now() })
    if (special) window.setTimeout(() => celebrate(config.specialMessage, 3500), 2900)
  }

  const replay = () => {
    setStoryIndex(-1); setFinalVisible(false); setGardenGlow(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => setStoryIndex(0), 600)
    window.setTimeout(() => setStoryIndex(1), 4000)
    window.setTimeout(() => setStoryIndex(2), 7200)
    window.setTimeout(() => { setStoryIndex(-1); setFinalVisible(true) }, 10800)
  }

  const share = async () => {
    const data = { title: 'Un jardín para ti 💛', text: 'Tengo un pequeño regalo de flores amarillas para ti 🌻', url: window.location.href }
    try {
      if (navigator.share) await navigator.share(data)
      else { await navigator.clipboard.writeText(window.location.href); celebrate('Enlace copiado. Ya puedes compartirlo 💛') }
    } catch { /* The user may cancel the native share dialog. */ }
  }

  return (
    <main className="experience-shell">
      <AnimatePresence mode="wait">{!started && <IntroScreen key="intro" onOpen={start} />}</AnimatePresence>
      {started && (
        <motion.div className="experience" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}>
          <FlowerGarden flowers={flowers} count={count} surprise={surprise} glow={gardenGlow} onCollect={collect} onAdd={addFlower} />
          <MusicPlayer startSignal={musicSignal} />
          <div className="story-panel" aria-live="polite">
            <AnimatePresence mode="wait">
              {storyIndex >= 0 && <motion.div key={storyIndex} className={`story-line story-${storyIndex}`} initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }} transition={{ duration: 1 }}>{story[storyIndex]}</motion.div>}
            </AnimatePresence>
          </div>
          <LoveLetter open={letterOpen} onOpen={() => setLetterOpen(true)} onClose={() => setLetterOpen(false)} onHeart={() => celebrate('Este ya tiene dueña/o. 💛', 3200)} />
          <FinalMessage visible={finalVisible} onReplay={replay} onShare={share} />
          {specialTaps > 0 && <div className="special-found" aria-hidden="true" />}
        </motion.div>
      )}
      <FloatingParticles burst={burst} />
    </main>
  )
}

export default App
