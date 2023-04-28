import { STATIC_SERVER_URL } from '@/constant'
import { CycleRaycast, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import FlyLine from './FlyLine'
import LightWall from './LightWall'
import { modifycityMaterial } from './shaders/modifyCityMaterial'

// 随机数字函数
function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}
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
        modifycityMaterial(meshItem)
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
      {Array.from({ length: 100 }).map((_, index) => (
        <FlyLine
          key={index}
          points={[
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(random(0, 10) - 5, random(0, 10) - 5, random(0, 10) - 5),
            new THREE.Vector3(random(0, 10) - 5, 0, random(0, 10) - 5)
          ]}
        />
      ))}
      <LightWall />
    </mesh>
  )
}
export default City
