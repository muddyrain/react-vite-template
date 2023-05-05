import { STATIC_SERVER_URL } from '@/constant'
import { useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Camera, PerspectiveCamera, CatmullRomCurve3, Mesh, Vector3 } from 'three'
import gsap from 'gsap'
import { useControls } from 'leva'
import { useFrame, useThree } from '@react-three/fiber'
import { useWorldStore } from './useWorldStore'
import { defaultCamera } from './camera'
import { OrbitControls } from 'three-stdlib'
const Park = () => {
  const gltf = useGLTF(STATIC_SERVER_URL + '/models/park.glb')
  const cameraOptions = {
    默认视角: 'default',
    汽车视角: 'carcamera_Orientation',
    司机视角: 'rightcamera_Orientation'
  }
  const cameras = useRef<Record<string, Camera>>({
    default: defaultCamera
  })

  const setActiveCamera = useWorldStore((state) => state.setActiveCamera)
  const activeCamera = useWorldStore((state) => state.activeCamera)
  const controls = useControls({
    camera: {
      options: cameraOptions,
      label: '相机视角',
      onChange(value) {
        setActiveCamera(cameras.current[value] as PerspectiveCamera)
      }
    }
  })
  const { gl } = useThree()

  useEffect(() => {
    const car = gltf.scene.getObjectByName('redcar') as Mesh
    const line = gltf.scene.getObjectByName('汽车园区轨迹') as Mesh
    activeCamera.lookAt(gltf.scene.position)
    line.visible = false
    new OrbitControls(activeCamera, gl.domElement)
    const points: Vector3[] = []
    const array = (line.geometry.attributes.position as any).array
    for (let i = line.geometry.attributes.position.count; i > 0; i--) {
      points.push(new Vector3(array[i * 3], array[i * 3 + 1], array[i * 3 + 2]))
    }
    const curve = new CatmullRomCurve3(points)
    const curveProgress = {
      value: 0
    }
    gltf.cameras.forEach((_camera) => {
      cameras.current[_camera.name] = _camera
    })
    // 汽车运动
    gsap.to(curveProgress, {
      value: 0.99,
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
  return (
    <Suspense fallback={<span>加载中...</span>}>
      <primitive object={gltf.scene}></primitive>
    </Suspense>
  )
}
export default Park
