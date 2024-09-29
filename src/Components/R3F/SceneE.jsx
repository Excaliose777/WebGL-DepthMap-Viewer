import { OrbitControls, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import Cactoro from '../Models/Cactoro'

import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'

const SceneE = () => {
  const shaderRef = useRef()
  const model = useGLTF('./models/marble_bust_01_1k.gltf/marble_bust_01_1k.gltf')
  const uniforms = useRef({
    u_texture: {value:null}
  })

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        uniforms.current.u_texture.value = child.material.map
        child.material = shaderRef.current;
      }
    });

  }, [model]);

  return (
    <>
    <OrbitControls/>
    <mesh position={[0,-1.75,-1]} scale={[7,7,7]}>
      <primitive object={model.scene}/>
      {/* <Cactoro/> */}
      {/* <meshNormalMaterial ref={shaderRef}/> */}
      <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
    </>
  )
}

export default SceneE