import { OrbitControls, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'

const SceneD = () => {
  const shaderRef = useRef()

  const model = useGLTF('./models/mordecai_and_rigby_wi_0928191810_refine.glb')

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
      {/* <octahedronGeometry/> */}
      <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
    </>
  )
}

export default SceneD