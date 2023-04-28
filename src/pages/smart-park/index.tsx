import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Park from './Park'
const Fragment = () => {
  return (
    <Canvas shadows gl={{ antialias: true, logarithmicDepthBuffer: true }} camera={{ position: [1000, 1000, 1000], near: 1, far: 100000 }}>
      <Park />
      {/* 轨道控制器 */}
      <OrbitControls />
      {/* 引入环境 */}
      <Environment background preset='park' />
    </Canvas>
  )
}

export default Fragment
