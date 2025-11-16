import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, calcularPorcentajeCumplimiento } from '../data/anexo1Data';
import { tareas } from '../data/tareasData';

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
const ClipboardList = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);
const TaskIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Dashboard = ({ companies = initialCompanies, employees = [], documents = [] }) => {
  const navigate = useNavigate();

  // Calcular estadísticas del Anexo 1
  const estadisticasAnexo1 = useMemo(() => {
    const totalInspecciones = anexos1.length;
    const inspeccionesPublicadas = anexos1.filter(a => a.estado === 'Publicado').length;
    const inspeccionesBorrador = anexos1.filter(a => a.estado === 'Borrador').length;
    
    // Calcular cumplimiento promedio
    let cumplimientoTotal = 0;
    let anexosConRespuestas = 0;
    anexos1.forEach(anexo => {
      if (anexo.respuestas && Object.keys(anexo.respuestas).length > 0) {
        cumplimientoTotal += calcularPorcentajeCumplimiento(anexo.respuestas);
        anexosConRespuestas++;
      }
    });
    const cumplimientoPromedio = anexosConRespuestas > 0 
      ? Math.round(cumplimientoTotal / anexosConRespuestas) 
      : 0;

    // Tareas pendientes
    const tareasPendientes = tareas.filter(t => 
      t.estado === 'Pendiente' || t.estado === 'En revisión'
    ).length;

    return {
      totalInspecciones,
      inspeccionesPublicadas,
      inspeccionesBorrador,
      cumplimientoPromedio,
      tareasPendientes
    };
  }, []);

  const stats = [
    {
      title: 'Total Empresas',
      value: companies?.length || 0,
      icon: Building2,
      color: 'bg-primary',
      link: '/companies'
    },
    {
      title: 'Total Trabajadores',
      value: employees?.length || 0,
      icon: Users,
      color: 'bg-green-500',
      link: '/employees'
    },
    {
      title: 'Inspecciones Anexo 1',
      value: estadisticasAnexo1.totalInspecciones,
      icon: ClipboardList,
      color: 'bg-blue-500',
      link: '/anexo1/gestion',
      subtitle: `${estadisticasAnexo1.inspeccionesPublicadas} publicadas`
    },
    {
      title: 'Cumplimiento Promedio',
      value: `${estadisticasAnexo1.cumplimientoPromedio}%`,
      icon: ChartIcon,
      color: estadisticasAnexo1.cumplimientoPromedio >= 80 ? 'bg-green-500' : 
             estadisticasAnexo1.cumplimientoPromedio >= 50 ? 'bg-yellow-500' : 'bg-red-500',
      link: '/anexo1/gestion'
    },
    {
      title: 'Tareas Pendientes',
      value: estadisticasAnexo1.tareasPendientes,
      icon: TaskIcon,
      color: estadisticasAnexo1.tareasPendientes > 0 ? 'bg-red-500' : 'bg-green-500',
      link: '/anexo1/tareas'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general del sistema</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              onClick={() => stat.link && navigate(stat.link)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                  )}
                </div>
                <div className={`${stat.color} p-4 rounded-lg flex-shrink-0`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Acceso rápido al Anexo 1 */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Gestión Integral del Anexo 1 - SST</h2>
            <p className="text-white/90 mb-4">
              Sistema centralizado de gestión de Seguridad y Salud en el Trabajo
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/anexo1/gestion')}
                className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Gestionar Anexo 1
              </button>
              <button
                onClick={() => navigate('/anexo1/tareas')}
                className="bg-white/20 text-white border-2 border-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors font-semibold"
              >
                Ver Tareas ({estadisticasAnexo1.tareasPendientes})
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <ClipboardList className="w-24 h-24 text-white/20" />
          </div>
        </div>
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

