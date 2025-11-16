import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, getAnexosByEmpresa } from '../data/anexo1Data';

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

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const FileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const GestionAnexo1 = ({ companies = initialCompanies }) => {
  const navigate = useNavigate();
  const [empresaBusqueda, setEmpresaBusqueda] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  const empresasFiltradas = useMemo(() => {
    if (!empresaBusqueda.trim()) return [];
    return companies.filter(empresa =>
      empresa.name.toLowerCase().includes(empresaBusqueda.toLowerCase()) ||
      empresa.ruc?.includes(empresaBusqueda)
    ).slice(0, 5);
  }, [empresaBusqueda, companies]);

  const anexosEmpresa = useMemo(() => {
    if (!empresaSeleccionada) return [];
    return getAnexosByEmpresa(empresaSeleccionada.id);
  }, [empresaSeleccionada]);

  const handleSeleccionarEmpresa = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setEmpresaBusqueda(empresa.name);
  };

  const handleNuevoAnexo = () => {
    if (!empresaSeleccionada) {
      alert('Debe seleccionar una empresa primero');
      return;
    }
    navigate(`/anexo1/editor/${empresaSeleccionada.id}`);
  };

  const handleEditarAnexo = (anexoId) => {
    navigate(`/anexo1/editor/${empresaSeleccionada.id}/${anexoId}`);
  };

  const handleVerAnalisis = (anexoId) => {
    navigate(`/anexo1/analisis/${empresaSeleccionada.id}/${anexoId}`);
  };

  const handleVerHistorico = () => {
    navigate(`/anexo1/historico/${empresaSeleccionada.id}`);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Publicado':
        return 'bg-green-100 text-green-800';
      case 'Borrador':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FileIcon className="w-8 h-8 text-primary" />
          Gestión del Anexo 1 – SST
        </h1>
        <p className="text-gray-600 mt-1">
          Gestión digital completa del Anexo 1 de Seguridad y Salud en el Trabajo por empresa
        </p>
      </div>

      {/* Selección de Empresa */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Seleccionar Empresa</h2>
        <div className="relative">
          <input
            type="text"
            value={empresaBusqueda}
            onChange={(e) => {
              setEmpresaBusqueda(e.target.value);
              setEmpresaSeleccionada(null);
            }}
            placeholder="Buscar empresa por nombre o RUC..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          {empresasFiltradas.length > 0 && !empresaSeleccionada && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {empresasFiltradas.map((empresa) => (
                <button
                  key={empresa.id}
                  onClick={() => handleSeleccionarEmpresa(empresa)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <BuildingIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{empresa.name}</div>
                    <div className="text-xs text-gray-500 truncate">RUC: {empresa.ruc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Card de empresa seleccionada */}
        {empresaSeleccionada && (
          <div className="mt-4 p-4 bg-primary/10 border border-primary rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {empresaSeleccionada.logo ? (
                    <img src={empresaSeleccionada.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                      <BuildingIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{empresaSeleccionada.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">RUC: {empresaSeleccionada.ruc}</p>
                  <p className="text-sm text-gray-600">{empresaSeleccionada.address}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEmpresaSeleccionada(null);
                  setEmpresaBusqueda('');
                }}
                className="text-red-500 hover:text-red-700 text-xs px-2 py-1"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Acciones principales */}
      {empresaSeleccionada && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleNuevoAnexo}
            className="flex items-center justify-center gap-3 bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-dark transition-colors shadow-md"
          >
            <PlusIcon className="w-6 h-6" />
            <span className="font-semibold">Nueva Inspección</span>
          </button>
          <button
            onClick={handleVerHistorico}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <FileIcon className="w-6 h-6" />
            <span className="font-semibold">Ver Histórico</span>
          </button>
          <button
            onClick={() => navigate(`/anexo1/documentos/${empresaSeleccionada.id}`)}
            className="flex items-center justify-center gap-3 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            <FileIcon className="w-6 h-6" />
            <span className="font-semibold">Documentos In Situ</span>
          </button>
        </div>
      )}

      {/* Lista de inspecciones recientes */}
      {empresaSeleccionada && anexosEmpresa.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-surface to-secondary-light/70">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileIcon className="w-6 h-6 text-primary" />
              Inspecciones Recientes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {anexosEmpresa.map((anexo) => (
                <div
                  key={anexo.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(anexo.estado)}`}>
                          {anexo.estado}
                        </span>
                        <span className="text-sm text-gray-600">
                          Fecha: {new Date(anexo.fechaInspeccion).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      {anexo.fechaReinspeccion && (
                        <p className="text-sm text-gray-600 mb-2">
                          Reinspección: {new Date(anexo.fechaReinspeccion).toLocaleDateString('es-ES')}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditarAnexo(anexo.id)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleVerAnalisis(anexo.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                      >
                        <ChartIcon className="w-4 h-4" />
                        Análisis
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay inspecciones */}
      {empresaSeleccionada && anexosEmpresa.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">
            No hay inspecciones registradas para esta empresa
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Crea una nueva inspección para comenzar
          </p>
          <button
            onClick={handleNuevoAnexo}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            Nueva Inspección
          </button>
        </div>
      )}

      {/* Mensaje cuando no hay empresa seleccionada */}
      {!empresaSeleccionada && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <BuildingIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">
            Selecciona una empresa para gestionar su Anexo 1
          </p>
          <p className="text-gray-500 text-sm">
            Busca una empresa en el campo de búsqueda superior
          </p>
        </div>
      )}
    </div>
  );
};

export default GestionAnexo1;

