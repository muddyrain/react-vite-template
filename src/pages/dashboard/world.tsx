import { Debug, Physics, WheelInfoOptions, useBox, useCompoundBody, useCylinder, usePlane, useRaycastVehicle } from '@react-three/cannon'
import { forwardRef, useRef } from 'react'
import { Mesh, Group } from 'three'
import Vehicle from './Vehicle/Vehicle'

const Plane = () => {
  const [ref] = usePlane<Mesh>(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
    </mesh>
  )
}

const World = () => {
  return (
    <Physics>
      <Debug color='black' scale={1.1}>
        <Plane />
        <Vehicle />
      </Debug>
    </Physics>
  )
}

export default World
