import tigerSvg from '../assets/images/tiger.svg?raw'

export default function Tiger({ isPlaying, move, speed, isRoaring, onRoar }) {
  const className = [
    'tiger',
    `move-${move}`,
    isPlaying ? 'is-playing' : 'is-paused',
    isRoaring ? 'is-roaring' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="tiger-stage">
      <p className={`roar-bubble ${isRoaring ? 'show' : ''}`} aria-hidden="true">
        어흥!
      </p>
      <button
        type="button"
        className={className}
        style={{ '--speed': speed }}
        onClick={onRoar}
        aria-label="호랑이를 눌러 포효시키기"
      >
        <span className="tiger-mover" dangerouslySetInnerHTML={{ __html: tigerSvg }} />
      </button>
    </div>
  )
}
