import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Nav-bar.css'

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogin = (e) =>{

  }

  const handleLogout = (e) =>{
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <div className="logo-box">
        <img src="src\assets\images\total-logo.png" alt="Logo" className='logo' />
      </div>
      <div className="buttons">
        {isLoggedIn ? (
          <button className="button" onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <button className="button" onClick={handleLogin}>Iniciar sesión</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;