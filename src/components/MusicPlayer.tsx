import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { config } from '../config'

export function MusicPlayer({ startSignal }: { startSignal: number }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!startSignal || !audioRef.current) return
    audioRef.current.volume = 0.34
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [startSignal])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => undefined)
    else { audio.pause(); setPlaying(false) }
  }

  return (
    <div className="music-control">
      <audio ref={audioRef} src={config.musicUrl} loop preload="auto" />
      <button type="button" onClick={toggle} aria-label={playing ? 'Silenciar música' : 'Reproducir música'}>
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <span>{playing ? 'Nuestra melodía' : 'Música pausada'}</span>
    </div>
  )
}
