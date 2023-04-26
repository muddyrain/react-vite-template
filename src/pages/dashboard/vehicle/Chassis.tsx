import { forwardRef } from 'react'
import { Group } from 'three'
const Chassis = forwardRef<Group>((_, ref) => {
  return (
    <group ref={ref}>
      <mesh></mesh>
    </group>
  )
})

Chassis.displayName = 'Chassis'

export default Chassis
