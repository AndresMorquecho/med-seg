import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, calcularPorcentajeCumplimiento, calcularCumplimientoPorCategoria } from '../data/anexo1Data';
import { SECCIONES_SST } from '../components/documentos/anexo1/anexo1';

const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AnalisisAnexo1 = ({ companies = initialCompanies }) => {
  const { empresaId, anexoId } = useParams();
  const navigate = useNavigate();
  
  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexoActual = anexos1.find(a => a.id === parseInt(anexoId));
  const anexosEmpresa = anexos1.filter(a => a.empresaId === parseInt(empresaId))
    .sort((a, b) => new Date(b.fechaInspeccion) - new Date(a.fechaInspeccion));
  
  const anexoAnterior = anexosEmpresa.find(a => a.id !== parseInt(anexoId));

  const [filtro, setFiltro] = useState('all'); // all, incumplidos, observaciones, corregidos

  if (!empresa || !anexoActual) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Anexo 1 no encontrado</p>
        </div>
      </div>
    );
  }

  // Calcular porcentaje de cumplimiento general
  const porcentajeCumplimiento = calcularPorcentajeCumplimiento(anexoActual.respuestas || {});
  
  // Calcular cumplimiento por categoría
  const cumplimientoPorCategoria = useMemo(() => {
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
  }, [anexoActual.respuestas]);

  // Ítems incumplidos
  const itemsIncumplidos = useMemo(() => {
    const items = [];
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          const respuesta = anexoActual.respuestas?.[item.id];
          if (respuesta?.estado === 'NO_CUMPLE') {
            items.push({
              ...item,
              seccion: seccion.titulo,
              observacion: respuesta.observacion || ''
            });
          }
        });
      }
    });
    return items;
  }, [anexoActual.respuestas]);

  // Ítems con observaciones
  const itemsConObservaciones = useMemo(() => {
    const items = [];
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          const respuesta = anexoActual.respuestas?.[item.id];
          if (respuesta?.observacion && respuesta.observacion.trim()) {
            items.push({
              ...item,
              seccion: seccion.titulo,
              observacion: respuesta.observacion,
              estado: respuesta.estado
            });
          }
        });
      }
    });
    return items;
  }, [anexoActual.respuestas]);

  // Comparar con inspección anterior
  const itemsCorregidos = useMemo(() => {
    if (!anexoAnterior) return [];
    const items = [];
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          const respuestaAnterior = anexoAnterior.respuestas?.[item.id];
          const respuestaActual = anexoActual.respuestas?.[item.id];
          if (respuestaAnterior?.estado === 'NO_CUMPLE' && respuestaActual?.estado === 'CUMPLE') {
            items.push({
              ...item,
              seccion: seccion.titulo
            });
          }
        });
      }
    });
    return items;
  }, [anexoActual.respuestas, anexoAnterior]);

  const itemsNuevosIncumplidos = useMemo(() => {
    if (!anexoAnterior) return [];
    const items = [];
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          const respuestaAnterior = anexoAnterior.respuestas?.[item.id];
          const respuestaActual = anexoActual.respuestas?.[item.id];
          if (respuestaAnterior?.estado === 'CUMPLE' && respuestaActual?.estado === 'NO_CUMPLE') {
            items.push({
              ...item,
              seccion: seccion.titulo,
              observacion: respuestaActual.observacion || ''
            });
          }
        });
      }
    });
    return items;
  }, [anexoActual.respuestas, anexoAnterior]);

  // Calcular porcentaje de avance
  const porcentajeAvance = useMemo(() => {
    if (!anexoAnterior) return null;
    const anterior = calcularPorcentajeCumplimiento(anexoAnterior.respuestas || {});
    const actual = calcularPorcentajeCumplimiento(anexoActual.respuestas || {});
    return actual - anterior;
  }, [anexoActual.respuestas, anexoAnterior]);

  const itemsFiltrados = useMemo(() => {
    switch (filtro) {
      case 'incumplidos':
        return itemsIncumplidos;
      case 'observaciones':
        return itemsConObservaciones;
      case 'corregidos':
        return itemsCorregidos;
      default:
        return [];
    }
  }, [filtro, itemsIncumplidos, itemsConObservaciones, itemsCorregidos]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate(`/anexo1/gestion`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Gestión
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <ChartIcon className="w-8 h-8 text-primary" />
              Análisis de Cumplimiento - Anexo 1
            </h1>
            <p className="text-gray-600 mt-1">{empresa.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              Fecha de inspección: {new Date(anexoActual.fechaInspeccion).toLocaleDateString('es-ES')}
            </p>
          </div>
          <button
            onClick={() => navigate(`/anexo1/editor/${empresaId}/${anexoId}`)}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Editar Anexo
          </button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Cumplimiento General</p>
              <p className="text-3xl font-bold text-primary">{porcentajeCumplimiento}%</p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <ChartIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ítems No Cumplidos</p>
              <p className="text-3xl font-bold text-red-600">{itemsIncumplidos.length}</p>
            </div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ítems Corregidos</p>
              <p className="text-3xl font-bold text-green-600">{itemsCorregidos.length}</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {porcentajeAvance !== null && (
          <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${porcentajeAvance >= 0 ? 'border-green-500' : 'border-red-500'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avance vs. Anterior</p>
                <p className={`text-3xl font-bold ${porcentajeAvance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {porcentajeAvance >= 0 ? '+' : ''}{porcentajeAvance}%
                </p>
              </div>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${porcentajeAvance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <svg className={`w-8 h-8 ${porcentajeAvance >= 0 ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {porcentajeAvance >= 0 ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  )}
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gráfico de cumplimiento por categoría */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Cumplimiento por Categoría</h2>
        <div className="space-y-4">
          {Object.entries(cumplimientoPorCategoria).map(([categoria, porcentaje]) => (
            <div key={categoria}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{categoria}</span>
                <span className="text-sm font-bold text-primary">{porcentaje}%</span>
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

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-3">
          <button
            onClick={() => setFiltro('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filtro === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('incumplidos')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filtro === 'incumplidos' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            No Cumplidos ({itemsIncumplidos.length})
          </button>
          <button
            onClick={() => setFiltro('observaciones')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filtro === 'observaciones' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Con Observaciones ({itemsConObservaciones.length})
          </button>
          {anexoAnterior && (
            <button
              onClick={() => setFiltro('corregidos')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filtro === 'corregidos' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Corregidos ({itemsCorregidos.length})
            </button>
          )}
        </div>
      </div>

      {/* Tabla de ítems filtrados */}
      {filtro !== 'all' && itemsFiltrados.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              {filtro === 'incumplidos' && 'Cosas a Corregir del Mes'}
              {filtro === 'observaciones' && 'Ítems con Observaciones'}
              {filtro === 'corregidos' && 'Corregido Esta Vez'}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Categoría</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ítem</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {itemsFiltrados.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.numero}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.seccion}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.texto}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.observacion || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparación con inspección anterior */}
      {anexoAnterior && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Comparación con Inspección Anterior</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Ítems Nuevos en Incumplimiento</h3>
              {itemsNuevosIncumplidos.length > 0 ? (
                <ul className="space-y-2">
                  {itemsNuevosIncumplidos.map(item => (
                    <li key={item.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="font-medium text-sm text-red-800">#{item.numero} - {item.seccion}</div>
                      <div className="text-xs text-red-600 mt-1">{item.texto}</div>
                      {item.observacion && (
                        <div className="text-xs text-red-500 mt-1 italic">{item.observacion}</div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No hay nuevos ítems en incumplimiento</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Ítems Corregidos</h3>
              {itemsCorregidos.length > 0 ? (
                <ul className="space-y-2">
                  {itemsCorregidos.map(item => (
                    <li key={item.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="font-medium text-sm text-green-800">#{item.numero} - {item.seccion}</div>
                      <div className="text-xs text-green-600 mt-1">{item.texto}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No hay ítems corregidos</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalisisAnexo1;


