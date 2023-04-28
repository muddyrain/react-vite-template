import { create } from 'zustand'
import * as THREE from 'three'
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000)
camera.position.set(1000, 1000, 1000)

interface State {
  camera: THREE.PerspectiveCamera
}
export const useWorldStore = create<State>((set) => ({
  camera
}))
