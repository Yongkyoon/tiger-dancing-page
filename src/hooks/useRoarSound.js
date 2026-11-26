import { useCallback, useEffect, useRef } from 'react'

// 음원 파일 없이 Web Audio로 "어흥" 포효 소리를 합성한다.
// 낮은 톱니파(성대) + 숨소리 노이즈 + 으르렁 떨림(AM) + 약한 왜곡
const DURATION = 1.3

function makeDistortion(ctx, amount = 30) {
  const curve = new Float32Array(1024)
  for (let i = 0; i < curve.length; i++) {
    const x = (i / (curve.length - 1)) * 2 - 1
    curve[i] = ((1 + amount) * x) / (1 + amount * Math.abs(x))
  }
  const shaper = ctx.createWaveShaper()
  shaper.curve = curve
  shaper.oversample = '2x'
  return shaper
}

function makeNoise(ctx) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * DURATION, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ctx.createBufferSource()
  src.buffer = buffer
  return src
}

function playRoar(ctx, volume) {
  const t = ctx.currentTime
  const end = t + DURATION

  // 최종 볼륨 엔벨로프
  const master = ctx.createGain()
  master.gain.setValueAtTime(0.0001, t)
  master.gain.exponentialRampToValueAtTime(volume, t + 0.12)
  master.gain.setValueAtTime(volume, t + 0.45)
  master.gain.exponentialRampToValueAtTime(0.0001, end)
  master.connect(ctx.destination)

  // 입 모양처럼 열렸다 닫히는 저역 필터
  const mouth = ctx.createBiquadFilter()
  mouth.type = 'lowpass'
  mouth.Q.value = 4
  mouth.frequency.setValueAtTime(500, t)
  mouth.frequency.exponentialRampToValueAtTime(1800, t + 0.25)
  mouth.frequency.exponentialRampToValueAtTime(350, end)
  mouth.connect(master)

  const grit = makeDistortion(ctx)
  grit.connect(mouth)

  // 으르렁 떨림: 성대음의 진폭을 빠르게 흔든다
  const growl = ctx.createGain()
  growl.gain.value = 0.6
  growl.connect(grit)
  const lfo = ctx.createOscillator()
  lfo.frequency.setValueAtTime(28, t)
  lfo.frequency.linearRampToValueAtTime(18, end)
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 0.4
  lfo.connect(lfoDepth).connect(growl.gain)

  // 성대음 (두 개를 살짝 어긋나게 겹쳐 두껍게)
  const voices = [0, 7].map((detune) => {
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.detune.value = detune * 10
    osc.frequency.setValueAtTime(85, t)
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.22)
    osc.frequency.exponentialRampToValueAtTime(55, end)
    osc.connect(growl)
    return osc
  })

  // 숨소리
  const noise = makeNoise(ctx)
  const breath = ctx.createBiquadFilter()
  breath.type = 'bandpass'
  breath.frequency.value = 600
  breath.Q.value = 0.8
  const breathGain = ctx.createGain()
  breathGain.gain.value = 0.35
  noise.connect(breath).connect(breathGain).connect(mouth)

  ;[lfo, ...voices, noise].forEach((node) => {
    node.start(t)
    node.stop(end + 0.05)
  })
}

export function useRoarSound() {
  const ctxRef = useRef(null)

  const play = useCallback((volume = 0.7) => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    // 브라우저 정책상 사용자 클릭/키 입력 이후에 생성·재개해야 소리가 난다
    if (!ctxRef.current) ctxRef.current = new AudioCtx()
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()
    playRoar(ctx, volume)
  }, [])

  useEffect(
    () => () => {
      ctxRef.current?.close()
      ctxRef.current = null
    },
    [],
  )

  return play
}
