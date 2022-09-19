import { useContext } from 'react'
import { Link } from 'react-router-dom'
import GameMode from '../games/GameMode'
import GameContext from '../contexts/GameContext'
import GameOver from '../games/GameOver'

const MainContainer = () => {

  const {showResults, gameStarted, setGameStarted, allGamesData} = useContext(GameContext)


  if (gameStarted) {
    return (
      <GameMode />
    )
  }

  if(showResults) {
    return (
      <GameOver />
    )
  }

  return (
    <main className="main-container">
      <h1>Jeopardy Rush!</h1>
      <p>You have <span style={{fontWeight: 700}}>60 seconds</span> to answer as many Jeopardy! questions correctly as you can. Check the <Link style={{textDecoration: 'none', fontWeight: 700, color: '#005AA3'}} to='/best-practices'>Best Practices</Link> section for more details.</p>
      <button onClick={() => setGameStarted(true)} className="btn play-btn">Play Now</button>
    </main>
  )
}

export default MainContainer