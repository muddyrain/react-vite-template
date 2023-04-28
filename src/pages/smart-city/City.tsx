import { STATIC_SERVER_URL } from '@/constant'
import { CycleRaycast, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import FlyLine from './FlyLine'

const City = () => {
  const gltf = useGLTF(STATIC_SERVER_URL + `/models/city.glb`)
  const [Layerbuildings, setLayerbuildings] = useState<THREE.Mesh>()
  const controls = useControls({
    buildingsColor: {
      value: '#5e4baa',
      label: '建筑物颜色'
    },
    buildingsLineColor: {
      value: '#ffffff',
      label: '建筑物线条颜色'
    }
  })
  useEffect(() => {
    gltf.scene.traverse((item) => {
      if (item.type === 'Mesh') {
        const meshItem = item as THREE.Mesh
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(controls.buildingsColor)
        })
        // 修改物体的颜色材质
        meshItem.material = cityMaterial
        if (meshItem.name === 'Layerbuildings') {
          setLayerbuildings(meshItem)
        }
      }
    })
  }, [controls])
  const scale = Layerbuildings?.scale || new THREE.Vector3(1, 1, 1)
  return (
    <mesh>
      <primitive object={gltf.scene}>
        <lineSegments scale={[scale.x, scale.x, scale.x]}>
          <edgesGeometry args={[Layerbuildings?.geometry]} />
          <lineBasicMaterial color={controls.buildingsLineColor} />
        </lineSegments>
      </primitive>
      <FlyLine />
    </mesh>
  )
}
export default City
