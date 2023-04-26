import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import { Group } from 'three'
const Chassis = forwardRef<Group>((_, ref) => {
  const gltf = useGLTF('./chassis.glb')
  return (
    <group ref={ref}>
      <mesh rotation={[0, -Math.PI, 0]} position={[0, -0.3, 0]}>
        <primitive object={gltf.scene} />
      </mesh>
    </group>
  )
})

Chassis.displayName = 'Chassis'

export default Chassis
