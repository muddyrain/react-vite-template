import { FC } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import World from './World'

const Fragment: FC = () => {
  return (
    <div className='w-screen h-screen'>
      <Canvas shadows gl={{ antialias: true, logarithmicDepthBuffer: true }} camera={{ position: [5, 10, 10] }}>
        {/* 物理世界 */}
        <World />
        {/* 轨道控制器 */}
        <OrbitControls />
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        {/* 点光源 */}
        <pointLight position={[10, 10, 10]} />
        {/* 环境贴图 */}
        {/* <Environment files={'./023.hdr'} background /> */}
        {/* 直线光 */}
        <directionalLight color='red' position={[0, 0, 5]} />
        {/* 帧率显示器 */}
        <Stats />
        {/* 辅助控制器 */}
        <axesHelper args={[25]} />
      </Canvas>
    </div>
  )
}
export default Fragment
