import React from 'react';
import { Newspaper, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bienvenido al Panel de Administración</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Newspaper size={28} />} label="Noticias publicadas" value="128" />
        <StatCard icon={<Users size={28} />} label="Usuarios registrados" value="32" />
        <StatCard icon={<FileText size={28} />} label="Borradores" value="6" />
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
