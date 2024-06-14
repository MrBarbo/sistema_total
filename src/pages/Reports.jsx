// Reports.jsx

import React, { useState } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import Catering from './subpages/catering';
import Permed from './subpages/permanenciamed';
import './styles/Reports.css';

const Reports = () => {
  // State to store selected report type
  const [selectedReport, setSelectedReport] = useState('');

  // State to store form data for each report type
  const [formData, setFormData] = useState({
    date: '',
    catering: {
      date: '',
      location: '',
      doctor: ''
    },
    derivations: {
      date: '',
      direction: '',
      patientName: '',
      pathology: '',
      company: '',
      destination: ''
    }
  });

  // Function to handle report type selection
  const handleReportSelection = (report) => {
    setSelectedReport(report);
    // Reset form data when changing report type
    setFormData({
      date: '',
      catering: {
        date: '',
        location: 'Rio Cullen',
        doctor: ''
      },
      derivations: {
        date: '',
        direction: '',
        patientName: '',
        pathology: '',
        company: '',
        destination: ''
      }
    });
  };

  // Function to handle input change in form fields
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Function to handle input change in catering form fields
  

  // Function to handle input change in derivations form fields
  const handleDerivationsInputChange = (field, value) => {
    setFormData({
      ...formData,
      derivations: {
        ...formData.derivations,
        [field]: value
      }
    });
  };

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar
            role='Administrador'
          />
        </div>
        <div className='content'>
          <h2>Reportes</h2>
          <div className='report-dropdown'>
            <select value={selectedReport} onChange={(e) => handleReportSelection(e.target.value)}>
              <option value=''>Seleccione Tipo de Reporte</option>
              <option value='catering'>Control del Catering</option>
              <option value='Permanencia del Personal'>Permanencia del Personal</option>
            </select>
          </div>
          {selectedReport === 'catering' && (
            <Catering />
          )}
          {selectedReport === 'Permanencia del Personal' && (
            <Permed />
          )}
          {selectedReport === 'derivations' && (
            <div className='report-form'>
              <h3>Derivaciones/Evacuaciones</h3>
              <input
                type='date'
                value={formData.derivations.date}
                onChange={(e) => handleDerivationsInputChange('date', e.target.value)}
                placeholder='Fecha'
              />
              <input
                type='text'
                value={formData.derivations.direction}
                onChange={(e) => handleDerivationsInputChange('direction', e.target.value)}
                placeholder='D/E'
              />
              <input
                type='text'
                value={formData.derivations.patientName}
                onChange={(e) => handleDerivationsInputChange('patientName', e.target.value)}
                placeholder='Nombre del paciente'
              />
              <input
                type='text'
                value={formData.derivations.pathology}
                onChange={(e) => handleDerivationsInputChange('pathology', e.target.value)}
                placeholder='Patología'
              />
              <input
                type='text'
                value={formData.derivations.company}
                onChange={(e) => handleDerivationsInputChange('company', e.target.value)}
                placeholder='Empresa'
              />
              <input
                type='text'
                value={formData.derivations.destination}
                onChange={(e) => handleDerivationsInputChange('destination', e.target.value)}
                placeholder='Destino'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

