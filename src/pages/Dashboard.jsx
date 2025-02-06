import React from 'react';
import Sidebar from '../components/Sidebar';
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Sidebar a la izquierda */}
        <Sidebar role="Administrador" />

        {/* Contenido en el centro */}
        <div className="content-container">
          <div className="content-box">
            <h2>Bienvenido al Panel de Control</h2>
            <p>Aquí puedes consultar stock de medicamentos, gestionar tareas y usuarios.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
