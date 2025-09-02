/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {OrbitControls, SoftShadows} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {CuboidCollider, Physics, RigidBody} from '@react-three/rapier'
import {Box} from './app/Box.tsx'
import {InstancedMesh} from './app/InstancedMesh.tsx'

export const App = () => {
  return (
    <Canvas camera={{fov: 35, position: [4, 1, 8]}} shadows={true}>
      <SoftShadows />

      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

      <ambientLight intensity={2} />
      <directionalLight intensity={5} position={[1, 1, 1]} castShadow={true} />

      <Physics>
        <Box position={[0, 2, 0]} castShadow={true} color="lime" />
        <Box
          rigidBodyType="fixed"
          color="hotpink"
          scale={[15, 0.1, 15]}
          position={[0, -0.05, 0]}
          receiveShadow={true}
        />

        <InstancedMesh />

        <RigidBody type="fixed" colliders={false}>
          <CuboidCollider args={[1, 2, 7.5]} position={[8.5, 2, 0]} />
          <CuboidCollider args={[1, 2, 7.5]} position={[-8.5, 2, 0]} />
          <CuboidCollider args={[7.5, 2, 1]} position={[0, 2, 8.5]} />
          <CuboidCollider args={[7.5, 2, 1]} position={[0, 2, -8.5]} />
        </RigidBody>
      </Physics>
    </Canvas>
  )
}
