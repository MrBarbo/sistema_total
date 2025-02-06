import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
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

  return (
    <div className='tasks-page' style={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      <Sidebar role={'Administrador'} style={{ width: '250px', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Navbar isLoggedIn={true} style={{ width: '100%' }} />
        <Container maxWidth='lg' style={{ flexGrow: 1, overflowY: 'auto', paddingBottom: '20px' }}>
          <Typography variant='h2' className='tasks-title' align='center' gutterBottom>
            Tareas
          </Typography>
          {loading ? (
            <Box display='flex' justifyContent='center' alignItems='center' height='50vh'>
              <CircularProgress className='loading-indicator' />
            </Box>
          ) : (
            <Grid container spacing={3} className='tasks-grid'>
              {tasksData.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id} style={{ display: 'flex' }}>
                  <Card className='task-card' style={{ flex: 1, minHeight: '250px', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flexGrow: 1 }}>
                      <Typography variant='h5'>{task.Tarea}</Typography>
                      <Typography color='textSecondary'>{task.Descripcion}</Typography>
                      <Typography variant='body2'><strong>Responsable:</strong> {task.Responsable}</Typography>
                      <Typography variant='body2'><strong>Inicio:</strong> {new Date(task.FechaDeInicio).toLocaleDateString()}</Typography>
                      <Typography variant='body2'><strong>Fin:</strong> {new Date(task.FechaDeFin).toLocaleDateString()}</Typography>
                      <Typography variant='body2'><strong>Estado:</strong> {task.Estatus}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' onClick={() => openEditModal(task)}>Editar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box display='flex' justifyContent='center' marginTop={3}>
            <Button variant='contained' className='create-task-button' onClick={openCreateModal}>
              Crear Tarea
            </Button>
          </Box>
          {isEditModalOpen && (
            <TaskEditModal task={selectedTask} onEditTask={() => {}} onClose={closeEditModal} />
          )}
          {isCreateModalOpen && (
            <TaskCreateModal onCreateTask={() => {}} onClose={closeCreateModal} />
          )}
        </Container>
      </div>
    </div>
  );
};

export default Tasks;
