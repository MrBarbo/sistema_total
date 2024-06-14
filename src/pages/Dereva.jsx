import React, { useEffect, useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import './styles/Dereva.css';

const Dereva = () => {
  const [derivaciones, setDerivaciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    direction: 'Derivacion',
    patientName: '',
    pathology: 'Respiratorio',
    company: 'TOTAL',
    destination: '',
    estado: 'En curso', // default value
    observaciones: ''
  });

  useEffect(() => {
    fetchDerivaciones();
  }, []);

  const fetchDerivaciones = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/dereva`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDerivaciones(data);
    } catch (error) {
      console.error('Error fetching derivaciones:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleAddPatient = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/dereva`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setShowForm(false);
      fetchDerivaciones(); // refresh list
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleUpdateEstado = async (id, newEstado) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_DIR}/dereva/${id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ estado: newEstado })
      });
      fetchDerivaciones(); // refresh list
    } catch (error) {
      console.error('Error updating estado:', error);
    }
  };

  const handleAddObservacion = async (id, observacion) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_DIR}/dereva/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ observaciones: observacion })
      });
      fetchDerivaciones(); // refresh list
    } catch (error) {
      console.error('Error adding observacion:', error);
    }
  };

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Derivaciones y Evacuaciones</h2>
          <button className='add-patient-button' onClick={() => setShowForm(!showForm)}>Añadir Paciente</button>
          {showForm && (
            <div className='form'>
              <label htmlFor="date">Fecha</label>
              <input
                type='date'
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                placeholder='Fecha'
              />
              <label htmlFor="type">Tipo</label>
              <select
                id="direction"
                name="direction"
                value={formData.direction}
                onChange={(e) => handleInputChange('direction', e.target.value)}
                required
              >
                <option value="Derivacion">Derivacion</option>
                <option value="Evacuacion">Evacuacion</option>
              </select>
              <label htmlFor="patientName">Nombre del paciente</label>
              <input
                type='text'
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                placeholder='Nombre del paciente'
              />
              <label htmlFor="pathology">Patología</label>
              <select
                id="pathology"
                name="pathology"
                value={formData.pathology}
                onChange={(e) => handleInputChange('pathology', e.target.value)}
                required
              >
                <option value="Respiratorio">Respiratorio</option>
                <option value="Muscular">Muscular</option>
                <option value="Digestivo">Digestivo</option>
                <option value="Oftalmologico">Oftalmológico</option>
                <option value="Odontologico">Odontológico</option>
                <option value="Dermatologico">Dermatológico</option>
                <option value="Traumatico">Traumático</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Psicologico">Psicológico</option>
                <option value="Otorrino">Otorrino</option>
                <option value="Endocrino-Metabolico">Endocrino-Metabólico</option>
                <option value="Urologico">Urológico</option>
                <option value="Control Sig Vitales">Control S. Vitales</option>
                <option value="Entrega Prot Solar">Entrega de Protector Solar</option>
              </select>
              <label htmlFor="company">Empresa</label>
              <select
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                required
              >
                <option value="TOTAL">TOTAL</option>
                <option value="BRINGS">BRINGS</option>
                <option value="CANGA">CANGA</option>
                <option value="COAMTRA">COAMTRA</option>
                <option value="ENSI">ENSI</option>
                <option value="GELDOR">GELDOR</option>
                <option value="GRUPO L Catering">GRUPO L Catering</option>
                <option value="HUINOIL S.A.">HUINOIL S.A.</option>
                <option value="L.G.">L.G.</option>
                <option value="POLISER">POLISER</option>
              </select>
              <label htmlFor="destination">Destino</label>
              <input
                type='text'
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder='Destino'
              />
              <button className='save-button' onClick={handleAddPatient}>Guardar</button>
            </div>
          )}
          {derivaciones.map((derivacion) => (
            <div key={derivacion.id} className='patient-record'>
              <h3>{derivacion.patientName}</h3>
              <p>Fecha: {new Date(derivacion.date).toLocaleDateString()}</p>
              <p>Dirección: {derivacion.direction}</p>
              <p>Patología: {derivacion.pathology}</p>
              <p>Empresa: {derivacion.company}</p>
              <p>Destino: {derivacion.destination}</p>
              <p>Estado: {derivacion.estado}</p>
              <p>Observaciones: {derivacion.observaciones}</p>
              <button className='alta-button' onClick={() => handleUpdateEstado(derivacion.id, 'alta')}>Marcar como Alta</button>
              <button className='observacion-button' onClick={() => handleAddObservacion(derivacion.id, prompt('Añadir Observación:'))}>Añadir Observación</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dereva;
