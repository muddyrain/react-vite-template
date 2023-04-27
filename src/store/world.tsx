import { create } from 'zustand'

type State = {
  color: string
}
type Actions = {}

export const useWorldStore = create<State & Actions>((set) => ({
  color: '#efa464',
  cameraPosition: [0, 0, 0]
}))
