import { useState } from 'react';
import About from './pages/About';
import BestPractices from './pages/BestPractices';
import Home from './pages/Home';
import { storageRef } from '../src/firebase/Firebase'
import { getDownloadURL } from 'firebase/storage';
import { GameProvider } from './contexts/GameContext';
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';


function App() {

  return (
   <GameProvider> 
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/best-practices' element={<BestPractices />} />
    </Routes>
   </GameProvider>
  );
}

export default App;
