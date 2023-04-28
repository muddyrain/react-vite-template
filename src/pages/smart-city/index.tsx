import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Fragment = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
      </mesh>
      {/* 添加轨道控制器 */}
      <OrbitControls />
    </Canvas>
  )
}

export default Fragment
