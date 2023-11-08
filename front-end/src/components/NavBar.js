import React, { useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-scroll'

import logo from '../assets/hahlogo.png'

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navlogo">
        <img
          src="https://i.imgur.com/GfqSxXG.png"
          className="enlarged-image"
          alt="logo"
        ></img>
        <img src="https://i.imgur.com/PgjIp0N.png"></img>
      </div>
      <ul className="nav-menu">
        <li>
          Home
          <hr />
        </li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>
      <div></div>
    </div>
  )
}

export default NavBar
