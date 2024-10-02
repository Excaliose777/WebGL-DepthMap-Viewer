import { OrbitControls,
  OrthographicCamera, 
  Sky, 
  Environment, 
  useFBO,
  useGLTF,
} from "@react-three/drei";
import { useFrame, createPortal, extend } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

import getFullscreenTriangle from '../../utils/getfullScreen';
import DepthTextureMaterial from '../../utils/DepthMap'

extend({ DepthTextureMaterial });

const Scene7 = () => {
  const screenMesh = useRef();
  const screenCamera = useRef();

  const magicScene = new THREE.Scene();  
  const depthMapMaterialRef = useRef()

  const renderTarget = useFBO({depthTexture: new THREE.DepthTexture()});

  const model = useGLTF('./models/marble_bust_01_1k.gltf/marble_bust_01_1k.gltf')

  useFrame((state) => {
    const { gl, scene, camera, clock } = state;

    // POST-PROCESSING PASS
    gl.setRenderTarget(renderTarget);
    gl.render(magicScene, camera);

    depthMapMaterialRef.current.uniforms.cameraNear.value = camera.near;
    depthMapMaterialRef.current.uniforms.cameraFar.value = camera.far;
    depthMapMaterialRef.current.uniforms.uTexture.value = renderTarget.texture;
    depthMapMaterialRef.current.uniforms.uDepth.value =renderTarget.depthTexture;
    screenMesh.current.material = depthMapMaterialRef.current;

    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls />
      {createPortal(
        <>
          <Sky sunPosition={[10, 10, 0]} />
          {/* <Environment preset="park" /> */}
          <directionalLight args={[10, 10, 0]} intensity={1} />
          <ambientLight intensity={1} />
          <mesh position={[0,-1.75,-1]} scale={[7,7,7]}>
            <primitive object={model.scene}/>
          </mesh>
        </>,
        magicScene
      )}

      <OrthographicCamera ref={screenCamera} args={[-1, 1, 1, -1, 0, 1]} />
      <depthTextureMaterial ref={depthMapMaterialRef}/>
      <mesh
        ref={screenMesh}
        geometry={getFullscreenTriangle()}
        frustumCulled={true}
      />
    </>
  );
};


export default Scene7