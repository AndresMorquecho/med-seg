import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, getAnexosByEmpresa, calcularPorcentajeCumplimiento } from '../data/anexo1Data';
import { getTareasByEmpresa } from '../data/tareasData';

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BuildingIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const GestionAnexo1 = ({ companies = initialCompanies }) => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  // Calcular estadísticas para cada empresa
  const empresasConEstadisticas = useMemo(() => {
    return companies.map(empresa => {
      const anexosEmpresa = getAnexosByEmpresa(empresa.id);
      const anexoActual = anexosEmpresa.find(a => a.estado === 'Borrador' || a.estado === 'Publicado') || anexosEmpresa[0];
      const porcentajeCumplimiento = anexoActual 
        ? calcularPorcentajeCumplimiento(anexoActual.respuestas || {})
        : 0;
      const ultimaInspeccion = anexosEmpresa.length > 0 
        ? anexosEmpresa[0].fechaInspeccion 
        : null;
      const tareasEmpresa = getTareasByEmpresa(empresa.id);
      const tareasPendientes = tareasEmpresa.filter(t => 
        t.estado === 'Pendiente' || t.estado === 'En revisión'
      ).length;

      return {
        ...empresa,
        porcentajeCumplimiento,
        ultimaInspeccion,
        totalInspecciones: anexosEmpresa.length,
        tareasPendientes
      };
    });
  }, [companies]);

  const empresasFiltradas = useMemo(() => {
    if (!busqueda.trim()) return empresasConEstadisticas;
    
    const busquedaLower = busqueda.toLowerCase();
    return empresasConEstadisticas.filter(empresa =>
      empresa.name.toLowerCase().includes(busquedaLower) ||
      empresa.ruc?.includes(busqueda) ||
      empresa.tipoActividad?.toLowerCase().includes(busquedaLower)
    );
  }, [busqueda, empresasConEstadisticas]);

  const getCumplimientoColor = (porcentaje) => {
    if (porcentaje >= 80) return 'text-green-600 bg-green-100';
    if (porcentaje >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <ChartIcon className="w-8 h-8 text-primary" />
          Gestión Integral del Anexo 1 – SST
        </h1>
        <p className="text-gray-600 mt-1">
          Sistema centralizado de gestión de Seguridad y Salud en el Trabajo
        </p>
      </div>

      {/* Buscador */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar empresa por nombre, RUC o actividad económica..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de empresas en tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empresasFiltradas.map((empresa) => (
          <div
            key={empresa.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
          >
            {/* Header de la tarjeta */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0">
                  {empresa.logo ? (
                    <img
                      src={empresa.logo}
                      alt="Logo"
                      className="w-12 h-12 object-contain rounded border border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                      <BuildingIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate text-lg">{empresa.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">RUC: {empresa.ruc}</p>
                  {empresa.tipoActividad && (
                    <p className="text-xs text-gray-500 mt-1">
                      {empresa.tipoActividad}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Indicadores */}
            <div className="space-y-3 mb-4">
              {/* Cumplimiento */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Cumplimiento</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getCumplimientoColor(empresa.porcentajeCumplimiento)}`}>
                  {empresa.porcentajeCumplimiento}%
                </span>
              </div>

              {/* Última inspección */}
              {empresa.ultimaInspeccion && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Última Inspección</span>
                  <span className="text-sm font-medium text-gray-800">
                    {new Date(empresa.ultimaInspeccion).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}

              {/* Total inspecciones */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Inspecciones</span>
                <span className="text-sm font-medium text-gray-800">
                  {empresa.totalInspecciones}
                </span>
              </div>

              {/* Tareas pendientes */}
              {empresa.tareasPendientes > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tareas Pendientes</span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold">
                    {empresa.tareasPendientes}
                  </span>
                </div>
              )}
            </div>

            {/* Botón de acción */}
            <button
              onClick={() => navigate(`/empresas/${empresa.id}/anexo1/estado`)}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <ChartIcon className="w-5 h-5" />
              Gestionar Anexo 1
            </button>
          </div>
        ))}
      </div>

      {/* Mensaje cuando no hay empresas */}
      {empresasFiltradas.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BuildingIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">
            {busqueda ? 'No se encontraron empresas' : 'No hay empresas registradas'}
          </p>
          <p className="text-gray-500 text-sm">
            {busqueda 
              ? 'Intenta con otros términos de búsqueda'
              : 'Registra una empresa para comenzar'}
          </p>
        </div>
      )}
    </div>
  );
};

export default GestionAnexo1;
