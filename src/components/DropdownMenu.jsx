import { useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { AiOutlineClose } from 'react-icons/ai'

const DropdownMenu = ({ toggleMenu, setToggleMenu }) => {
  
  useEffect(() => {
    window.addEventListener('click', (e) => {
      const clickedAttr = e.target.getAttribute('data-dropdown')
      if(!clickedAttr) {
        setToggleMenu(false)
      }
    })
  }, []) 


  return (
    <section data-dropdown className={toggleMenu ? 'dropdown-menu visible' : 'dropdown-menu'}>
      <div onClick={() => setToggleMenu(false)} className="close-icon-container">
        <span className='close-icon'><AiOutlineClose style={{color: 'white'}}/></span>
      </div>
      <Link onClick={() => setToggleMenu(false)} to='/best-practices' className='nav-link dropdown-link'>Best Practices</Link>
      <Link onClick={() => setToggleMenu(false)} to='/about' className='nav-link dropdown-link'>About</Link>
    </section>
  )
}

export default DropdownMenu