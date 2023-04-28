import { useWorldStore } from '../useWorldStore'
import * as THREE from 'three'
export const useLoading = () => {
  const setProcess = useWorldStore((state) => state.setProcess)
  THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
    const progress = +new Number((loaded / total) * 100).toFixed(2)
    setProcess(progress)
  }
}
