import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, getAnexosByEmpresa, calcularPorcentajeCumplimiento, calcularCumplimientoPorCategoria } from '../data/anexo1Data';
import { getTareasByEmpresa } from '../data/tareasData';
import { getEvidenciasByEmpresa } from '../data/evidenciasData';
import { SECCIONES_SST } from '../components/documentos/anexo1/anexo1';

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TaskIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const FileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EmpresaAnexo1Estado = ({ companies = initialCompanies }) => {
  const { empresaId } = useParams();
  const navigate = useNavigate();

  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexosEmpresa = getAnexosByEmpresa(parseInt(empresaId));
  const anexoActual = anexosEmpresa.find(a => a.estado === 'Borrador' || a.estado === 'Publicado') || anexosEmpresa[0];
  const tareasEmpresa = getTareasByEmpresa(parseInt(empresaId));

  const porcentajeCumplimiento = useMemo(() => {
    if (!anexoActual || !anexoActual.respuestas) return 0;
    const respuestas = anexoActual.respuestas;
    const items = Object.values(respuestas);
    // Fórmula: CUMPLE / (CUMPLE + NO_CUMPLE), excluyendo NA
    const cumplidos = items.filter(r => r.estado === 'CUMPLE').length;
    const noCumplidos = items.filter(r => r.estado === 'NO_CUMPLE').length;
    const total = cumplidos + noCumplidos;
    return total > 0 ? Math.round((cumplidos / total) * 100) : 0;
  }, [anexoActual]);

  const cumplimientoPorCategoria = useMemo(() => {
    if (!anexoActual) return {};
    const categorias = {};
    SECCIONES_SST.filter(s => s.tipo === 'checklist').forEach(seccion => {
      if (seccion.items) {
        const porcentaje = calcularCumplimientoPorCategoria(
          anexoActual.respuestas || {},
          seccion.items
        );
        categorias[seccion.titulo] = porcentaje;
      }
    });
    return categorias;
  }, [anexoActual]);

  const itemsNoCumplen = useMemo(() => {
    if (!anexoActual || !anexoActual.respuestas) return 0;
    return Object.values(anexoActual.respuestas).filter(r => r.estado === 'NO_CUMPLE').length;
  }, [anexoActual]);

  const tareasPendientes = useMemo(() => {
    return tareasEmpresa.filter(t => t.estado === 'Pendiente' || t.estado === 'En revisión').length;
  }, [tareasEmpresa]);

  const documentosFaltantes = useMemo(() => {
    if (!anexoActual || !anexoActual.respuestas) return 0;
    // Contar ítems NO CUMPLE que no tienen evidencias subidas
    const evidenciasEmpresa = getEvidenciasByEmpresa(parseInt(empresaId));
    const itemsNoCumplen = Object.entries(anexoActual.respuestas)
      .filter(([_, respuesta]) => respuesta.estado === 'NO_CUMPLE');
    
    return itemsNoCumplen.filter(([itemId, _]) => {
      const evidenciasItem = evidenciasEmpresa.filter(e => 
        e.itemId === itemId && e.anexo1Id === anexoActual.id
      );
      return evidenciasItem.length === 0;
    }).length;
  }, [anexoActual, empresaId]);

  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Empresa no encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cumplimiento Total */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Cumplimiento Total</p>
              <p className="text-4xl font-bold text-primary">{porcentajeCumplimiento}%</p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ChartIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Ítems No Cumplen */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ítems No Cumplen</p>
              <p className="text-4xl font-bold text-red-600">{itemsNoCumplen}</p>
            </div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Tareas Pendientes */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tareas Pendientes</p>
              <p className="text-4xl font-bold text-orange-600">{tareasPendientes}</p>
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <TaskIcon className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Documentos Faltantes */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Documentos Faltantes</p>
              <p className="text-4xl font-bold text-yellow-600">{documentosFaltantes}</p>
            </div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Última Inspección */}
        {anexoActual && (
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Última Inspección</p>
                <p className="text-lg font-bold text-blue-600">
                  {new Date(anexoActual.fechaInspeccion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-1">{anexoActual.estado}</p>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        )}

        {/* Total Inspecciones */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Inspecciones</p>
              <p className="text-4xl font-bold text-purple-600">{anexosEmpresa.length}</p>
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <FileIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Cumplimiento por Categoría */}
      {Object.keys(cumplimientoPorCategoria).length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cumplimiento por Categoría</h2>
          <div className="space-y-4">
            {Object.entries(cumplimientoPorCategoria).map(([categoria, porcentaje]) => (
              <div key={categoria}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{categoria}</span>
                  <span className={`text-sm font-bold ${
                    porcentaje >= 80 ? 'text-green-600' :
                    porcentaje >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {porcentaje}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      porcentaje >= 80 ? 'bg-green-500' :
                      porcentaje >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => {
            if (anexoActual) {
              navigate(`/anexo1/editor/${empresaId}/${anexoActual.id}`);
            } else {
              navigate(`/anexo1/editor/${empresaId}`);
            }
          }}
          className="flex items-center justify-center gap-3 bg-primary text-white px-6 py-4 rounded-lg hover:bg-primary-dark transition-colors shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-semibold">
            {anexoActual ? 'Continuar Inspección' : 'Nueva Inspección'}
          </span>
        </button>
        <button
          onClick={() => navigate(`/empresas/${empresaId}/anexo1/historial`)}
          className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <FileIcon className="w-6 h-6" />
          <span className="font-semibold">Ver Inspecciones Anteriores</span>
        </button>
        <button
          onClick={() => navigate(`/empresas/${empresaId}/anexo1/tareas`)}
          className="flex items-center justify-center gap-3 bg-orange-600 text-white px-6 py-4 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
        >
          <TaskIcon className="w-6 h-6" />
          <span className="font-semibold">Ver Tareas ({tareasPendientes})</span>
        </button>
        <button
          onClick={() => navigate(`/empresas/${empresaId}/anexo1/documentos-requeridos`)}
          className="flex items-center justify-center gap-3 bg-yellow-600 text-white px-6 py-4 rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
        >
          <FileIcon className="w-6 h-6" />
          <span className="font-semibold">Ver Documentos ({documentosFaltantes})</span>
        </button>
        <button
          onClick={() => navigate(`/empresas/${empresaId}/repositorio`)}
          className="flex items-center justify-center gap-3 bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
        >
          <FileIcon className="w-6 h-6" />
          <span className="font-semibold">Ir al Repositorio</span>
        </button>
        <button
          onClick={() => navigate(`/empresas/${empresaId}/anexo1/analitica`)}
          className="flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <ChartIcon className="w-6 h-6" />
          <span className="font-semibold">Ver Analítica</span>
        </button>
      </div>
    </div>
  );
};

export default EmpresaAnexo1Estado;

