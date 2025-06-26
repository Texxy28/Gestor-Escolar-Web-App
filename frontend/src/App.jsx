// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Curso from './pages/Curso';
import Estadisticas from './pages/Estadisticas';
import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/curso/:id" element={<Curso />} />
        <Route path="/estadistica" element={<Estadisticas />} />
      </Routes>
    </>
  );
}