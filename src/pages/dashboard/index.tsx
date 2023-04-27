import { FC, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import World from './World'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { useWorldStore } from '@/store/world'

const Fragment: FC = () => {
  // 物理世界颜色
  const color = useWorldStore((state) => state.color)
  return (
    <div className='w-screen h-screen'>
      <Canvas
        shadows
        gl={{ antialias: true, logarithmicDepthBuffer: true, outputEncoding: sRGBEncoding, toneMapping: ACESFilmicToneMapping }}
        camera={{ position: [5, 10, 10] }}
      >
        {/* 雾 */}
        <fog attach='fog' args={[color, 10, 50]} />
        {/* 颜色 */}
        <color attach='background' args={[color]} />
        {/* 物理世界 */}
        <World />
        {/* 轨道控制器 */}
        <OrbitControls />
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        {/* 点光源 */}
        <pointLight intensity={1} position={[50, 50, 50]} />
        {/* 环境贴图 */}
        {/* <Environment files={'./023.hdr'} background /> */}
        {/* 直线光 */}
        {/* <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} /> */}
        {/* 帧率显示器 */}
        <Stats />
        {/* 辅助控制器 */}
        <axesHelper args={[25]} />
        <Suspense fallback={null}>
          <Environment preset='night' />
        </Suspense>
      </Canvas>
    </div>
  )
}
export default Fragment
