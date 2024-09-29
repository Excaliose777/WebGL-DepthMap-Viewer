import { OrbitControls, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'

const SceneC = () => {
  const shaderRef = useRef()

const model = useGLTF('./models/medieval_three_headed_0928184913_refine.glb')

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
    <mesh>
      <primitive object={model.scene}/>
      {/* <torusGeometry/> */}
      <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
    </>
  )
}

export default SceneC