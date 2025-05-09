// src/admin/UsuariosCRUD.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsuariosCRUD = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem('token');
    
    // Verificar si el token está presente
    if (token) {
      axios.get('/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (Array.isArray(res.data)) {
            setUsuarios(res.data);
          } else {
            console.error('La respuesta no es un array:', res.data);
            setUsuarios([]);
          }
        })
        .catch(err => {
          console.error('Error cargando usuarios:', err);
          setUsuarios([]);
        });
    } else {
      console.error('Token no encontrado');
      setUsuarios([]);
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map(usuario => (
              <tr key={usuario.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{usuario.nombre}</td>
                <td className="px-4 py-2">{usuario.email}</td>
                <td className="px-4 py-2">{usuario.rol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosCRUD;
