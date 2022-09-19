import { useState } from 'react';
import About from './pages/About';
import BestPractices from './pages/BestPractices';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import { GameProvider } from './contexts/GameContext';
import { UserProvider } from './contexts/UserContext';
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
  <UserProvider>  
   <GameProvider> 
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/best-practices' element={<BestPractices />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   </GameProvider>
  </UserProvider>
  );
}

export default App;
