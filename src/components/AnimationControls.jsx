import { MOVES, SPEED_MAX, SPEED_MIN, SPEED_STEP } from '../hooks/useAnimation.js'

export default function AnimationControls({
  isPlaying,
  toggle,
  move,
  setMove,
  speed,
  setSpeed,
  roar,
  roarCount,
  soundOn,
  toggleSound,
}) {
  const currentMove = MOVES.find((m) => m.id === move)?.label

  return (
    <section className="controls" aria-label="애니메이션 제어">
      <div className="row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={toggle}
          aria-pressed={isPlaying}
          aria-keyshortcuts="Space"
        >
          {isPlaying ? '⏸ 정지' : '▶ 시작'}
        </button>
        <button type="button" className="btn btn-roar" onClick={roar} aria-keyshortcuts="R">
          🐯 어흥!
        </button>
        <button
          type="button"
          className="btn btn-sound"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-keyshortcuts="M"
          aria-label={soundOn ? '소리 끄기' : '소리 켜기'}
        >
          {soundOn ? '🔊' : '🔇'}
        </button>
      </div>

      <div className="move-group" role="group" aria-label="춤 동작 선택">
        {MOVES.map((m) => (
          <button
            key={m.id}
            type="button"
            className="move-btn"
            aria-pressed={move === m.id}
            aria-keyshortcuts={m.key}
            onClick={() => setMove(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label className="speed">
        속도
        <input
          type="range"
          min={SPEED_MIN}
          max={SPEED_MAX}
          step={SPEED_STEP}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          aria-valuetext={`${speed}배`}
        />
        <output>{speed.toFixed(2)}×</output>
      </label>

      <p className="roar-count" aria-live="polite">
        포효 {roarCount}회
      </p>

      <p className="visually-hidden" aria-live="polite">
        {isPlaying ? `${currentMove} 동작 재생 중` : '애니메이션 정지됨'}
      </p>
    </section>
  )
}
