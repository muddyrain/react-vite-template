import { Triplet, WheelInfoOptions, useBox, useRaycastVehicle } from '@react-three/cannon'
import { FC, useRef } from 'react'
import { Group, Mesh } from 'three'
import Wheel from './Wheel'
import Chassis from './Chassis'
import { useControls } from './useControls'
import { useFrame } from '@react-three/fiber'
import { DirectionType } from './types'

interface VehicleProps {
  radius?: number
  width?: number
  height?: number
  depth?: number
  force?: number
  steer?: number
  maxBrake?: number
  back?: number
  front?: number
  position: Triplet
  angularVelocity: Triplet
  rotation: Triplet
}
const Vehicle: FC<VehicleProps> = ({
  radius = 0.35,
  width = 1.5,
  height = 0.25,
  depth = 4.15,
  force = 1500,
  steer = 0.5,
  maxBrake = 50,
  back = -1.5,
  front = 1.15,
  position,
  angularVelocity,
  rotation
}) => {
  const controls = useControls()
  // 设置
  const wheels = [useRef<Group>(null), useRef<Group>(null), useRef<Group>(null), useRef<Group>(null)]
  const [chassisBody, chassisApi] = useBox(
    () => ({
      mass: 500,
      allowSleep: false,
      args: [width, height, depth],
      position,
      angularVelocity,
      rotation
    }),
    useRef<Group>(null)
  )
  const wheelOptions: WheelInfoOptions = {
    // 车轮半径
    radius,
    // 设置与物体相同的转动方向
    dampingRelaxation: 2.3,
    // 设置与物体相同的转动方向
    directionLocal: [0, -1, 0],
    // 最大的悬架力
    maxSuspensionForce: 1e4,
    // 最大的悬架时间行程
    maxSuspensionTravel: 0.3,
    // 车辆的转向轴
    axleLocal: [-1, 0, 0],
    // 设置车轮的滑动摩擦力
    frictionSlip: 1.4,
    // 设置悬架的休息长度
    suspensionRestLength: 0.3,
    // 设置悬架的刚度
    suspensionStiffness: 30,
    // 设置压缩的阻尼
    dampingCompression: 4.4,
    // 使用自定义滑动转速
    useCustomSlidingRotationalSpeed: true
  }
  const wheelInfo1: WheelInfoOptions = {
    ...wheelOptions,
    chassisConnectionPointLocal: [width / 2, height, front],
    isFrontWheel: true
  }
  const wheelInfo2: WheelInfoOptions = {
    ...wheelOptions,
    chassisConnectionPointLocal: [-width / 2, height, front],
    isFrontWheel: true
  }
  const wheelInfo3: WheelInfoOptions = {
    ...wheelOptions,
    chassisConnectionPointLocal: [width / 2, height + 0.05, back],
    isFrontWheel: false
  }
  const wheelInfo4: WheelInfoOptions = {
    ...wheelOptions,
    chassisConnectionPointLocal: [-width / 2, height + 0.05, back],
    isFrontWheel: false
  }
  // 创建投射车辆
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
      wheels
    }),
    useRef<Group>(null)
  )

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const { backward, brake, forward, left, reset, right } = controls.current
    for (let e = 2; e < 4; e++) {
      vehicleApi.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2)
    }
    for (let s = 0; s < 2; s++) {
      vehicleApi.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s)
    }

    for (let b = 2; b < 4; b++) {
      vehicleApi.setBrake(brake ? maxBrake : 0, b)
    }

    if (reset) {
      chassisApi.position.set(...position)
      chassisApi.velocity.set(0, 0, 0)
      chassisApi.angularVelocity.set(...angularVelocity)
      chassisApi.rotation.set(...rotation)
    }
  })

  const wheelDirections: DirectionType[] = ['fl', 'fr', 'rl', 'rr']
  return (
    <group ref={vehicle} castShadow={true} receiveShadow={true}>
      <Chassis ref={chassisBody} />
      {wheels.map((wheel, index) => (
        <Wheel key={index} direction={wheelDirections[index]} width={width} height={height} depth={depth} radius={radius} ref={wheel} />
      ))}
    </group>
  )
}

export default Vehicle
