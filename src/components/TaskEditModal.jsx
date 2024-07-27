import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const TaskEditModal = ({ task, onEditTask, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    responsible: '',
    startDate: '',
    endDate: '',
    status: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.Tarea || '',
        description: task.Descripcion || '',
        responsible: task.Responsable || '',
        startDate: task.FechaDeInicio ? new Date(task.FechaDeInicio).toISOString().split('T')[0] : '',
        endDate: task.FechaDeFin ? new Date(task.FechaDeFin).toISOString().split('T')[0] : '',
        status: task.Estatus || ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    if (task) {
      onEditTask(task.id, formData);
    }
  };

  return (
    <Dialog open={!!task} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Description'
          name='description'
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Responsible'
          name='responsible'
          value={formData.responsible}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Start Date'
          type='date'
          name='startDate'
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='End Date'
          type='date'
          name='endDate'
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Status'
          name='status'
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color='primary'>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

TaskEditModal.propTypes = {
  task: PropTypes.object,
  onEditTask: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskEditModal;
