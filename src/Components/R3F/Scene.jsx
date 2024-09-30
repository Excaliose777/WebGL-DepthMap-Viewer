import { ContactShadows, Environment, OrbitControls, OrthographicCamera, PerspectiveCamera, RenderTexture, Sky, useFBO, useGLTF } from '@react-three/drei'
import React, { useEffect, useMemo, useRef } from 'react'
import {vertex} from '../Shaders/Vertex'
import {fragment} from '../Shaders/Fragment'
import { createPortal, useFrame, useThree,extend } from '@react-three/fiber'
import getFullscreen from '../../utils/getfullScreen'
import * as THREE from 'three'
import DepthMaterial from '../Shaders/Depth'

extend({DepthMaterial})

const Scene = () => {
  const { camera } = useThree();
  const meshRef = useRef()
  // const planeRef = useRef()
  // const depthMaterialRef = useRef()
  // const screenCamera = useRef()
  const depthTexture = new THREE.DepthTexture()
  // const renderTarget = useFBO()
  // const renderTargetB = useFBO()
  // const sceneB = new THREE.Scene()


  const shaderRef = useRef()
  const model= useGLTF('./models/chicken_little_baseball_player.glb')

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

  // useFrame((state)=> {
  //   const {gl,scene} = state
    
  //   planeRef.current.material.map = null

  //   gl.setRenderTarget(renderTarget)
  //   gl.render(sceneB,camera)

  //   depthMaterialRef.current.uniforms.uTexture.value = renderTarget.texture
  //   depthMaterialRef.current.uniforms.cameraNear.value = camera.near
  //   depthMaterialRef.current.uniforms.cameraNear.value = camera.far

  //   planeRef.current.material = depthMaterialRef.current

  //   gl.setRenderTarget(renderTargetB)
  //   gl.render(planeRef.current,camera)
    
  //   gl.setRenderTarget(null)
  // })

  return (
    <>
    <OrbitControls camera={camera}/>
    <Sky sunPosition={[10, 10, 0]} />
    <Environment preset="sunset" />
    <directionalLight args={[10, 10, 0]} intensity={1} />
    <ambientLight intensity={0.5} />
        <mesh >
        <primitive object={model.scene} position={[0,-1,-1]} ref={meshRef}/>
        <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        />
    </mesh>
    {/* {createPortal(
      <mesh >
        <primitive object={model.scene} position={[0,-1,-1]} ref={meshRef}/>
        <shaderMaterial ref={shaderRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        />
    </mesh>,
    sceneB
    )}

    <OrthographicCamera ref={screenCamera} args={[-1, 1, 1, -1, 0, 1]} />
    <depthMaterial
     ref={depthMaterialRef}
     />
    <mesh 
      ref={planeRef} 
      geometry={getFullscreen()}
      frustumCulled={false}
    /> */}
    </>
  )
}

export default Scene



// const PostProcessing = () => {
//   const sphere = useRef();
//   const sphere2 = useRef();
//   const screenMesh = useRef();
//   const magicScene = new THREE.Scene();
//   const screenCamera = useRef();
//   const glitchMaterialRef = useRef();
//   const chromaticAberrationMaterialRef = useRef();

//   const renderTargetA = useFBO();
//   const renderTargetB = useFBO();

//   useFrame((state) => {
//     const { gl, scene, camera, clock } = state;

//     gl.setRenderTarget(renderTargetA);
//     gl.render(magicScene, camera);

//     chromaticAberrationMaterialRef.current.uniforms.uTexture.value =
//       renderTargetA.texture;
//     screenMesh.current.material = chromaticAberrationMaterialRef.current;

//     gl.setRenderTarget(renderTargetB);
//     gl.render(screenMesh.current, camera);

//     glitchMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
//     glitchMaterialRef.current.uniforms.uTexture.value = renderTargetB.texture;
//     screenMesh.current.material = glitchMaterialRef.current;

//     gl.setRenderTarget(null);
//   });

//   return (
//     <>
//       <OrbitControls />
//       {createPortal(
//         <>
//           <Sky sunPosition={[10, 10, 0]} />
//           <Environment preset="dawn" />
//           <directionalLight args={[10, 10, 0]} intensity={1} />
//           <ambientLight intensity={1} />
//           <mesh ref={sphere} position={[2, 0, 0]}>
//             <dodecahedronGeometry args={[1]} />
//             <meshPhysicalMaterial
//               roughness={0}
//               clearcoat={1}
//               clearcoatRoughness={0}
//               color="#73B9ED"
//             />
//           </mesh>
//           <mesh ref={sphere2} position={[-2, 0, 0]}>
//             <dodecahedronGeometry args={[1]} />
//             <meshPhysicalMaterial
//               roughness={0}
//               clearcoat={1}
//               clearcoatRoughness={0}
//               color="#73B9ED"
//             />
//           </mesh>
//         </>,
//         magicScene
//       )}
//       <OrthographicCamera ref={screenCamera} args={[-1, 1, 1, -1, 0, 1]} />
//       <chromaticAberrationMaterial ref={chromaticAberrationMaterialRef} />
//       <glitchMaterial ref={glitchMaterialRef} />
//       <mesh
//         ref={screenMesh}
//         geometry={getFullscreenTriangle()}
//         frustumCulled={false}
//       />
//     </>
//   );
// };

