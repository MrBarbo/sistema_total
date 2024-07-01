import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SiteSelection.css';
import Cookies from 'js-cookie';
import Navbar from '../components/Nav-bar';

const SiteSelection = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState('Rio Cullen');

  const handleInputChange = (value) => {
    setLocation(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Cookies.set('location', location);
    navigate('/dashboard', { state: { location } });
  };

  return (
    <div>
        <Navbar isLoggedIn={true} />
        <div className="site-selection-container">
        <div className="form-container animate-fade-in">
            <form onSubmit={handleSubmit} className="site-selection-form">
            <h2>Seleccionar Sede</h2>
            <label htmlFor="location">Sede</label>
            <select
                id="location"
                name="location"
                value={location}
                onChange={(e) => handleInputChange(e.target.value)}
                required
            >
                <option value="Rio Cullen">Rio Cullen</option>
                <option value="Cañadon Alfa">Cañadon Alfa</option>
                <option value="Aguada San Roque">Aguada San Roque</option>
                <option value="Rincon de la Ceniza">Rincon de la Ceniza</option>
                <option value="Aguada Pichana">Aguada Pichana</option>
            </select>
            <button type="submit" className="submit-button">Seleccionar</button>
            </form>
        </div>
        </div>
    </div>
  );
};

export default SiteSelection;
