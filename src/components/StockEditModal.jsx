// StockEditModal.jsx
import React, { useState } from 'react';
import './styles/StockEditModal.css';

const StockEditModal = ({ stock, onEditStock, onClose }) => {
  const [updatedStock, setUpdatedStock] = useState({ ...stock });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStock({ ...updatedStock, [name]: value });
  };

  const handleSave = () => {
    onEditStock(stock.id, updatedStock);
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Editar Producto</h2>
        <input
          className='editable-field'
          name="Producto"
          value={updatedStock.Producto}
          onChange={handleChange}
        />
        <input
          className='editable-field'
          name="Droga"
          value={updatedStock.Droga}
          onChange={handleChange}
        />
        <input
          className='editable-field'
          name="Accion"
          value={updatedStock.Accion}
          onChange={handleChange}
        />
        <input
          className='editable-field'
          name="Cantidad"
          type="number"
          value={updatedStock.Cantidad}
          onChange={handleChange}
        />
        <input
          className='editable-field'
          name="Vencimiento"
          type="date"
          value={updatedStock.Vencimiento}
          onChange={handleChange}
        />
        <button className='button-save' onClick={handleSave}>Guardar</button>
        <button className='button-close' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default StockEditModal;
