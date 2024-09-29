import { OrbitControls, useGLTF } from '@react-three/drei'
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
      <meshStandardMaterial color={'white'}/>
    </mesh>
    </>
  )
}

export default SceneB