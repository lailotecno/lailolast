import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { BuscadorListingPage } from './pages/BuscadorListingPage';
import { MobileBottomNavbar } from './components/MobileBottomNavbar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { isValidVehicleType, isValidPropertyType } from './utils/typeNormalization';

// Componente para validar e redirecionar tipos inválidos
const ValidatedVeiculosRoute: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const isValid = isValidVehicleType(tipo || 'todos');
  
  if (!isValid) {
    return <Navigate to="/buscador/veiculos/todos" replace />;
  }
  
  return <BuscadorListingPage category="veiculos" />;
};

const ValidatedImoveisRoute: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const isValid = isValidPropertyType(tipo || 'todos');
  
  if (!isValid) {
    return <Navigate to="/buscador/imoveis/todos" replace />;
  }
  
  return <BuscadorListingPage category="imoveis" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Routes>
          {/* Redirect /buscador to default */}
          <Route path="/buscador" element={<Navigate to="/buscador/veiculos/todos" replace />} />
          
          {/* Redirect category roots to /todos */}
          <Route path="/buscador/veiculos" element={<Navigate to="/buscador/veiculos/todos" replace />} />
          <Route path="/buscador/imoveis" element={<Navigate to="/buscador/imoveis/todos" replace />} />
          
          {/* Main listing pages with validation */}
          <Route path="/buscador/veiculos/:tipo" element={<ValidatedVeiculosRoute />} />
          <Route path="/buscador/imoveis/:tipo" element={<ValidatedImoveisRoute />} />
          
          {/* Placeholder routes for other sections */}
          <Route path="/favoritos" element={<div className="p-8 text-center">Favoritos - Em desenvolvimento</div>} />
          <Route path="/leiloeiros" element={<div className="p-8 text-center">Leiloeiros - Em desenvolvimento</div>} />
          <Route path="/usuario" element={<div className="p-8 text-center">Usuário - Em desenvolvimento</div>} />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/buscador/veiculos/todos" replace />} />
          
          {/* 404 for invalid routes */}
          <Route path="*" element={<Navigate to="/buscador/veiculos/todos" replace />} />
        </Routes>
        
        {/* Navigation Components */}
        <MobileBottomNavbar />
        <DesktopSidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;