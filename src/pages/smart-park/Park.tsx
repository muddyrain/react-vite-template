import { STATIC_SERVER_URL } from '@/constant'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { CatmullRomCurve3, Mesh, Vector3 } from 'three'
import gsap from 'gsap'
const Park = () => {
  const gltf = useGLTF(STATIC_SERVER_URL + '/models/park.glb')
  useEffect(() => {
    const car = gltf.scene.getObjectByName('redcar') as Mesh
    const line = gltf.scene.getObjectByName('汽车园区轨迹') as Mesh
    line.visible = false
    const points: Vector3[] = []
    const array = (line.geometry.attributes.position as any).array
    for (let i = 0; i < line.geometry.attributes.position.count; i++) {
      points.push(new Vector3(array[i * 3], array[i * 3 + 1], array[i * 3 + 2]))
    }
    const curve = new CatmullRomCurve3(points)
    const curveProgress = {
      value: 1
    }
    gsap.to(curveProgress, {
      value: 0.01,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = curve.getPoint(curveProgress.value)
        car.position.set(point.x, point.y, point.z)
        if (curveProgress.value + 0.001 < 1) {
          const point = curve.getPoint(curveProgress.value + 0.001)
          car.lookAt(point)
        }
      }
    })
  }, [])
  return <primitive object={gltf.scene}></primitive>
}
export default Park
