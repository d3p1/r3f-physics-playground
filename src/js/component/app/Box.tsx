/**
 * @description Box
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {RigidBody, RapierRigidBody, vec3} from '@react-three/rapier'
import {useRef} from 'react'
import * as React from 'react'
import {type ThreeElements} from '@react-three/fiber'
import {type RigidBodyTypeString} from '@react-three/rapier'

const _generateRandomColor = () => {
  return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
    Math.random() * 255,
  )}, ${Math.round(Math.random() * 255)})`
}

export const Box: React.FC<
  ThreeElements['mesh'] & {rigidBodyType?: RigidBodyTypeString; color?: string}
> = ({rigidBodyType = 'dynamic', color = _generateRandomColor(), ...props}) => {
  const hitAudio = useRef(new Audio('/r3f-physics-playground/audios/hit.mp3'))
  const rigidBodyRef = useRef<RapierRigidBody>(null!)

  const handleCollision = () => {
    if (rigidBodyType !== 'dynamic') {
      return
    }
    hitAudio.current.currentTime = 0
    hitAudio.current.volume = Math.random()
    hitAudio.current.play().catch((error) => console.error(error))
  }

  const handleClick = () => {
    if (rigidBodyType !== 'dynamic') {
      return
    }

    rigidBodyRef.current.applyImpulse(
      vec3({x: Math.random() - 0.5, y: 4, z: Math.random() - 0.5}),
      true,
    )
    rigidBodyRef.current.applyTorqueImpulse(
      vec3({
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      }),
      true,
    )
  }

  return (
    <RigidBody
      type={rigidBodyType}
      onCollisionEnter={handleCollision}
      ref={rigidBodyRef}
    >
      <mesh {...props} onClick={handleClick}>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </RigidBody>
  )
}
