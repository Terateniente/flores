const bokeh = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  x: (index * 41 + 9) % 100,
  y: 10 + ((index * 31) % 75),
  size: 18 + (index % 5) * 13,
  delay: (index % 7) * -1.25,
  duration: 7 + (index % 5) * 1.6,
}))

export function ImmersiveAtmosphere() {
  return (
    <div className="immersive-atmosphere" aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="cloud-layer cloud-back"><i /><i /><i /></div>
      <div className="cloud-layer cloud-front"><i /><i /></div>
      <div className="light-beam beam-one" />
      <div className="light-beam beam-two" />
      <div className="lens-flare"><i /><i /><i /></div>
      <div className="shooting-stars"><i /><i /><i /></div>
      <div className="bokeh-field">
        {bokeh.map((orb) => (
          <i key={orb.id} style={{ left: `${orb.x}%`, top: `${orb.y}%`, width: orb.size, height: orb.size, animationDelay: `${orb.delay}s`, animationDuration: `${orb.duration}s` }} />
        ))}
      </div>
      <div className="cinema-vignette" />
    </div>
  )
}
