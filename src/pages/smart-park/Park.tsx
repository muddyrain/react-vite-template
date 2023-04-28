import { STATIC_SERVER_URL } from '@/constant'
import { useGLTF } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { Camera, CatmullRomCurve3, Mesh, Vector3 } from 'three'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useThree } from '@react-three/fiber'
const Park = () => {
  const gltf = useGLTF(STATIC_SERVER_URL + '/models/park.glb')
  const cameraOptions = {
    默认视角: 'default',
    汽车视角: 'carcamera_Orientation'
  }
  const [cameras, setCameras] = useState<Record<string, Camera>>({})
  const controls = useControls({
    camera: {
      options: cameraOptions,
      label: '相机视角',
      onChange(value) {
        console.log(value)
      }
    }
  })
  const { camera: defaultCamera } = useThree()
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
    cameras['default'] = defaultCamera
    gltf.cameras.forEach((_camera) => {
      cameras[_camera.name] = _camera
    })
    // 汽车运动
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
