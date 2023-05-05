import {
  CameraControls,
  Environment,
  FirstPersonControls,
  FlyControls,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  PivotControls,
  PresentationControls,
  ScrollControls,
  Stats,
  TransformControls
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import Park from './Park'
import { useWorldStore } from './useWorldStore'
const Fragment = () => {
  // { position: [1000, 1000, 1000], near: 1, far: 100000 }
  const activeCamera = useWorldStore((state) => state.activeCamera)
  return (
    <Canvas frameloop={undefined} shadows gl={{ antialias: true, logarithmicDepthBuffer: true }} camera={activeCamera}>
      {/* <PerspectiveCamera makeDefault {...(activeCamera as any)} /> */}
      <Park />
      {/* <CameraControls /> */}
      {/* 飞行视角 */}
      {/* <FlyControls movementSpeed={100} rollSpeed={Math.PI / 60} /> */}
      {/* 第一人称视角 */}
      {/* <FirstPersonControls movementSpeed={20} lookSpeed={Math.PI / 125} /> */}
      {/* 引入环境 */}
      <Environment background preset='park' />
      <Stats />
    </Canvas>
  )
}

export default Fragment
