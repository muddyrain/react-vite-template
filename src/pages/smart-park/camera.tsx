import * as THREE from 'three'

export const defaultCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000)
defaultCamera.position.set(200, 1000, 1000)
// 更新摄像头
defaultCamera.aspect = window.innerWidth / window.innerHeight
//   更新摄像机的投影矩阵
defaultCamera.updateProjectionMatrix()
