import { useCompoundBody } from '@react-three/cannon'
import { forwardRef } from 'react'
import { Group } from 'three'

const Wheel = forwardRef<Group, { radius: number }>(({ radius }, ref) => {
  useCompoundBody(
    () => ({
      collisionFilterGroup: 0,
      mass: 1,
      material: 'wheel',
      type: 'Kinematic',
      shapes: [{ args: [radius, radius, 0.2, 16], rotation: [0, 0, -Math.PI / 2], type: 'Cylinder' }]
    }),
    ref
  )
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 20]} />
        <meshStandardMaterial color={0xff0000} />
      </mesh>
    </group>
  )
})
Wheel.displayName = 'Wheel'

export default Wheel
