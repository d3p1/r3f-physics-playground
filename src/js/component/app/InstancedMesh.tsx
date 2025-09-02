/**
 * @description Instanced mesh
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {useEffect, useRef} from 'react'

export const InstancedMesh = () => {
  const instances = 3
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null!)

  useEffect(() => {
    for (let i = 0; i < instances; i++) {
      const matrix = new THREE.Matrix4()
      matrix.compose(
        new THREE.Vector3(i * 2, 0.5, 0),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1),
      )
      instancedMeshRef.current.setMatrixAt(i, matrix)
    }
  }, [])

  return (
    <instancedMesh
      args={[undefined, undefined, instances]}
      ref={instancedMeshRef}
      castShadow={true}
    >
      <boxGeometry />
      <meshStandardMaterial color="tomato" />
    </instancedMesh>
  )
}
