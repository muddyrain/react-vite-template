import { create } from 'zustand'
import * as THREE from 'three'
import { defaultCamera } from './camera'
interface State {
  activeCamera: THREE.PerspectiveCamera
  setActiveCamera: (camera: THREE.Camera) => void
}
export const useWorldStore = create<State>((set) => ({
  activeCamera: defaultCamera,
  setActiveCamera: (camera) =>
    set(() => ({
      activeCamera: camera as THREE.PerspectiveCamera
    }))
}))
