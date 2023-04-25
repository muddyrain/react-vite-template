import { FC } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import World from './world'

const Fragment: FC = () => {
  return (
    <div className='w-screen h-screen'>
      <Canvas shadows gl={{ antialias: true, logarithmicDepthBuffer: true }} camera={{ position: [5, 10, 10] }}>
        {/* 物理世界 */}
        <World />
        {/* 轨道控制器 */}
        <OrbitControls />
        {/* 环境光 */}
        <ambientLight />
        {/* 点光源 */}
        <pointLight position={[10, 10, 10]} />
        {/* 环境贴图 */}
        <Environment files={'./023.hdr'} background />
        {/* 帧率显示器 */}
        <Stats />
      </Canvas>
    </div>
  )
}
export default Fragment
