const petals = Array.from({ length: 15 }, (_, index) => ({
  id: index, left: (index * 43 + 7) % 100, delay: (index % 9) * -1.1,
  duration: 9 + (index % 6) * 1.4, size: 7 + (index % 4) * 2,
}))

export function PetalRain() {
  return (
    <div className="petal-rain" aria-hidden="true">
      {petals.map((petal) => <i key={petal.id} style={{ left: `${petal.left}%`, width: petal.size, height: petal.size * 1.7, animationDelay: `${petal.delay}s`, animationDuration: `${petal.duration}s` }} />)}
    </div>
  )
}
