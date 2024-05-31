import React, { useState, useEffect } from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import TaskEditModal from '../components/TaskEditModal';
import TaskCreateModal from '../components/TaskCreateModal';
import './styles/Tasks.css';

const Tasks = () => {
  const [tasksData, setTasksData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/tareas`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasksData(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (newTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/tareas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error creating task:', response.statusText, errorText);
        return;
      }
      const createdTask = await response.json();
      setTasksData([...tasksData, createdTask]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/tareas/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error updating task:', response.statusText, errorText);
        return;
      }
      const updated = await response.json();
      setTasksData(tasksData.map(task => task.id === taskId ? updated : task));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/tareas/${taskId}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error deleting task:', response.statusText, errorText);
        return;
      }
      setTasksData(tasksData.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDropdownToggle = (taskId) => {
    setActiveTaskId(activeTaskId === taskId ? null : taskId);
  };

  const handleEditClick = (task) => {
    openEditModal(task);
    setActiveTaskId(null); // Close the dropdown menu
  };

  const handleDeleteClick = (taskId) => {
    handleDeleteTask(taskId); // Call the delete task function
    setActiveTaskId(null); // Close the dropdown after deleting
  };

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <div className='content'>
          <h2>Tareas</h2>
          <ul className='task-list'>
            <li className='list-header'>
              <span>Acciones</span>
              <span>Tarea</span>
              <span>Descripción</span>
              <span>Responsable</span>
              <span>Fecha de inicio</span>
              <span>Fecha de fin</span>
              <span>Estatus</span>
            </li>
            {tasksData.map((task) => (
              <li className='list' key={task.id}>
                <div className='dropdown-container'>
                  <div className='dropdown-toggle' onClick={() => handleDropdownToggle(task.id)}>...</div>
                  {activeTaskId === task.id && (
                    <div className='dropdown-content'>
                      <div className='dropdown-option' onClick={() => handleEditClick(task)}>Editar</div>
                      <div className='dropdown-option' onClick={() => handleDeleteClick(task.id)}>Eliminar</div>
                    </div>
                  )}
                </div>
                <span>{task.Tarea}</span>
                <span>{task.Descripcion}</span>
                <span>{task.Responsable}</span>
                <span>{new Date(task.FechaDeInicio).toLocaleDateString()}</span>
                <span>{new Date(task.FechaDeFin).toLocaleDateString()}</span>
                <span>{task.Estatus}</span>
              </li>
            ))}
          </ul>
          {isEditModalOpen && (
            <TaskEditModal
              task={selectedTask}
              onEditTask={handleEditTask}
              onClose={closeEditModal}
            />
          )}
          {isCreateModalOpen && (
            <TaskCreateModal
              onCreateTask={handleCreateTask}
              onClose={closeCreateModal}
            />
          )}
          <button className='add-task-button' onClick={openCreateModal}>Crear Tarea</button>
        </div>
      </div>
    </div>
  );

};

export default Tasks;
