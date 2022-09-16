import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import DropdownMenu from './DropdownMenu'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)

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