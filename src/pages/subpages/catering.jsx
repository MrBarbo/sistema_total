import React, { useState } from 'react';
import './styles/catering.css';

const Catering = () => {
  const [formData, setFormData] = useState({
    date: '',
    location: 'Rio Cullen',
    doctor: ''
  })

  const handleCateringInputChange = (field, value) => {
    setFormData({
      ...formData,
        [field]: value
      })};


    const handleSubmit = (e) => {
      console.log('data'+JSON.stringify(formData))
      e.preventDefault();
      fetch(`${import.meta.env.VITE_BACKEND_DIR}/reportes/catering`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ date: formData.date, location: formData.location, doctor:formData.doctor }),
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
        date: '',
        location: 'Rio Cullen',
        doctor: ''
      });
    };

    const handleDownloadPDF = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/reportes/catering/download/pdf`, {
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
        link.setAttribute('download', 'Reporte_Catering.pdf'); // Set the download attribute
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
      <h3>Control del Catering</h3>
      <label htmlFor="date">Fecha</label>
      <input
        type='date'
        value={formData.date}
        onChange={(e) => handleCateringInputChange('date', e.target.value)}
        placeholder='Fecha'
      />
      <label htmlFor="location">Sede</label>
      <select
                id="location"
                name="location"
                value={formData.location}
                onChange={(e) => handleCateringInputChange('location', e.target.value)}
                required
              >
                <option value="Rio Cullen">Rio Cullen</option>
                <option value="Cañadon Alfa">Cañadon Alfa</option>
                <option value="Aguada San Roque">Aguada San Roque</option>
                <option value="Rincon de la Ceniza">Rincon de la Ceniza</option>
                <option value="Aguada Pichana">Aguada Pichana</option>
      </select>
      <label htmlFor="doctor">Médico</label>
      <input
        type='text'
        value={formData.doctor}
        onChange={(e) => handleCateringInputChange('doctor', e.target.value)}
        placeholder='Médico'
      />
      <button type="submit" onClick={handleSubmit} className="submit-button">Guardar</button>
      <button type="submit" onClick={handleDownloadPDF} className="submit-download-button">Descargar PDF</button>
    </div>
  );
};

export default Catering;
