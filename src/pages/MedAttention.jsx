import React, { useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import MedicationSearch from '../components/MedicationSearch';
import './styles/MedAttention.css';

const MedAttention = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    pathology: 'Respiratorio',
    company: 'Total',
    customCompany: '',
    medications: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
        pathology: 'Respiratorio',
        company: 'Total',
        customCompany: '',
        medications: []
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

  const handleMedicationChange = (index, field, value) => {
    const newMedications = formData.medications.map((medication, i) => {
      if (i === index) {
        return { ...medication, [field]: value };
      }
      return medication;
    });
    setFormData({
      ...formData,
      medications: newMedications
    });
  };

  const handleAddMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { medicationName: '', drug: '', action: '', quantity: '' }]
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
              <label htmlFor="pname">Nombre del paciente</label>
              <input
                type='text'
                placeholder='Nombre del paciente'
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
              />
              <label htmlFor="date">Fecha</label>
              <input
                type='date'
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
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
                <option value="OTHER">Ingrese nombre de empresa...</option>
              </select>
              {formData.company === 'OTHER' && (
                <input
                  type='text'
                  placeholder='Nombre de la Empresa'
                  value={formData.customCompany}
                  onChange={(e) => handleInputChange('customCompany', e.target.value)}
                  required
                />
              )}
            </div>
            <div className='form-section'>
              <h3>Medicación Recetada</h3>
              {formData.medications.map((medication, index) => (
                <div key={index} className='medication-group'>
                  <MedicationSearch
                    index={index}
                    medication={medication}
                    onMedicationChange={handleMedicationChange}
                  />
                  <input
                    type='number'
                    placeholder='Cantidad'
                    value={medication.quantity}
                    onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                  />
                  {index < formData.medications.length - 1 && <hr className='medication-divider' />}
                </div>
              ))}
              <button type='button' className='add-medication-button' onClick={handleAddMedication}>
                Agregar Medicación
              </button>
            </div>
            <button type='submit' className='submit-button'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedAttention;
