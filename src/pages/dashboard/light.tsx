import { FC } from 'react'

const Light: FC = () => {
  return (
    <>
      {/* 环境光 */}
      {/* <ambientLight intensity={0.5} /> */}
      {/* 半球光 */}
      <hemisphereLight intensity={0.35} />
      {/* 点光源 */}
      <pointLight intensity={1} position={[50, 50, 50]} />
      {/* 聚光灯 */}
      <spotLight
        position={[20, 30, 10]}
        angle={Math.PI / 5}
        penumbra={1}
        intensity={1}
        distance={180}
        castShadow
        shadow-mapSize-width={256}
        shadow-mapSize-height={256}
      />
      {/* 直线光 */}
      {/* <directionalLight position={[10, 50, 50]} castShadow shadow-mapSize={[2048, 2048]} /> */}
    </>
  )
}
export default Light
