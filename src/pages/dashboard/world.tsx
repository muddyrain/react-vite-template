import { FC } from 'react'
import { Mesh } from 'three'
import * as THREE from 'three'
import { GLTFLoader, DRACOLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { Physics, useBox, Debug, usePlane, useRaycastVehicle } from '@react-three/cannon'
import Vehicle from './vehicle/Vehicle'

const Plane = () => {
  const [ref] = usePlane<Mesh>(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0] }))
  return (
    <mesh ref={ref} position={[0, -5, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color='#eb9252' />
    </mesh>
  )
}

const Fragment: FC = () => {
  return (
    <Physics>
      <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} />
      <Plane />
    </Physics>
  )
}
export default Fragment
