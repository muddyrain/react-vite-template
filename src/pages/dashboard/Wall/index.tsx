import { Triplet, useBox } from '@react-three/cannon'
import { FC, useEffect } from 'react'
import { Mesh } from 'three'

const Box: FC<{
  position: Triplet
  mass: number
  width: number
  height: number
  depth: number
}> = ({ position, mass, width, height, depth }) => {
  const [ref] = useBox<Mesh>(() => ({ mass, args: [width, height, depth], position }))
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

const Boxs: FC<{
  row?: number
  col?: number
  width?: number
  height?: number
  depth?: number
  initX?: number
  initZ?: number
  initY?: number
  mass?: number
}> = ({ row = 3, col = 8, width = 1, height = 1, depth = 1, initX = 0, initZ = 5, initY = width / 2, mass = 1 }) => {
  return (
    <>
      {Array.from({ length: row }).map((_, i) => (
        <group key={i}>
          {Array.from({ length: col }).map((_, j) => (
            <Box key={`${i}_${j}`} mass={mass} width={width} height={height} depth={depth} position={[initX + j, initY + (i + 1) * height, initZ]} />
          ))}
        </group>
      ))}
    </>
  )
}

const Wall = () => {
  return (
    <group>
      <Boxs initX={10} initZ={15} row={2} col={5} />
      <Boxs initX={-5} initZ={-10} row={2} col={5} />
    </group>
  )
}

export default Wall
