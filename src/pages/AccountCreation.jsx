import React, { useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import './styles/AccountCreation.css';

const AccountCreation = () => {
  // State variables to store input field values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rol: 'Director General',
    lugar: 'Central'
  });

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_DIR}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: formData.username, password: formData.password, rol:formData.rol }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Información Incorrecta');
        }
        return response.json();
      })
      .then((data) => {
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    // Reset form fields
    setFormData({
      username: '',
      password: '',
      rol: 'Director General',
      lugar: 'Neuquen'
    });
  };

  return (
    <div className="full">
      <Navbar isLoggedIn={true} />
      <div className="box">
        <div className="sidebar-box">
          <Sidebar
            role={'Administrador'}
          />
        </div>
        <div className="content">
          <h2>Crear Cuenta</h2>
          <form onSubmit={handleSubmit} className="account-creation-form">
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Clave</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rol">Rol</label>
              <select
                id="rol"
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                required
              >
                <option value="Director General">Director General</option>
                <option value="Coordinador">Coordinador</option>
                <option value="Médico">Médico</option>
                <option value="Enfermero">Enfermero</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lugar">Lugar</label>
              <select
                id="lugar"
                name="lugar"
                value={formData.lugar}
                onChange={handleInputChange}
                required
              >
                <option value="Central">Central</option>
                <option value="Rio Cullen">Rio Cullen</option>
                <option value="Cañadon Alfa">Cañadon Alfa</option>
                <option value="Aguada San Roque">Aguada San Roque</option>
                <option value="Rincon de la Ceniza">Rincon de la Ceniza</option>
                <option value="Aguada Pichana">Aguada Pichana</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Crear Cuenta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
