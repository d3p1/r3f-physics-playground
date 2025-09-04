/**
 * @description Stick
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {useFrame} from '@react-three/fiber'
import {type RapierRigidBody, RigidBody} from '@react-three/rapier'
import {useRef} from 'react'

const ROTATION_SPEED = 2
const ROTATION_RAD = 4

export const Stick = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null!)

  useFrame((state) => {
    const angle = state.clock.getElapsedTime()
    const rotation = new THREE.Quaternion()
    rotation.setFromEuler(new THREE.Euler(0, angle * ROTATION_SPEED, 0))
    rigidBodyRef.current.setNextKinematicRotation(rotation)

    const x = ROTATION_RAD * Math.cos(angle)
    const z = ROTATION_RAD * Math.sin(angle)
    rigidBodyRef.current.setNextKinematicTranslation(new THREE.Vector3(x, 0, z))
  })

  return (
    <RigidBody ref={rigidBodyRef} type="kinematicPosition">
      <mesh scale={[6, 1, 1]} castShadow={true}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  )
}
