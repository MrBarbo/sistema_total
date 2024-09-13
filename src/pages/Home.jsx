import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Nav-bar';
import './styles/Home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername('');
    setPassword('');
    fetch(`${import.meta.env.VITE_BACKEND_DIR}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Usuario o contraseña incorrecto');
        }
        return response.json();
      })
      .then((data) => {
        const rol = data.session.idToken.payload['custom:rol'];
        navigate('/sede', { state: { role: rol } });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="content">
      <Navbar isLoggedIn={false} />
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-box">
        <div>
          <label htmlFor="username">Usuario</label>
          <input
            className="username-input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            className="password-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Ingresar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Home;
