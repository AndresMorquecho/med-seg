import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, getAnexosByEmpresa, calcularPorcentajeCumplimiento } from '../data/anexo1Data';
import { getTareasByEmpresa } from '../data/tareasData';
import EmpresaAnexo1Estado from './EmpresaAnexo1Estado';
import EmpresaRepositorio from './EmpresaRepositorio';

const ClipboardList = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const EmpresaAnexo1View = ({ companies = initialCompanies }) => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('estado');

  // Detectar tab activo desde la URL
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart !== 'anexo1' && lastPart !== empresaId) {
      setActiveTab(lastPart);
    }
  }, [location.pathname, empresaId]);

  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexosEmpresa = getAnexosByEmpresa(parseInt(empresaId));
  const tareasEmpresa = getTareasByEmpresa(parseInt(empresaId));
  const anexoActual = anexosEmpresa.find(a => a.estado === 'Borrador' || a.estado === 'Publicado') || anexosEmpresa[0];

  const porcentajeCumplimiento = useMemo(() => {
    if (!anexoActual) return 0;
    return calcularPorcentajeCumplimiento(anexoActual.respuestas || {});
  }, [anexoActual]);

  const tareasPendientes = useMemo(() => {
    return tareasEmpresa.filter(t => t.estado === 'Pendiente' || t.estado === 'En revisión').length;
  }, [tareasEmpresa]);

  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Empresa no encontrada</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'estado', label: 'Estado General', icon: null },
    { id: 'checklist', label: 'Checklist Anexo 1', icon: null },
    { id: 'tareas', label: `Tareas (${tareasPendientes})`, icon: null },
    { id: 'documentos-requeridos', label: 'Documentos Requeridos', icon: null },
    { id: 'documentos-in-situ', label: 'Documentos In Situ', icon: null },
    { id: 'historial', label: 'Historial de Inspecciones', icon: null },
    { id: 'analitica', label: 'Analítica', icon: null }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'checklist') {
      // Si hay un anexo existente, editar ese, sino crear uno nuevo
      if (anexoActual) {
        navigate(`/anexo1/editor/${empresaId}/${anexoActual.id}`);
      } else {
        navigate(`/anexo1/editor/${empresaId}`);
      }
    } else {
      navigate(`/empresas/${empresaId}/anexo1/${tabId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(`/empresas/${empresaId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a {empresa.name}
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-primary" />
              Gestión del Anexo 1 - SST
            </h1>
            <p className="text-gray-600 mt-1">{empresa.name}</p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Contenido según tab activo */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default EmpresaAnexo1View;

