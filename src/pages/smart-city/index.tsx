import { OrbitControls, useCubeTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import City from './City'
import { STATIC_SERVER_URL } from '@/constant'
import Scene from './Scene'

const Fragment = () => {
  return (
    <Canvas shadows gl={{ alpha: false }} camera={{ position: [5, 15, 50], far: 50000, near: 0.1 }}>
      <City />
      {/* 环境 */}
      <Scene />
      {/* 聚光灯 */}
      <spotLight intensity={1} />
      {/* 添加轨道控制器 */}
      <OrbitControls />
    </Canvas>
  )
}

export default Fragment
