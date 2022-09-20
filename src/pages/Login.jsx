import { useState, useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase/Firebase'
import { signInWithPopup, sendSignInLinkToEmail, signInWithEmailLink, isSignInWithEmailLink } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '../contexts/UserContext'
import Navbar from "../components/Navbar"

const Login = () => {

  const navigate = useNavigate()

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [toDashboard, setToDashboard] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [welcomeMessage, setWelcomeMessage] = useState(false)

  const actionCodeSettings = {
    url: 'http://localhost:3000/login',
    handleCodeInApp: true
  }

  useEffect(() => {
    if(isSignInWithEmailLink(auth, window.location.href)) {
      let email = localStorage.getItem('emailForSignIn')      
      console.log(email)
      if(!email) {
        email = window.prompt('Please provide your email for confirmation')
      }
      signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        console.log('successfully logged in')
        setWelcomeMessage(true)
        localStorage.removeItem('emailForSignIn')
        setCurrentUser(result.user) 
        if(result.user.displayName) {
          localStorage.setItem('user', JSON.stringify({email: result.user.email, displayName: result.user.displayName}))
        } else
        {
          localStorage.setItem('user', JSON.stringify({email: result.user.email, displayName: result.user.email}))
        }
        navigate('/dashboard')
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
    }}, [])

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      console.log(user)
      setCurrentUser(user)
      localStorage.setItem('user', JSON.stringify({email: user.email, displayName: user.displayName}))
      setToDashboard(true)
    } catch(error) {
      console.log(error.message)
      setErrorMessage(error.message) 
    }
  }

  const handleEmailLink = (e) => {
    e.preventDefault() 
    const email = e.target.email.value

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log('email sent to: ', email)
        localStorage.setItem('emailForSignIn', email)
        setDisplayMessage(true)
        e.target.reset()
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
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
        <form onSubmit={handleEmailLink} className='email-link-form'>
          <h1>Sign In with Email</h1>
          <input type="email" name='email' placeholder='Enter your email...' required/>
          <button className='btn' type='submit'>Submit</button>
          <div className={displayMessage ? 'display-message' : 'hide-message'}>Check your email to complete login</div>
        </form>
        {errorMessage ? <div>An error occurred: {errorMessage}</div> : null}
      </section>
    </>
  )
}

export default Login