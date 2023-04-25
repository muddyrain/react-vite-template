import { FC, useRef } from 'react'
import Chassis from './Chassis'
import { WheelInfoOptions, useBox, useRaycastVehicle } from '@react-three/cannon'
import { Group, Mesh } from 'three'
import { useControls } from './useControls'
import { useFrame } from '@react-three/fiber'

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
  const wheels = useRef<Mesh[]>([])

  const controls = useControls()

  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      angularVelocity,
      args: [1.7, 1, 4],
      mass: 500,
      position,
      rotation
    }),
    useRef<Mesh>(null)
  )

  const wheelInfo: WheelInfoOptions = {
    axleLocal: [-1, 0, 0], // This is inverted for asymmetrical wheel models (left v. right sided)
    customSlidingRotationalSpeed: -30,
    dampingCompression: 4.4,
    dampingRelaxation: 10,
    directionLocal: [0, -1, 0], // set to same as Physics Gravity
    frictionSlip: 2,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    radius,
    suspensionRestLength: 0.3,
    suspensionStiffness: 30,
    useCustomSlidingRotationalSpeed: true
  }

  const wheelInfo1: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width / 2, height, front],
    isFrontWheel: true
  }
  const wheelInfo2: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width / 2, height, front],
    isFrontWheel: true
  }
  const wheelInfo3: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [-width / 2, height, back],
    isFrontWheel: false
  }
  const wheelInfo4: WheelInfoOptions = {
    ...wheelInfo,
    chassisConnectionPointLocal: [width / 2, height, back],
    isFrontWheel: false
  }

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels: wheels.current as any
    }),
    useRef<Group>(null)
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const { backward, brake, forward, left, reset, right } = controls.current
    // for (let e = 2; e < 4; e++) {
    //   vehicleApi.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2)
    // }
  })

  return (
    <group ref={vehicle} position={[0, -0.4, 0]}>
      <Chassis
        ref={chassisBody}
        loadWheels={(_wheels) => {
          wheels.current = _wheels
        }}
      />
    </group>
  )
}
export default Vehicle
