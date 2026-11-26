export default function Scene({ isPlaying }) {
  return (
    <div className={`scene ${isPlaying ? 'is-playing' : 'is-paused'}`} aria-hidden="true">
      <div className="sun" />
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <svg className="mountains" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0 300 L0 180 L160 80 L300 190 L460 60 L640 200 L820 90 L1000 210 L1200 110 L1200 300 Z" fill="#c9773a" opacity="0.45" />
        <path d="M0 300 L0 230 L220 140 L420 240 L600 150 L800 250 L1000 160 L1200 240 L1200 300 Z" fill="#a85a2a" opacity="0.5" />
      </svg>
      <svg className="jungle jungle-left" viewBox="0 0 200 400">
        <path d="M40 400 C50 300 30 220 60 120" stroke="#5b3a1e" strokeWidth="14" fill="none" />
        <path className="leaf" d="M60 120 C0 100 -20 60 -10 30 C30 50 50 80 60 120 Z" fill="#2f6b3a" />
        <path className="leaf" d="M60 120 C110 80 160 80 190 100 C150 130 100 130 60 120 Z" fill="#4c8c45" />
        <path className="leaf" d="M60 120 C60 60 90 20 130 0 C130 50 100 100 60 120 Z" fill="#1f4d2b" />
      </svg>
      <svg className="jungle jungle-right" viewBox="0 0 200 400">
        <path d="M160 400 C150 300 170 220 140 120" stroke="#5b3a1e" strokeWidth="14" fill="none" />
        <path className="leaf" d="M140 120 C200 100 220 60 210 30 C170 50 150 80 140 120 Z" fill="#2f6b3a" />
        <path className="leaf" d="M140 120 C90 80 40 80 10 100 C50 130 100 130 140 120 Z" fill="#4c8c45" />
        <path className="leaf" d="M140 120 C140 60 110 20 70 0 C70 50 100 100 140 120 Z" fill="#1f4d2b" />
      </svg>
      <div className="ground" />
    </div>
  )
}
