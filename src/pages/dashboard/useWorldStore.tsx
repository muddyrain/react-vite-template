import { create } from 'zustand'

type State = {
  color: string
  process: number
  setProcess: (process: number) => void
}

export const useWorldStore = create<State>((set) => ({
  color: '#efa464',
  process: 0,
  setProcess: (process: number) => set({ process })
}))
