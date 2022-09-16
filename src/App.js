import About from './pages/About';
import BestPractices from './pages/BestPractices';
import Home from './pages/Home';
import { GameProvider } from './contexts/GameContext';
import { Routes, Route } from 'react-router-dom'

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
