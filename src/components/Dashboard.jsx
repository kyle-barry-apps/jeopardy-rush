import { auth } from "../firebase/Firebase"
import { signOut } from 'firebase/auth'
import { UserContext } from "../contexts/UserContext"
import { useState, useContext } from "react"
import Navbar from "./Navbar"
import { Navigate } from "react-router-dom"

const Dashboard = () => {
  const [loggedOut, setLoggedOut] = useState(false)
  const { setCurrentUser } = useContext(UserContext)

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User successfully signed out')
      localStorage.setItem('user', null)
      setCurrentUser(null)
      setLoggedOut(true)
    }).catch((error) => {
      console.log('Error signing out user ', error)
    })
  }

  if(loggedOut) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <>
    <Navbar />
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard