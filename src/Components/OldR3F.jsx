import { ContactShadows, OrbitControls, Sky, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'

const SceneB = () => {
  const shaderRef = useRef()

  const model = useGLTF('./models/evil_wizard_standing__0928190007_refine.glb')

  const uniforms = useRef({
    u_texture: {value:null}
  })

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        uniforms.current.u_texture.value = child.material.map
        child.material = shaderRef.current;

        console.log(uniforms.current.u_texture.value)
      }
    });

  }, []);

  return (
    <>
    <OrbitControls/>
    <Sky sunPosition={[10, 10, 0]} />
    <directionalLight args={[10, 10, 0]} intensity={1} />
    <ambientLight intensity={0.5} />
    <ContactShadows
      frames={1}
      scale={10}
      position={[0, -2, 0]}
      blur={4}
      opacity={0.2}
    />
    <mesh castShadow position-y={.15}>
      <primitive object={model.scene}/>
      {/* <meshNormalMaterial ref={shaderRef}/> */}
      <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
    <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} >
      <boxGeometry args={[15,15,0.35]}/>
      <meshStandardMaterial color={'grey'}/>
    </mesh>
    </>
  )
}

export default SceneB