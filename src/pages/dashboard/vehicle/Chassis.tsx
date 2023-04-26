import { forwardRef } from 'react'
import { Mesh } from 'three'
const Chassis = forwardRef<Mesh>((_, ref) => {
  return <mesh ref={ref}></mesh>
})

Chassis.displayName = 'Chassis'

export default Chassis
