import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Sidebar.css'

const Sidebar = ({ role }) => {
  // Define the variables outside the switch statement
  let showStock = false;
  let showTasks = false;
  let showAttentionReports = false;
  let showPatientTracking = false;
  let showDerevaTracking =false;
  let showReports = false;
  let showAccountCreation = false;

  switch (role) {
    case 'Administrador':
      showStock=true
      showTasks=true
      showAttentionReports=true
      showPatientTracking=true
      showDerevaTracking =true
      showReports=true
      showAccountCreation=true
    case 'Coordinador':
      showStock=true
      showTasks=true
      showAttentionReports=true
      showPatientTracking=true
      showReports=true
    case 'Medico':

    case 'Enfermero':

  }

  const navigate = useNavigate();
  const handleStockButtonClick = () => {
    navigate('/stock')
  };

  const handleTasksButtonClick = () => {
    navigate('/tareas')
  };

  const handleMedAttentionClick = () => {
    navigate('/atencion')
  };

  const handleReportsClick = () => {
    navigate('/reportes')
  };

  const handleAccountCreation = () => {
    navigate('/creacion')
  };

  const handlePatientClick = () => {
    navigate('/pacientes')
  };

  const handleDerevaClick = () => {
    navigate('/dereva')
  };

  return (
    <div className="sidebar">
      {showStock && <button onClick={handleStockButtonClick}>Stock</button>}
      {showTasks && <button onClick={handleTasksButtonClick}>Tareas</button>}
      {showAttentionReports && <button onClick={handleMedAttentionClick}>Reportes de atención</button>}
      {showPatientTracking && <button onClick={handlePatientClick}>Seguimiento de pacientes</button>}
      {showPatientTracking && <button onClick={handleDerevaClick}>Derivados/Evacuados</button>}
      {showReports && <button onClick={handleReportsClick}>Reportes</button>}
      {showAccountCreation && <button onClick={handleAccountCreation}>Creación de cuentas</button>}
    </div>
  );
};

export default Sidebar;