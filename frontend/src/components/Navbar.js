import { NavLink } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/teammembers">Team Members</NavLink>
            </li>
            <li>
              <NavLink to="/documents">Documents</NavLink>
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