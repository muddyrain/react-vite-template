import { useLoader } from '@react-three/fiber'
import { FC } from 'react'
import { TextureLoader } from 'three'

const Loading: FC<{
  process: number
}> = ({ process }) => {
  const map = useLoader(TextureLoader, './welcome.png')
  return (
    <sprite scale={[8, 5, 5]}>
      <spriteMaterial map={map} />
    </sprite>
  )
}

export default Loading
