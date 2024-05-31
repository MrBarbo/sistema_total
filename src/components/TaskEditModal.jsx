import React, { useState } from 'react';
import './styles/TaskEditModal.css';

const TaskEditModal = ({ task, onEditTask, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    onEditTask(editedTask.id, 'name', editedTask.name);
    onEditTask(editedTask.id, 'description', editedTask.description);
    onEditTask(editedTask.id, 'responsible', editedTask.responsible);
    onEditTask(editedTask.id, 'startDate', editedTask.startDate);
    onEditTask(editedTask.id, 'endDate', editedTask.endDate);
    onEditTask(editedTask.id, 'status', editedTask.status);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Task</h3>
        <input
          className='editable-field'
          value={editedTask.name}
          onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
        />
        <input
          className='editable-field'
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        />
        <input
          className='editable-field'
          value={editedTask.responsible}
          onChange={(e) => setEditedTask({ ...editedTask, responsible: e.target.value })}
        />
        <input
          className='editable-field'
          type='date'
          value={editedTask.startDate}
          onChange={(e) => setEditedTask({ ...editedTask, startDate: e.target.value })}
        />
        <input
          className='editable-field'
          type='date'
          value={editedTask.endDate}
          onChange={(e) => setEditedTask({ ...editedTask, endDate: e.target.value })}
        />
        <input
          className='editable-field'
          value={editedTask.status}
          onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
        />
        <button className="save-button" onClick={handleEdit}>Save</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskEditModal;
