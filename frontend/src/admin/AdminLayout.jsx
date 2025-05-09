import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold border-b">Panel Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/admin/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavLink to="/admin/noticias" icon={<Newspaper size={18} />} label="Noticias" />
          <NavLink to="/admin/usuarios" icon={<Users size={18} />} label="Usuarios" />
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center text-red-600 hover:underline">
            <LogOut size={18} className="mr-2" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 border-b">
          <h1 className="text-lg font-semibold">Administración</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </Link>
);

export default AdminLayout;
