const fireflies = Array.from({ length: 22 }, (_, index) => ({
  id: index, left: (index * 37 + 11) % 96, top: 18 + ((index * 29) % 63),
  delay: (index % 8) * 0.65, duration: 4 + (index % 5) * 0.8, blur: index % 4 === 0,
}))

export function Fireflies({ intro = false }: { intro?: boolean }) {
  return (
    <div className={`fireflies ${intro ? 'intro-fireflies' : ''}`} aria-hidden="true">
      {fireflies.map((fly) => <i key={fly.id} className={fly.blur ? 'soft' : ''} style={{ left: `${fly.left}%`, top: `${fly.top}%`, animationDelay: `${fly.delay}s`, animationDuration: `${fly.duration}s` }} />)}
    </div>
  )
}
