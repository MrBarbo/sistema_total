import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Sidebar.css';
import logo from '../assets/images/total-logo.png'; // ✅ Importamos la imagen correctamente

const Sidebar = ({ role }) => {
  let showStock = false;
  let showTasks = false;
  let showAttentionReports = false;
  let showPatientTracking = false;
  let showDerevaTracking = false;
  let showReports = false;
  let showAccountCreation = false;

  switch (role) {
    case 'Administrador':
      showStock = showTasks = showAttentionReports = showPatientTracking = showDerevaTracking = showReports = showAccountCreation = true;
      break;
    case 'Coordinador':
      showStock = showTasks = showAttentionReports = showPatientTracking = showReports = true;
      break;
    case 'Medico':
      showAttentionReports = showPatientTracking = true;
      break;
    case 'Enfermero':
      showPatientTracking = true;
      break;
    default:
      break;
  }

  const navigate = useNavigate();
  const handleLogout = () => alert("Cerrando sesión...");

  return (
    <div className="sidebar-container">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Opciones de menú */}
      <ul className="sidebar-list">
        {showStock && <li className="sidebar-item" onClick={() => navigate('/stock')}>Stock</li>}
        {showTasks && <li className="sidebar-item" onClick={() => navigate('/tareas')}>Tareas</li>}
        {showAttentionReports && <li className="sidebar-item" onClick={() => navigate('/atencion')}>Reportes de atención</li>}
        {showPatientTracking && <li className="sidebar-item" onClick={() => navigate('/pacientes')}>Seguimiento de pacientes</li>}
        {showDerevaTracking && <li className="sidebar-item" onClick={() => navigate('/dereva')}>Derivados/Evacuados</li>}
        {showReports && <li className="sidebar-item" onClick={() => navigate('/reportes')}>Reportes</li>}
        {showAccountCreation && <li className="sidebar-item" onClick={() => navigate('/creacion')}>Creación de cuentas</li>}
      </ul>

      {/* Botón de Cerrar Sesión */}
      <div className="sidebar-logout">
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Sidebar;
