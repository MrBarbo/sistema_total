import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const MedicationSearch = ({ index, medication, onMedicationChange }) => {
  const [allMedications, setAllMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllMedications(data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  const handleSelectMedication = (event, value) => {
    if (value) {
      onMedicationChange(index, 'medicationName', value.Producto);
      onMedicationChange(index, 'drug', value.Droga);
      onMedicationChange(index, 'quantity', value.Cantidad);
    }
  };

  return (
    <Autocomplete
      options={allMedications}
      getOptionLabel={(option) => `${option.Producto} - ${option.Droga}`}
      onChange={handleSelectMedication}
      renderInput={(params) => (
        <TextField {...params} label="Medicamento" variant="outlined" />
      )}
    />
  );
};

export default MedicationSearch;
