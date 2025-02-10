import React from 'react'; 
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar ahora está FUERA del motion.div para evitar el flicker */}
      <Sidebar role="Administrador" />

      <motion.div 
        className="dashboard-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Contenido principal */}
        <div className="content-container">
          <motion.div 
            className="content-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bienvenido al Panel de Control
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Aquí puedes consultar stock de medicamentos, gestionar tareas y usuarios.
            </motion.p>

            <motion.p
              className="hint-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              📌 En la esquina superior izquierda, encontrarás el botón de menú (☰).  
              Haz clic en él para acceder a todas las funcionalidades.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
