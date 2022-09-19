import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { auth, provider } from '../firebase/Firebase'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '../contexts/UserContext'
import GameMode from '../games/GameMode'
import GameContext from '../contexts/GameContext'
import GameOver from '../games/GameOver'

const MainContainer = () => {

  const {showResults, gameStarted, setGameStarted, allGamesData} = useContext(GameContext)
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const [toDashboard, setToDashboard] = useState(false)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      setCurrentUser(user.email)
      localStorage.setItem('user', user.email)
      setToDashboard(true)
    } catch(err) {
      console.log(err.message)
    }
  }

  if (toDashboard) {
    return (
      <Navigate to='/dashboard' />
    )
  }

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
      <button onClick={handleLogin} className='google-signin-btn'><FcGoogle size={24}/>Sign In with Google</button>
      <h1>Speed Trivia Game</h1>
      <p>You have <span style={{fontWeight: 700}}>60 seconds</span> to answer as many Jeopardy questions correctly as you can. Check the <Link style={{textDecoration: 'none', fontWeight: 700, color: '#005AA3'}} to='/best-practices'>Best Practices</Link> section for more details.</p>
      <button onClick={() => setGameStarted(true)} className="btn play-btn">Play Now</button>
    </main>
  )
}

export default MainContainer