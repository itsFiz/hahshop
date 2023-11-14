import React from 'react';

const headerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2em 15em',
  alignItems: 'center',
};

const ulStyles = {
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
  gap: '6em',
};

const aStyles = {
  display: 'inline-block',
  color: 'white',
  textDecoration: 'none',
  letterSpacing: '1px',
  transition: '0.3s ease',
  borderBottom: '3px solid transparent',
};

const Header = () => {
  return (
    <header style={headerStyles}>
      <a href="#" className="logo">
        HAH <span> SHOP</span>
      </a>
      <nav>
        <ul style={ulStyles}>
          <li>
            <a href="#" style={aStyles}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#" style={aStyles}>
              SELL AT HAHSHOP
            </a>
          </li>
          <li>
            <a href="#" style={aStyles}>
              REGISTER
            </a>
          </li>
          <li>
            <a href="#" style={aStyles}>
              LOGIN
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
