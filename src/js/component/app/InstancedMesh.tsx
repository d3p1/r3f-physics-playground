/**
 * @description Instanced mesh
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {InstancedRigidBodies} from '@react-three/rapier'
import {useMemo} from 'react'

export const InstancedMesh = () => {
  const count = 50
  const instances = useMemo(() => {
    const instances = []

    for (let i = 0; i < count; i++) {
      const instance: {
        key: string
        position: [number, number, number]
        rotation: [number, number, number]
      } = {
        key: `instance_${i}`,
        position: [
          (Math.random() - 0.5) * 8,
          4 + Math.random() * 3,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [Math.random(), Math.random(), Math.random()],
      }

      instances.push(instance)
    }

    return instances
  }, [])

  return (
    <InstancedRigidBodies instances={instances}>
      <instancedMesh args={[undefined, undefined, count]} castShadow={true}>
        <boxGeometry />
        <meshStandardMaterial color="tomato" />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}
