import React from 'react';
import Navbar from '../components/Nav-bar';
import Sidebar from '../components/Sidebar';
import './styles/Dashboard.css'

const Dashboard = () => {
  return (
    <div className='full'>
      <Navbar isLoggedIn={true} />
      <div className='box'>
        <div className='sidebar-box'>
          <Sidebar
          role={'Administrador'}
          />
        </div>
        <div className='content'>
          <h1>DASHBOARD</h1>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;