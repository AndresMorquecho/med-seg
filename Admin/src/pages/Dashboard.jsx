import { useState, useEffect } from 'react';

// Iconos simples SVG
const Building2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const FileText = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Dashboard = ({ companies, employees, documents }) => {
  const stats = [
    {
      title: 'Total Empresas',
      value: companies?.length || 0,
      icon: Building2,
      color: 'bg-primary'
    },
    {
      title: 'Total Trabajadores',
      value: employees?.length || 0,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Total Documentos',
      value: documents?.length || 0,
      icon: FileText,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general del sistema</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actividad reciente */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="text-sm text-gray-700">Última empresa registrada</p>
            <p className="text-xs text-gray-500">
              {companies && companies.length > 0
                ? companies[companies.length - 1].name
                : 'No hay empresas registradas'}
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="text-sm text-gray-700">Último trabajador registrado</p>
            <p className="text-xs text-gray-500">
              {employees && employees.length > 0
                ? `${employees[employees.length - 1].names} ${employees[employees.length - 1].lastNames}`
                : 'No hay trabajadores registrados'}
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="text-sm text-gray-700">Último documento generado</p>
            <p className="text-xs text-gray-500">
              {documents && documents.length > 0
                ? `Documento ${documents[documents.length - 1].type}`
                : 'No hay documentos generados'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

