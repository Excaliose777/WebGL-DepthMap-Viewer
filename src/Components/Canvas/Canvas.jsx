import './Canvas.scss'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Canvas } from '@react-three/fiber'

import React, { Suspense, lazy, useState } from 'react'

const Scene = lazy(() => import('../R3F/Scene'))
const SceneB = lazy(() => import('../R3F/SceneB'))
const SceneC = lazy(() => import('../R3F/SceneC'))
const SceneD = lazy(() => import('../R3F/SceneD'))
const SceneE = lazy(() => import('../R3F/SceneE'))



const CanvasCover = () => {
  const [current, setCurrent] = useState(0)
  // console.log(tf)
  // console.log(depthEstimation)

  const scenes = [SceneB,Scene,SceneC, SceneD, SceneE]
  const CurrentScene = scenes[current]

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
          <Canvas shadows camera={{ position: [0,0,8], fov: 30}}>
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