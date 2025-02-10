import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Sidebar.css';
import logo from '../assets/images/total-logo.png';

const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // 🔹 Evita que se muestre antes de tiempo

  const navigate = useNavigate();

  useEffect(() => {
    // Esperamos que React termine de montar el componente antes de mostrar el sidebar
    setTimeout(() => {
      setIsLoaded(true);
    }, 100); // 🔹 100ms de delay evita que el sidebar se muestre por un segundo
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => alert("Cerrando sesión...");

  let showStock = false, showTasks = false, showAttentionReports = false;
  let showPatientTracking = false, showDerevaTracking = false, showReports = false;
  let showAccountCreation = false, showMedicalHistory = false;

  switch (role) {
    case 'Administrador':
      showStock = showTasks = showAttentionReports = showPatientTracking = showDerevaTracking = showReports = showAccountCreation = showMedicalHistory = true;
      break;
    case 'Coordinador':
      showStock = showTasks = showAttentionReports = showPatientTracking = showReports = showMedicalHistory = true;
      break;
    case 'Medico':
      showAttentionReports = showPatientTracking = showMedicalHistory = true;
      break;
    case 'Enfermero':
      showPatientTracking = showMedicalHistory = true;
      break;
    default:
      break;
  }

  return (
    <>
      {/* Botón para abrir/cerrar el menú */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar solo se muestra si está cargado (isLoaded) */}
      {isLoaded && (
        <div className={`sidebar-container ${isOpen ? "active" : ""}`}>
          <div className="sidebar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="sidebar-list">
            {showStock && <li className="sidebar-item" onClick={() => navigate('/stock')}>Stock</li>}
            {showTasks && <li className="sidebar-item" onClick={() => navigate('/tareas')}>Tareas</li>}
            {showAttentionReports && <li className="sidebar-item" onClick={() => navigate('/atencion')}>Reportes de atención</li>}
            {showPatientTracking && <li className="sidebar-item" onClick={() => navigate('/pacientes')}>Seguimiento de pacientes</li>}
            {showDerevaTracking && <li className="sidebar-item" onClick={() => navigate('/dereva')}>Derivados/Evacuados</li>}
            {showReports && <li className="sidebar-item" onClick={() => navigate('/reportes')}>Reportes</li>}
            {showAccountCreation && <li className="sidebar-item" onClick={() => navigate('/creacion')}>Creación de cuentas</li>}
            {showMedicalHistory && (
              <li 
                className="sidebar-item" 
                onClick={() => window.open("http://arepbue-web11.main.glb.corp.local:8029/Total/MedicalHistory/PRD/MedicalHistoryWeb/", "_blank")}
              >
                Historias Clínicas
              </li>
            )}
          </ul>
          <div className="sidebar-logout">
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
