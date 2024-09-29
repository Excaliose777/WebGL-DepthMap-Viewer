import { OrbitControls, useGLTF } from '@react-three/drei'
import React, { useEffect, useMemo, useRef } from 'react'
import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Scene = () => {
  const { camera } = useThree();
  const meshRef = useRef()
  const depthTexture = new THREE.DepthTexture()


  const shaderRef = useRef()
  const model= useGLTF('./models/chicken_little_baseball_player.glb')
  // console.log(model)

  const uniforms = useRef({
    u_texture: {value:null},
    u_depthTexture:{value:null},
    u_cameraNear:{value:camera.near},
    u_cameraFar:{value:camera.far},
  })

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        shaderRef.current.uniforms.u_texture.value = child.material.map
        shaderRef.current.uniforms.u_depthTexture.value = depthTexture
        child.material = shaderRef.current;
      }
    });

  }, [model]);


  
  return (
    <>
    <OrbitControls/>
    <mesh >
      <primitive object={model.scene} position={[0,-1,-1]} ref={meshRef}/>
      <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
    </>
  )
}

export default Scene