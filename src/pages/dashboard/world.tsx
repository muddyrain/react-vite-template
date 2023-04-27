import { Debug, Physics, usePlane } from '@react-three/cannon'
import { Mesh } from 'three'
import Vehicle from './Vehicle/Vehicle'
import Wall from './Wall'
import { useWorldStore } from '@/store/world'

const Plane = () => {
  // 物理世界颜色
  const color = useWorldStore((state) => state.color)
  const [ref] = usePlane<Mesh>(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const World = () => {
  return (
    <Physics iterations={5}>
      <Debug color='black' scale={1.1}>
        <Wall />
        <Vehicle />
        <Plane />
      </Debug>
    </Physics>
  )
}

export default World
