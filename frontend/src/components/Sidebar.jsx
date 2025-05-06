import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-xl font-semibold">Secciones</h2>
      <ul>
        <li><a href="#" className="text-blue-600">Clima</a></li>
        <li><a href="#" className="text-blue-600">Deportes Locales</a></li>
        <li><a href="#" className="text-blue-600">Emprendedores</a></li>
        <li><a href="#" className="text-blue-600">Farmacias de Turno</a></li>
        <li><a href="#" className="text-blue-600">Ofertas de Negocios</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
