import { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { UserContext } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from "../firebase/Firebase"
import { Navigate, useNavigate } from "react-router-dom"

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const { currentUser } = useContext(UserContext)
  const [loggedOut, setLoggedOut] = useState(false)
  const { setCurrentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User successfully signed out')
      localStorage.removeItem('user')
      setCurrentUser(null)
      navigate(0)
    }).catch((error) => {
      console.log('Error signing out user ', error)
    })
  }

  return (
    <header>
      <div className={toggleMenu ? 'overlay' : ''}></div>
      <nav className='navbar'>
        <NavLink to="/" className='brand'>JEOPARDY RUSH</NavLink>
        <ul className='nav-list'>
          <li>
            <NavLink to="/best-practices" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
            Best Practices</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
            About</NavLink>
          </li>
          <li> 
            {currentUser ?
            <NavLink to='/dashboard' className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>Dashboard</NavLink> :
            <NavLink to='/login' className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}>
            Login</NavLink>
            }
          </li>
          {currentUser ?
          <li>
            <NavLink onClick={handleLogout} to='/' className='nav-link logout'>Log Out</NavLink>
          </li> :
          null
          }
        </ul>
        <div data-dropdown onClick={() => setToggleMenu(!toggleMenu)} className="burger">
          <div data-dropdown className="burger-line"></div>
          <div data-dropdown className="burger-line"></div>
          <div data-dropdown className="burger-line"></div>
        </div>
        <DropdownMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}/>
      </nav>
    </header>
  )
}

export default Navbar