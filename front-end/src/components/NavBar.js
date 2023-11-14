import React from 'react'
import './NavBar.css'
<<<<<<< HEAD
import { Link } from 'react-router-dom'
import hah from './hahlogoo.png'
=======
// import { Link } from 'react-scroll'
>>>>>>> 4ad909b13910045c8d5553f2165ab0fc4df5136d

const Navbar = () => {
  return (
    <nav className="glassmorphism-navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <h1>
            <img src={hah}></img>
          </h1>
          <h1>
            HAH <span>SHOP</span>
          </h1>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/sell">Sell at HaHshop</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
