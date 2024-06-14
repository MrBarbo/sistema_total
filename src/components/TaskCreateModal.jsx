import React, { useState } from 'react';
import './styles/TaskModal.css';

const TaskCreateModal = ({ onCreateTask, onClose }) => {
  const [formData, setFormData] = useState({
    Tarea: '',
    Descripcion: '',
    Responsable: '',
    FechaDeInicio: '',
    FechaDeFin: '',
    Estatus: 'En curso'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTask(formData);
    setFormData({
      Tarea: '',
      Descripcion: '',
      Responsable: '',
      FechaDeInicio: '',
      FechaDeFin: '',
      Estatus: 'En curso'
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Crear Nueva Tarea</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="Tarea">Tarea</label>
          <input
            type="text"
            id="Tarea"
            name="Tarea"
            value={formData.Tarea}
            onChange={handleChange}
            required
          />
          <label htmlFor="Descripcion">Descripción</label>
          <input
            type="text"
            id="Descripcion"
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            required
          />
          <label htmlFor="Responsable">Responsable</label>
          <input
            type="text"
            id="Responsable"
            name="Responsable"
            value={formData.Responsable}
            onChange={handleChange}
            required
          />
          <label htmlFor="FechaDeInicio">Fecha de Inicio</label>
          <input
            type="date"
            id="FechaDeInicio"
            name="FechaDeInicio"
            value={formData.FechaDeInicio}
            onChange={handleChange}
            required
          />
          <label htmlFor="FechaDeFin">Fecha de Fin</label>
          <input
            type="date"
            id="FechaDeFin"
            name="FechaDeFin"
            value={formData.FechaDeFin}
            onChange={handleChange}
            required
          />
          <button type="submit">Crear Tarea</button>
        </form>
      </div>
    </div>
  );
};

export default TaskCreateModal;
