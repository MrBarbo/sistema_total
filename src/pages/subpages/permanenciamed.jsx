import React, { useState } from 'react';
import './styles/permanenciamed.css';

const Permed = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    from: '',
    to: '',
    hours:'',
    location:'Rio Cullen',
    role:'Medico'
  })

  const handlePermedInputChange= (field, value) => {
    setFormData({
      ...formData,
        [field]: value
      })};


    const handleSubmit = (e) => {
      console.log('data'+JSON.stringify(formData))
      e.preventDefault();
      fetch(`${import.meta.env.VITE_BACKEND_DIR}/reportes/permed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ doctor: formData.doctor, from: formData.from, to:formData.to, hours: formData.hours, location:formData.location, role: formData.role }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Información Incorrecta');
          }
          return response.json();
        })
        .then((data) => {
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
      // Reset form fields
      setFormData({
        doctor: '',
        from: '',
        to: '',
        hours:'',
        location:'Rio Cullen',
        role: 'Médico'
      });
    };

    const handleDownloadPDF = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/reportes/permed/download/pdf`, {
          method: 'GET',
          responseType: 'blob', // Specify the response type as blob
        });
  
        // Create a blob object from the response
        const blob = await response.blob();
  
        // Create a temporary URL for the blob object
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Reporte_PerMed.pdf'); // Set the download attribute
        document.body.appendChild(link);
  
        // Trigger the click event to start the download
        link.click();
  
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    };


  return (
    <div className='report-form'>
      <h3>Reporte de permanencia</h3>
      <label htmlFor="doctor">Nombre</label>
      <input
        type='text'
        value={formData.doctor}
        onChange={(e) => handlePermedInputChange('doctor', e.target.value)}
        placeholder='Nombre'
      />
      <label htmlFor="from">Inicio</label>
      <input
        type='date'
        value={formData.from}
        onChange={(e) => handlePermedInputChange('from', e.target.value)}
        placeholder='Inicio'
      />
      <label htmlFor="to">Fin</label>
      <input
        type='date'
        value={formData.to}
        onChange={(e) => handlePermedInputChange('to', e.target.value)}
        placeholder='IFin'
      />
      <label htmlFor="hours">Horas</label>
      <input
          className='editable-field'
          name="Horas"
          type="number"
          value={formData.hours}
          onChange={(e) => handlePermedInputChange('hours', e.target.value)}
          placeholder="Horas"
        />
      <label htmlFor="location">Sede</label>
      <select
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handlePermedInputChange('location', e.target.value)}
                required
              >
                <option value="Rio Cullen">Rio Cullen</option>
                <option value="Cañadon Alfa">Cañadon Alfa</option>
                <option value="Aguada San Roque">Aguada San Roque</option>
                <option value="Rincon de la Ceniza">Rincon de la Ceniza</option>
                <option value="Aguada Pichana">Aguada Pichana</option>
      </select>
      <label htmlFor="role">Cargo</label>
      <select
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => handlePermedInputChange('role', e.target.value)}
                required
              >
                <option value="Medico">Médico</option>
                <option value="Enfermero">Enfermero</option>
      </select>
      
      <button type="submit" onClick={handleSubmit} className="submit-button">Guardar</button>
      <button type="submit" onClick={handleDownloadPDF} className="submit-download-button">Descargar PDF</button>
    </div>
  );
};

export default Permed;
