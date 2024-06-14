
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from '../src/pages/Home'
import Dashboard from '../src/pages/Dashboard'
import Stock from '../src/pages/Stock'
import Tasks from '../src/pages/Tasks'
import MedAttention from '../src/pages/MedAttention'
import Reports from '../src/pages/Reports'
import AccountCreation from '../src/pages/AccountCreation'
import PatientFollowup from './pages/PatientFollowup'
import Dereva from './pages/Dereva'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/tareas" element={<Tasks />} />
        <Route path="/atencion" element={<MedAttention />} />
        <Route path="/pacientes" element={<PatientFollowup />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/creacion" element={<AccountCreation />} />
        <Route path="/dereva" element={<Dereva />} />
      </Routes>
    </BrowserRouter>
      
        
    </>
  )
}

export default App
