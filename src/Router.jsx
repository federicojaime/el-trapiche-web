// src/EnhancedRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedMainLayout from './layouts/MainLayout';

// Páginas
import EnhancedHome from './pages/Home';
import MunicipioTransparente from './pages/MunicipioTransparente';
import VivirElTrapiche from './pages/VivirElTrapiche';
import EnhancedTurismo from './pages/Turismo';
import ComoLlegar from './pages/ComoLlegar';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

const EnhancedRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnhancedMainLayout><EnhancedHome /></EnhancedMainLayout>} />
        <Route path="/municipio-transparente" element={<EnhancedMainLayout><MunicipioTransparente /></EnhancedMainLayout>} />
        <Route path="/vivir-el-trapiche" element={<EnhancedMainLayout><VivirElTrapiche /></EnhancedMainLayout>} />
        
        {/* Página de turismo que redirecciona al sitio externo */}
        <Route path="/turismo" element={<EnhancedMainLayout><EnhancedTurismo /></EnhancedMainLayout>} />
        
        {/* Eliminar la ruta /eventos y redirigir a la home */}
        <Route path="/eventos" element={<Navigate to="/" replace />} />
        <Route path="/eventos/:id" element={<Navigate to="/" replace />} />
        
        <Route path="/como-llegar" element={<EnhancedMainLayout><ComoLlegar /></EnhancedMainLayout>} />
        <Route path="/contacto" element={<EnhancedMainLayout><Contacto /></EnhancedMainLayout>} />
        <Route path="*" element={<EnhancedMainLayout><NotFound /></EnhancedMainLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default EnhancedRouter;