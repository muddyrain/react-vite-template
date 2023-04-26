import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { forwardRef, useEffect, useRef } from 'react'
import { Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, MultiplyBlending, Object3D, TextureLoader } from 'three'

const glassMaterial = new MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.25,
  roughness: 0,
  transmission: 1.0
})
const bodyMaterial = new MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1.0,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
  sheen: 0.5
})

export const detailsMaterial = new MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.5
})

const Chassis = forwardRef<Group>((_, ref) => {
  const gltf = useGLTF('./chassis.glb')
  const shadow = useLoader(TextureLoader, './ferrari_ao.png')
  useEffect(() => {
    const carModel = gltf.scene.children[0] as Object3D
    const glass = carModel.getObjectByName('glass') as Mesh
    glass.material = glassMaterial
    const body = carModel.getObjectByName('body') as Mesh
    body.material = bodyMaterial
    const trim = carModel.getObjectByName('trim') as Mesh
    trim.material = detailsMaterial
  }, [])
  return (
    <group ref={ref}>
      <mesh rotation={[0, -Math.PI, 0]} position={[0, -0.3, 0]}>
        <primitive object={gltf.scene}>
          {/* 车底阴影 */}
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
            <planeGeometry args={[0.655 * 4, 1.3 * 4]} />
            <meshBasicMaterial map={shadow} blending={MultiplyBlending} toneMapped={false} transparent={true} />
          </mesh>
        </primitive>
      </mesh>
    </group>
  )
})

Chassis.displayName = 'Chassis'

export default Chassis
