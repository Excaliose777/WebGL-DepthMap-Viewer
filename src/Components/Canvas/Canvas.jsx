import './Canvas.scss'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Canvas } from '@react-three/fiber'
// import '@tensorflow/tfjs-core';
// import '@tensorflow/tfjs-converter';
// import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow-models/body-segmentation';
// import * as depthEstimation from '@tensorflow-models/depth-estimation';
// import { useEffect } from 'react';

import React, { Suspense, lazy, useRef, useState } from 'react'

const Scene = lazy(() => import('../R3F/Scene'))
const SceneB = lazy(() => import('../R3F/SceneB'))
const SceneC = lazy(() => import('../R3F/SceneC'))
const SceneD = lazy(() => import('../R3F/SceneD'))
const SceneE = lazy(() => import('../R3F/SceneE'))


const CanvasCover = () => {
  const [current, setCurrent] = useState(0)
  const scenes = [SceneB,Scene,SceneC, SceneD, SceneE]
  const CurrentScene = scenes[current]
  
  // const canvasRef = useRef()
  // useEffect(()=> {
  //   async function loadModel() {
  //     const model = depthEstimation.SupportedModels.ARPortraitDepth
  //     const estimator = await depthEstimation.createEstimator(model);
  //     const estimationConfig = {
  //       minDepth: 0, // The minimum depth value outputted by the estimator.
  //       maxDepth: 1 // The maximum depth value outputted by the estimator.
  //     };
  //     const depthMap = await estimator.estimateDepth(canvasRef.current, estimationConfig);
  //     console.log(depthMap)
  //   }
  
  //   loadModel()
  // },[])

  const previous =() => {
    console.log('previous')
    setCurrent((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : scenes.length - 1));
  }

  const next =() => {
    console.log('next')
    setCurrent((prevIndex) => (prevIndex < scenes.length - 1 ? prevIndex + 1 : 0));

  }

  return (
    <div className='canvas'>
      <div style={{cursor:'pointer'}}>
        <FaArrowAltCircleLeft size={50} onClick={previous}/>
      </div>

      <div className='canvasMain'>
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas shadows camera={{ position: [0,0,6], fov: 30}}>
            <ambientLight/>
            <color attach="background" args={["#ececec"]} />
            <CurrentScene/>
          </Canvas>
        </Suspense>
      </div>

      <div style={{cursor:'pointer'}}>
        <FaArrowAltCircleRight size={50} onClick={next}/>
      </div>
    </div>
  )
}

export default CanvasCover