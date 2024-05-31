// StockCreateModal.jsx
import React, { useState } from 'react';
import './styles/StockCreateModal.css';

const StockCreateModal = ({ onCreateStock, onClose }) => {
  const [newStock, setNewStock] = useState({
    Producto: '',
    Droga: '',
    Accion: '',
    Cantidad: '',
    Vencimiento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  const handleSave = () => {
    onCreateStock(newStock);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Añadir Producto</h2>
        <input
          className='editable-field'
          name="Producto"
          value={newStock.Producto}
          onChange={handleChange}
          placeholder="Nombre del producto"
        />
        <input
          className='editable-field'
          name="Droga"
          value={newStock.Droga}
          onChange={handleChange}
          placeholder="Droga"
        />
        <input
          className='editable-field'
          name="Accion"
          value={newStock.Accion}
          onChange={handleChange}
          placeholder="Acción"
        />
        <input
          className='editable-field'
          name="Cantidad"
          type="number"
          value={newStock.Cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
        />
        <input
          className='editable-field'
          name="Vencimiento"
          type="date"
          value={newStock.Vencimiento}
          onChange={handleChange}
          placeholder="Fecha de expiración"
        />
        <button className='button-save' onClick={handleSave}>Añadir</button>
        <button className='button-close' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default StockCreateModal;
