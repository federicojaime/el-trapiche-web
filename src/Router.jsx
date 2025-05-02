// Configuración de rutas de la aplicación
// src/Router.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Páginas
import Home from './pages/Home';
import MunicipioTransparente from './pages/MunicipioTransparente';
import VivirElTrapiche from './pages/VivirElTrapiche';
import Turismo from './pages/Turismo';
import Eventos from './pages/Eventos';
import ComoLlegar from './pages/ComoLlegar';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/municipio-transparente" element={<MainLayout><MunicipioTransparente /></MainLayout>} />
        <Route path="/vivir-el-trapiche" element={<MainLayout><VivirElTrapiche /></MainLayout>} />
        <Route path="/turismo" element={<MainLayout><Turismo /></MainLayout>} />
        <Route path="/eventos" element={<MainLayout><Eventos /></MainLayout>} />
        <Route path="/como-llegar" element={<MainLayout><ComoLlegar /></MainLayout>} />
        <Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;