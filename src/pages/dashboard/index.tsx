import { FC, Suspense } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import World from './World'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'
import { useWorldStore } from '@/store/world'
import Light from './light'
import { useLoading } from './hooks/useLoading'
import Loading from './Loading'

const Fragment: FC = () => {
  // 物理世界颜色
  const color = useWorldStore((state) => state.color)
  useLoading()
  const process = useWorldStore((state) => state.process)
  return (
    <div className='w-screen h-screen'>
      <Canvas
        shadows
        gl={{ antialias: true, logarithmicDepthBuffer: true, outputEncoding: sRGBEncoding, toneMapping: ACESFilmicToneMapping, alpha: false }}
        camera={{ fov: 50, position: [5, 10, 10] }}
      >
        {/* 雾 */}
        {/* <fog attach='fog' args={[color, 10, 50]} /> */}
        {/* 颜色 */}
        <color attach='background' args={[color]} />
        {process >= 100 ? (
          <>
            {/* 物理世界 */}
            <World />
            {/* 光源 */}
            <Light />
            {/* 轨道控制器 */}
            <OrbitControls />
            {/* 环境贴图 */}
            {/* <Environment files={'./023.hdr'} background /> */}
            {/* 帧率显示器 */}
            <Stats />
            {/* 辅助控制器 */}
            <axesHelper args={[25]} />
            <Suspense fallback={null}>
              <Environment preset='night' />
            </Suspense>
          </>
        ) : (
          <Loading process={process} />
        )}
      </Canvas>
    </div>
  )
}
export default Fragment
