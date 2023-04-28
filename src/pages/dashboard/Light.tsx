import { FC } from 'react'

const Light: FC = () => {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.25} />
      {/* 半球光 */}
      <hemisphereLight intensity={0.15} />
      {/* 点光源 */}
      <pointLight intensity={0.75} position={[50, 50, 50]} />
      {/* 聚光灯 */}
      <spotLight position={[15, 50, 15]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      {/* 直线光 */}
      {/* <directionalLight position={[10, 50, 50]} castShadow shadow-mapSize={[2048, 2048]} /> */}
    </>
  )
}
export default Light
