import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar ">
      <div className="container-fluid px-5">
        <div className="logo">
          VIGILANT
        </div>
        <div className="nav-elements pt-2">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar