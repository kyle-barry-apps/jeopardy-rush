import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom' 
import { UserContext } from '../contexts/UserContext'
import { signOut } from 'firebase/auth'
import { auth } from "../firebase/Firebase"
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const DropdownMenu = ({ toggleMenu, setToggleMenu }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()
  
  useEffect(() => {
    window.addEventListener('click', (e) => {
      const clickedAttr = e.target.getAttribute('data-dropdown')
      if(!clickedAttr) {
        setToggleMenu(false)
      }
    })
  }, []) 

  const handleLogout = () => {
    setToggleMenu(false)
    signOut(auth).then(() => {
      localStorage.removeItem('user')
      setCurrentUser(null) 
      navigate(0)
      console.log('User successfully signed out')
    }).catch((error) => {
      console.log('Error signing out user ', error)
    })
    }

  return (
    <section data-dropdown className={toggleMenu ? 'dropdown-menu visible' : 'dropdown-menu'}>
      <div onClick={() => setToggleMenu(false)} className="close-icon-container">
        <span className='close-icon'><AiOutlineClose style={{color: 'white'}}/></span>
      </div>
      <Link onClick={() => setToggleMenu(false)} to='/best-practices' className={toggleMenu ? 'nav-link dropdown-link active' : 'nav-link dropdown-link'}>Best Practices</Link>
      <Link onClick={() => setToggleMenu(false)} to='/about' className={toggleMenu ? 'nav-link dropdown-link active' : 'nav-link dropdown-link'}>About</Link>
      <Link onClick={() => setToggleMenu(false)} to='/login' className={toggleMenu ? 'nav-link dropdown-link active' : 'nav-link dropdown-link'}>Log In</Link>
      { currentUser ?
      <>
        <Link onClick={() => setToggleMenu(false)} to='/dashboard' className={toggleMenu ? 'nav-link dropdown-link active' : 'nav-link dropdown-link'}>Dashboard</Link> 
        <Link onClick={handleLogout} to='/' className={toggleMenu ? 'nav-link dropdown-link active' : 'nav-link dropdown-link'}>Log Out</Link>
      </> :
        null
      }
    </section>
  )
}

export default DropdownMenu