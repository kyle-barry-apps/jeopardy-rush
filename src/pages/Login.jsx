import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { auth, provider } from '../firebase/Firebase'
import { signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '../contexts/UserContext'
import Navbar from "../components/Navbar"

const Login = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [toDashboard, setToDashboard] = useState(false)

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      console.log(user)
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify({email: user.email, displayName: user.displayName}))
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

  return (
    <>  
      <Navbar />
      <section className='login-container'>
        <button onClick={handleLogin} className='google-signin-btn'><FcGoogle size={24}/>Sign In with Google</button> 
      </section>
    </>
  )
}

export default Login