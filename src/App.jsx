import Layout from './components/Layout.jsx'
import Scene from './components/Scene.jsx'
import Tiger from './components/Tiger.jsx'
import AnimationControls from './components/AnimationControls.jsx'
import { useAnimation } from './hooks/useAnimation.js'

export default function App() {
  const anim = useAnimation()

  return (
    <>
      <Scene isPlaying={anim.isPlaying} />
      <Layout>
        <Tiger
          isPlaying={anim.isPlaying}
          move={anim.move}
          speed={anim.speed}
          isRoaring={anim.isRoaring}
          onRoar={anim.roar}
        />
        <AnimationControls {...anim} />
      </Layout>
    </>
  )
}
