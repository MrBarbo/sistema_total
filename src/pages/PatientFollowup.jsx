import React, { useEffect, useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import './styles/PatientFollowup.css';

const PatientFollowup = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetchConsultas();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    });
  };

  const fetchConsultas = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/consultas`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Error fetching consultas:', error);
    }
  };

  // Group consultas by patientName
  const groupConsultasByPatient = (consultas) => {
    return consultas.reduce((acc, consulta) => {
      const { patientName } = consulta;
      if (!acc[patientName]) {
        acc[patientName] = [];
      }
      acc[patientName].push(consulta);
      return acc;
    }, {});
  };

  const groupedConsultas = groupConsultasByPatient(consultas);

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Seguimiento de Pacientes</h2>
          {Object.keys(groupedConsultas).map((patientName) => (
            <div key={patientName} className='patient-group'>
              <h3>{patientName}</h3>
              <table className='consultas-table'>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Patología</th>
                    <th>Empresa</th>
                    <th>Medicamentos</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedConsultas[patientName].map((consulta) => (
                    <tr key={consulta.id}>
                      <td>{formatDate(consulta.date)}</td>
                      <td>{consulta.pathology}</td>
                      <td>{consulta.company}</td>
                      <td>
                        {consulta.Medications && consulta.Medications.length > 0 ? (
                          <table className='medications-table'>
                            <thead>
                              <tr>
                                <th>Nombre del Medicamento</th>
                                <th>Droga</th>
                                <th>Cantidad</th>
                              </tr>
                            </thead>
                            <tbody>
                              {consulta.Medications.map((med) => (
                                <tr key={med.id}>
                                  <td>{med.medicationName}</td>
                                  <td>{med.drug}</td>
                                  <td>{med.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          'No se recetaron medicaciones'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientFollowup;
