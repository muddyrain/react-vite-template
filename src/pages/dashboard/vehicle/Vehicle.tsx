import { FC, useRef } from 'react'
import Chassis from './Chassis'
import { useBox } from '@react-three/cannon'
import { Mesh } from 'three'

const Vehicle = ({
  angularVelocity,
  back = -1.15,
  force = 1500,
  front = 1.3,
  height = -0.04,
  maxBrake = 50,
  position,
  radius = 0.7,
  rotation,
  steer = 0.5,
  width = 1.2
}) => {
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: [1.7, 1, 4],
      mass: 500,
      onCollide: (e) => console.log('bonk', e.body.userData),
      position,
      rotation
    }),
    useRef<Mesh>(null)
  )
  return (
    <>
      <Chassis ref={chassisBody} />
    </>
  )
}
export default Vehicle
