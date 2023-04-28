import { FC, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { CatmullRomLine } from '@react-three/drei'
import { STATIC_SERVER_URL } from '@/constant'
import gsap from 'gsap'

const FlyLine: FC<{
  startPosition?: THREE.Vector3
  endPosition?: THREE.Vector3
}> = ({ startPosition, endPosition }) => {
  const texture = useLoader(THREE.TextureLoader, STATIC_SERVER_URL + '/textures/line/z_11.png')
  // y轴重复
  texture.repeat.set(1, 2)
  const [lineCurve, setLineCurve] = useState<THREE.CatmullRomCurve3>()
  useEffect(() => {
    const _lineCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 5, 0), new THREE.Vector3(10, 0, 0)])
    setLineCurve(_lineCurve)
    // 创建飞线的动画
    gsap.to(texture.offset, {
      x: -1,
      duration: 1,
      repeat: -1,
      ease: 'none'
    })
  }, [])
  return (
    <mesh>
      <tubeGeometry args={[lineCurve, 1000, 0.25, 2, false]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

export default FlyLine
