// MedicationSearch.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const MedicationSearch = ({ index, medication, onMedicationChange }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/stock?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    if (searchQuery) {
      fetchMedications();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectMedication = (event, newValue) => {
    if (newValue) {
      onMedicationChange(index, 'medicationName', newValue.medicationName);
      onMedicationChange(index, 'drug', newValue.drug);
      onMedicationChange(index, 'quantity', newValue.quantity);
    }
  };

  return (
    <Autocomplete
      options={searchResults}
      getOptionLabel={(option) => option.medicationName}
      onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
      onChange={handleSelectMedication}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar Medicamento"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default MedicationSearch;
