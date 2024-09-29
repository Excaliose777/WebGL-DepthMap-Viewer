import { useState } from 'react'
import './App.scss'
import Canvas from './Components/Canvas/Canvas';
import Header from './Components/Header/Header';

function App() {

  return (
    <div className='wrapper'>
      <Header/>
      <Canvas/>
    </div>
  )
}

export default App
