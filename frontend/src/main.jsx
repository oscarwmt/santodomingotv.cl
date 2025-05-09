// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import Dashboard from './admin/Dashboard.jsx';
import NoticiasCRUD from './admin/NoticiasCRUD.jsx';
import UsuariosCRUD from './admin/UsuariosCRUD.jsx';
import './app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Página pública principal */}
        <Route path="/" element={<App />} />

        {/* Panel de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="noticias" element={<NoticiasCRUD />} />
          <Route path="usuarios" element={<UsuariosCRUD />} />
          {/* Puedes agregar más rutas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
