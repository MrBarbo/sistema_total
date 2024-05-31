// MedAttention.jsx

import React, { useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import './styles/MedAttention.css';

const MedAttention = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    pathology: '',
    observations: '',
    medication: {
      medicationName: '',
      drug: '',
      action: '',
      quantity: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Flatten medication data into the main formData object
    const dataToSend = {
      ...formData,
      ...formData.medication
    };
    delete dataToSend.medication; // Remove nested medication object

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Consulta guardada:', result);
      // Reset form fields after submission
      setFormData({
        patientName: '',
        date: '',
        pathology: '',
        observations: '',
        medication: {
          medicationName: '',
          drug: '',
          action: '',
          quantity: ''
        }
      });
    } catch (error) {
      console.error('Error al guardar la consulta:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleMedicationChange = (field, value) => {
    setFormData({
      ...formData,
      medication: {
        ...formData.medication,
        [field]: value
      }
    });
  };

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Atención Médica</h2>
          <form className='med-attention-form' onSubmit={handleSubmit}>
            <div className='form-section'>
              <h3>Información del Paciente</h3>
              <input
                type='text'
                placeholder='Nombre del paciente'
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
              />
              <input
                type='date'
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
              <input
                type='text'
                placeholder='Patología'
                value={formData.pathology}
                onChange={(e) => handleInputChange('pathology', e.target.value)}
              />
              <textarea
                placeholder='Observaciones'
                value={formData.observations}
                onChange={(e) => handleInputChange('observations', e.target.value)}
              ></textarea>
            </div>
            <div className='form-section'>
              <h3>Medicación Recetada</h3>
              <input
                type='text'
                placeholder='Nombre del medicamento'
                value={formData.medication.medicationName}
                onChange={(e) => handleMedicationChange('medicationName', e.target.value)}
              />
              <input
                type='text'
                placeholder='Droga'
                value={formData.medication.drug}
                onChange={(e) => handleMedicationChange('drug', e.target.value)}
              />
              <input
                type='text'
                placeholder='Acción'
                value={formData.medication.action}
                onChange={(e) => handleMedicationChange('action', e.target.value)}
              />
              <input
                type='number'
                placeholder='Cantidad'
                value={formData.medication.quantity}
                onChange={(e) => handleMedicationChange('quantity', e.target.value)}
              />
            </div>
            <button type='submit' className='submit-button'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedAttention;
