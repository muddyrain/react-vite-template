import { MutableRefObject, useEffect, useRef } from 'react'

function useKeyControls({ current }: MutableRefObject<Record<GameControl, boolean>>, map: Record<KeyCode, GameControl>) {
  useEffect(() => {
    const handleKeydown = ({ key }: KeyboardEvent) => {
      if (!isKeyCode(key)) return
      current[map[key]] = true
    }
    window.addEventListener('keydown', handleKeydown)
    const handleKeyup = ({ key }: KeyboardEvent) => {
      if (!isKeyCode(key)) return
      current[map[key]] = false
    }
    window.addEventListener('keyup', handleKeyup)
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [current, map])
}

const keyControlMap = {
  ' ': 'brake',
  ArrowDown: 'backward',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'forward',
  a: 'left',
  d: 'right',
  r: 'reset',
  s: 'backward',
  w: 'forward'
} as const
// 键盘码值类型
type KeyCode = keyof typeof keyControlMap
// 游戏控制
export type GameControl = (typeof keyControlMap)[KeyCode]

// code keys
const keyCodes = Object.keys(keyControlMap) as KeyCode[]
// 是否包含该键值
const isKeyCode = (v: unknown): v is KeyCode => keyCodes.includes(v as KeyCode)
export const useControls = () => {
  const controls = useRef<Record<GameControl, boolean>>({
    backward: false,
    brake: false,
    forward: false,
    left: false,
    reset: false,
    right: false
  })

  useKeyControls(controls, keyControlMap)

  return controls
}
