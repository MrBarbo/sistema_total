import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Grid,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import TaskEditModal from "../components/TaskEditModal";
import TaskCreateModal from "../components/TaskCreateModal";
import Cookies from "js-cookie";
import "./styles/Tasks.css";

const Tasks = () => {
  const [tasksData, setTasksData] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLocation = Cookies.get("location");
    fetchTasks(savedLocation);
  }, []);

  const fetchTasks = async (savedLocation) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_DIR}/tareas`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasksData(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
    <div className="tasks-page">
      <Sidebar role={"Administrador"} className="sidebar" />
      <div className="tasks-content">
        <Container className="tasks-container">
          <Typography variant="h2" className="tasks-title" align="center" gutterBottom>
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <CircularProgress className="loading-indicator" />
            </Box>
          ) : (
            <Grid container spacing={2} className="tasks-grid">
              {tasksData.map((task) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={task.id} className="task-grid-item">
                  <Card className="task-card">
                    <CardContent>
                      <Typography variant="h5" className="task-title">{task.Tarea}</Typography>
                      <Typography color="textSecondary">{task.Descripcion}</Typography>
                      <Typography variant="body2">
                        <strong>Responsable:</strong> {task.Responsable}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Inicio:</strong> {new Date(task.FechaDeInicio).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Fin:</strong> {new Date(task.FechaDeFin).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Estado:</strong> {task.Estatus}
                      </Typography>
                    </CardContent>
                    <CardActions className="task-actions">
                      <Button size="small" onClick={() => openEditModal(task)}>Editar</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Box display="flex" justifyContent="center" marginTop={3}>
            <Button variant="contained" className="create-task-button" onClick={openCreateModal}>
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
