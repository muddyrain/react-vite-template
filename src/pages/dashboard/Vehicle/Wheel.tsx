import { useCompoundBody } from '@react-three/cannon'
import { forwardRef, useEffect, useMemo } from 'react'
import { Group, Mesh } from 'three'
import { DirectionType } from './types'
import { useGLTF } from '@react-three/drei'
import { Vector3 } from '@react-three/fiber'
import { detailsMaterial } from './Chassis'

const Wheel = forwardRef<
  Group,
  {
    radius: number
    direction: DirectionType
    width: number
    height: number
    depth: number
  }
>(({ radius, direction, width, height, depth }, ref) => {
  const gltf = useGLTF(`./wheel_${direction}.glb`)
  useCompoundBody(
    () => ({
      collisionFilterGroup: 0,
      mass: 1,
      material: 'wheel',
      type: 'Kinematic',
      shapes: [{ args: [radius, radius, 0.2, 20], rotation: [0, 0, -Math.PI / 2], type: 'Cylinder' }]
    }),
    ref
  )
  useEffect(() => {
    gltf.scene.children.forEach((_mesh) => {
      const mesh = _mesh as Mesh
      if (mesh.name === 'rim_' + direction) {
        mesh.material = detailsMaterial
      }
    })
  }, [])
  return (
    <group ref={ref}>
      <mesh>
        <primitive object={gltf.scene} />
      </mesh>
    </group>
  )
})
Wheel.displayName = 'Wheel'

export default Wheel
