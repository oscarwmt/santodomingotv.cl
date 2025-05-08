// src/admin/AdminLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  BarChart2,
  FileText,
  ShoppingBag,
} from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/noticias", label: "Noticias", icon: <Newspaper size={18} /> },
  { to: "/admin/usuarios", label: "Usuarios", icon: <Users size={18} /> },
  {
    to: "/admin/planes",
    label: "Planes Comerciales",
    icon: <ShoppingBag size={18} />,
  },
  { to: "/admin/clientes", label: "Clientes", icon: <Users size={18} /> },
  {
    to: "/admin/estadisticas",
    label: "Estadísticas",
    icon: <BarChart2 size={18} />,
  },
  { to: "/admin/informes", label: "Informes", icon: <FileText size={18} /> },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-6">
        <h1 className="text-2xl font-bold text-blue-600">SDTV Admin</h1>
        <nav className="space-y-2">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 transition text-sm font-medium ${
                location.pathname === to
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <header className="bg-white shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Panel de Administración
          </h2>
        </header>

        {/* Vista activa */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
