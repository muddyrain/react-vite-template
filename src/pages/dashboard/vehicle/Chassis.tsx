import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import { Group } from 'three'
const Chassis = forwardRef<Group>((_, ref) => {
  const gltf = useGLTF('./ferrari.glb')
  console.log(gltf)
  return (
    <group ref={ref}>
      <mesh></mesh>
    </group>
  )
})

Chassis.displayName = 'Chassis'

export default Chassis
