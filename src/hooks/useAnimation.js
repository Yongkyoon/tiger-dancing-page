import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoarSound } from './useRoarSound.js'

export const MOVES = [
  { id: 'prowl', label: '어슬렁', key: '1' },
  { id: 'jump', label: '점프', key: '2' },
  { id: 'spin', label: '빙글빙글', key: '3' },
  { id: 'dance', label: '흔들흔들', key: '4' },
]

export const SPEED_MIN = 0.5
export const SPEED_MAX = 2
export const SPEED_STEP = 0.25

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const clampSpeed = (v) =>
  Math.min(SPEED_MAX, Math.max(SPEED_MIN, Math.round(v / SPEED_STEP) * SPEED_STEP))

export function useAnimation() {
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const [move, setMove] = useState('prowl')
  const [speed, setSpeedState] = useState(1)
  const [isRoaring, setIsRoaring] = useState(false)
  const [roarCount, setRoarCount] = useState(0)
  const [soundOn, setSoundOn] = useState(true)
  const roarTimer = useRef(null)
  const playRoar = useRoarSound()
  const soundOnRef = useRef(soundOn)
  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

  const toggleSound = useCallback(() => setSoundOn((s) => !s), [])

  const toggle = useCallback(() => setIsPlaying((p) => !p), [])
  const setSpeed = useCallback((v) => setSpeedState(clampSpeed(v)), [])

  const roar = useCallback(() => {
    clearTimeout(roarTimer.current)
    setIsRoaring(true)
    if (soundOnRef.current) playRoar()
    setRoarCount((c) => c + 1)
    roarTimer.current = setTimeout(() => setIsRoaring(false), 1200)
  }, [playRoar])

  useEffect(() => () => clearTimeout(roarTimer.current), [])

  // 키보드 단축키: Space 재생/정지, R 포효, M 소리, 1~4 동작, +/- 속도
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return
      if (tag === 'BUTTON' && (e.key === ' ' || e.key === 'Enter')) return

      const found = MOVES.find((m) => m.key === e.key)
      if (found) {
        setMove(found.id)
        setIsPlaying(true)
      } else if (e.key === ' ') {
        e.preventDefault()
        toggle()
      } else if (e.key === 'r' || e.key === 'R') {
        roar()
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound()
      } else if (e.key === '+' || e.key === '=') {
        setSpeedState((s) => clampSpeed(s + SPEED_STEP))
      } else if (e.key === '-' || e.key === '_') {
        setSpeedState((s) => clampSpeed(s - SPEED_STEP))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, roar, toggleSound])

  return { isPlaying, toggle, move, setMove, speed, setSpeed, isRoaring, roar, roarCount, soundOn, toggleSound }
}
