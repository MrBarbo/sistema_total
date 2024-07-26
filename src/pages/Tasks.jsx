import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  CircularProgress,
  Grid
} from '@mui/material';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import TaskEditModal from '../components/TaskEditModal';
import TaskCreateModal from '../components/TaskCreateModal';
import Cookies from 'js-cookie';
import './styles/Tasks.css';

const Tasks = () => {
  const [tasksData, setTasksData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = Cookies.get('location');
    fetchTasks(savedLocation);
  }, []);

  const fetchTasks = async (savedLocation) => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleCreateTask = async (newTask) => {
    try {
      newTask.Sede = Cookies.get('location');
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

  const handleDropdownToggle = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setActiveTaskId(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveTaskId(null);
  };

  const handleEditClick = (task) => {
    openEditModal(task);
    handleMenuClose();
  };

  const handleDeleteClick = (taskId) => {
    handleDeleteTask(taskId);
    handleMenuClose();
  };

  const isLoading = loading;

  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar role={'Administrador'} />
        </div>
        <Container className='content'>
          <Typography variant='h2' gutterBottom>
            Tareas
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {tasksData.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <Card className='task-card'>
                    <CardContent>
                      <Typography variant='h5' component='div'>
                        {task.Tarea}
                      </Typography>
                      <Typography color='text.secondary'>
                        {task.Descripcion}
                      </Typography>
                      <Typography variant='body2'>
                        <strong>Responsable:</strong> {task.Responsable}
                      </Typography>
                      <Typography variant='body2'>
                        <strong>Inicio:</strong> {new Date(task.FechaDeInicio).toLocaleDateString()}
                      </Typography>
                      <Typography variant='body2'>
                        <strong>Fin:</strong> {new Date(task.FechaDeFin).toLocaleDateString()}
                      </Typography>
                      <Typography variant='body2'>
                        <strong>Estado:</strong> {task.Estatus}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        color='primary'
                        onClick={(event) => handleDropdownToggle(event, task.id)}
                      >
                        Opciones
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Button
            variant='contained'
            color='primary'
            onClick={openCreateModal}
            className='create-task-button'
          >
            Crear Tarea
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleEditClick(selectedTask)}>Editar</MenuItem>
            <MenuItem onClick={() => handleDeleteClick(activeTaskId)}>Eliminar</MenuItem>
          </Menu>
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
        </Container>
      </div>
    </div>
  );
};

export default Tasks;
