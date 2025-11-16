import { useState, useMemo } from 'react';
import { respuestasEvaluaciones as initialRespuestas } from '../data/evaluacionesData';
import { evaluaciones } from '../data/evaluacionesData';
import { capacitaciones } from '../data/capacitacionesData';

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const DownloadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ControlResultados = ({ employees = [], companies = [] }) => {
  const [respuestas, setRespuestas] = useState(() => {
    try {
      return initialRespuestas || [];
    } catch (error) {
      console.error('Error al inicializar respuestas:', error);
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todas');
  const [filterEvaluacion, setFilterEvaluacion] = useState('Todas');
  const [selectedResultado, setSelectedResultado] = useState(null);

  const resultadosFiltrados = useMemo(() => {
    if (!respuestas || !Array.isArray(respuestas)) return [];
    return respuestas.filter(resp => {
      if (!resp) return false;
      const trabajador = employees?.find(e => e && e.id === resp.trabajadorId);
      const empresa = companies?.find(c => c && c.id === resp.empresaId);
      const evaluacion = evaluaciones?.find(e => e && e.id === resp.evaluacionId);
      
      const matchSearch = 
        (trabajador && `${trabajador.firstName || trabajador.names || ''} ${trabajador.lastName || trabajador.lastNames || ''}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (empresa && empresa.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (evaluacion && evaluacion.nombre?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchEstado = filterEstado === 'Todas' || resp.estado === filterEstado;
      const matchEvaluacion = filterEvaluacion === 'Todas' || resp.evaluacionId === parseInt(filterEvaluacion);
      
      return matchSearch && matchEstado && matchEvaluacion;
    });
  }, [respuestas, searchTerm, filterEstado, filterEvaluacion, employees, companies]);

  const getTrabajadorNombre = (trabajadorId) => {
    const trabajador = employees?.find(e => e.id === trabajadorId);
    if (!trabajador) return 'Trabajador no encontrado';
    return `${trabajador.firstName || trabajador.names || ''} ${trabajador.lastName || trabajador.lastNames || ''}`.trim();
  };

  const getEmpresaNombre = (empresaId) => {
    const empresa = companies?.find(c => c.id === empresaId);
    return empresa ? empresa.name : 'Empresa no encontrada';
  };

  const getEvaluacionNombre = (evaluacionId) => {
    if (!evaluaciones || !Array.isArray(evaluaciones)) return 'Evaluación no encontrada';
    const evaluacion = evaluaciones.find(e => e && e.id === evaluacionId);
    return evaluacion ? evaluacion.nombre : 'Evaluación no encontrada';
  };

  const getCapacitacionNombre = (evaluacionId) => {
    if (!evaluaciones || !Array.isArray(evaluaciones)) return '';
    const evaluacion = evaluaciones.find(e => e && e.id === evaluacionId);
    if (!evaluacion) return '';
    if (!capacitaciones || !Array.isArray(capacitaciones)) return '';
    const cap = capacitaciones.find(c => c && c.id === evaluacion.capacitacionId);
    return cap ? cap.nombre : '';
  };

  const calcularCalificacion = (respuesta) => {
    if (!respuesta || respuesta.estado !== 'Respondida') return null;
    if (!evaluaciones || !Array.isArray(evaluaciones)) return null;
    
    const evaluacion = evaluaciones.find(e => e && e.id === respuesta.evaluacionId);
    if (!evaluacion || !evaluacion.preguntas || !Array.isArray(evaluacion.preguntas)) return null;
    if (!respuesta.respuestas || !Array.isArray(respuesta.respuestas)) return null;

    let correctas = 0;
    let totalPreguntasCerradas = 0;

    respuesta.respuestas.forEach(resp => {
      if (!resp) return;
      const pregunta = evaluacion.preguntas.find(p => p && p.id === resp.preguntaId);
      if (!pregunta) return;

      if (pregunta.tipo === 'opcion-multiple') {
        totalPreguntasCerradas++;
        if (resp.esCorrecta) {
          correctas++;
        }
      }
    });

    if (totalPreguntasCerradas === 0) return null;
    
    const porcentaje = (correctas / totalPreguntasCerradas) * 100;
    const calificacion = (porcentaje / 100) * 10;
    
    return {
      calificacion: calificacion.toFixed(1),
      porcentaje: porcentaje.toFixed(1),
      correctas,
      total: totalPreguntasCerradas
    };
  };

  const generarHTMLResultado = (resultado) => {
    if (!resultado) return '';
    const calificacion = calcularCalificacion(resultado);
    const evaluacion = evaluaciones?.find(e => e && e.id === resultado.evaluacionId);
    if (!evaluacion) return '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Resultado de Evaluación</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #004A7C; border-bottom: 3px solid #004A7C; padding-bottom: 10px; }
            .info { margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 8px; }
            .info p { margin: 8px 0; }
            .calificacion { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #22c55e; }
            .calificacion h2 { margin-top: 0; color: #22c55e; }
            .pregunta { margin: 20px 0; padding: 15px; border-left: 4px solid #004A7C; background: #f8f9fa; border-radius: 4px; }
            .correcta { color: #22c55e; font-weight: bold; }
            .incorrecta { color: #ef4444; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #004A7C; color: white; }
            @media print {
              body { padding: 10px; }
            }
          </style>
        </head>
        <body>
          <h1>Resultado de Evaluación</h1>
          <div class="info">
            <p><strong>Trabajador:</strong> ${getTrabajadorNombre(resultado.trabajadorId)}</p>
            <p><strong>Empresa:</strong> ${getEmpresaNombre(resultado.empresaId)}</p>
            <p><strong>Evaluación:</strong> ${getEvaluacionNombre(resultado.evaluacionId)}</p>
            <p><strong>Capacitación:</strong> ${getCapacitacionNombre(resultado.evaluacionId)}</p>
            <p><strong>Fecha de Respuesta:</strong> ${resultado.fechaRespuesta ? new Date(resultado.fechaRespuesta).toLocaleString('es-ES') : 'Pendiente'}</p>
          </div>
          ${calificacion ? `
            <div class="calificacion">
              <h2>Calificación</h2>
              <p><strong>Nota:</strong> ${calificacion.calificacion} / 10</p>
              <p><strong>Porcentaje:</strong> ${calificacion.porcentaje}%</p>
              <p><strong>Respuestas correctas:</strong> ${calificacion.correctas} de ${calificacion.total}</p>
            </div>
          ` : ''}
          <h2>Respuestas Detalladas</h2>
          ${resultado.respuestas && resultado.respuestas.length > 0 ? resultado.respuestas.map((resp, idx) => {
            const pregunta = evaluacion?.preguntas?.find(p => p && p.id === resp.preguntaId);
            if (!pregunta) return '';
            
            let respuestaHtml = '';
            if (pregunta.tipo === 'opcion-multiple') {
              const opcionSeleccionada = pregunta.opciones?.find(op => op && op.id === resp.respuestaSeleccionada);
              const esCorrecta = resp.esCorrecta;
              const respuestaCorrecta = pregunta.opciones?.find(op => op && op.correcta);
              respuestaHtml = `
                <div class="pregunta">
                  <p><strong>Pregunta ${idx + 1}:</strong> ${pregunta.pregunta || 'Sin pregunta'}</p>
                  <p class="${esCorrecta ? 'correcta' : 'incorrecta'}">
                    Respuesta: ${opcionSeleccionada?.texto || 'No seleccionada'} 
                    ${esCorrecta ? '✓ Correcta' : '✗ Incorrecta'}
                  </p>
                  ${!esCorrecta && respuestaCorrecta ? `<p><strong>Respuesta correcta:</strong> ${respuestaCorrecta.texto}</p>` : ''}
                </div>
              `;
            } else {
              respuestaHtml = `
                <div class="pregunta">
                  <p><strong>Pregunta ${idx + 1}:</strong> ${pregunta.pregunta || 'Sin pregunta'}</p>
                  <p><strong>Respuesta:</strong> ${resp.respuestaTexto || 'Sin respuesta'}</p>
                  <p><em>(Revisión manual requerida)</em></p>
                </div>
              `;
            }
            return respuestaHtml;
          }).join('') : '<p>No hay respuestas disponibles</p>'}
        </body>
      </html>
    `;
  };

  const handleVerDetalle = (resultado) => {
    setSelectedResultado(resultado);
  };

  const handleDescargarPDF = (resultado) => {
    if (!resultado) return;
    const htmlContent = generarHTMLResultado(resultado);
    if (!htmlContent) {
      alert('No se pudo generar el PDF');
      return;
    }

    // Crear una ventana nueva con el contenido HTML
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permite las ventanas emergentes para descargar el PDF');
      return;
    }
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Esperar a que se cargue el contenido y luego abrir el diálogo de impresión
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Trabajador', 'Empresa', 'Evaluación', 'Capacitación', 'Fecha', 'Estado', 'Calificación', 'Porcentaje', 'Correctas', 'Total'],
      ...resultadosFiltrados.map(resp => {
        const calificacion = calcularCalificacion(resp);
        return [
          getTrabajadorNombre(resp.trabajadorId),
          getEmpresaNombre(resp.empresaId),
          getEvaluacionNombre(resp.evaluacionId),
          getCapacitacionNombre(resp.evaluacionId),
          resp.fechaRespuesta ? new Date(resp.fechaRespuesta).toLocaleString('es-ES') : 'Pendiente',
          resp.estado,
          calificacion ? calificacion.calificacion : '-',
          calificacion ? calificacion.porcentaje + '%' : '-',
          calificacion ? calificacion.correctas : '-',
          calificacion ? calificacion.total : '-'
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resultados_evaluaciones_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const estadisticas = useMemo(() => {
    const total = resultadosFiltrados.length;
    const respondidas = resultadosFiltrados.filter(r => r.estado === 'Respondida').length;
    const pendientes = total - respondidas;
    const porcentajeRespuestas = total > 0 ? ((respondidas / total) * 100).toFixed(1) : 0;
    
    return { total, respondidas, pendientes, porcentajeRespuestas };
  }, [resultadosFiltrados]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Control y Resultados</h1>
          <p className="text-gray-600 mt-1">Gestiona y visualiza los resultados de las evaluaciones</p>
        </div>
        {resultadosFiltrados.length > 0 && (
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            Exportar Excel
          </button>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total de Evaluaciones</p>
          <p className="text-3xl font-bold text-gray-800">{estadisticas.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Respondidas</p>
          <p className="text-3xl font-bold text-green-600">{estadisticas.respondidas}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Pendientes</p>
          <p className="text-3xl font-bold text-yellow-600">{estadisticas.pendientes}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">% de Respuestas</p>
          <p className="text-3xl font-bold text-primary">{estadisticas.porcentajeRespuestas}%</p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por trabajador, empresa o evaluación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Todas">Todas las respuestas</option>
            <option value="Respondida">Respondida</option>
            <option value="Pendiente">Pendiente</option>
          </select>
          <select
            value={filterEvaluacion}
            onChange={(e) => setFilterEvaluacion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Todas">Todas las evaluaciones</option>
            {evaluaciones && Array.isArray(evaluaciones) && evaluaciones.map(evaluacion => (
              <option key={evaluacion?.id} value={evaluacion?.id}>{evaluacion?.nombre || 'Sin nombre'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de resultados */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Trabajador</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Evaluación</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fecha</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase">Estado</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase">Calificación</th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {resultadosFiltrados.map(resultado => {
                const calificacion = calcularCalificacion(resultado);
                return (
                  <tr key={resultado.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getTrabajadorNombre(resultado.trabajadorId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {getEmpresaNombre(resultado.empresaId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="max-w-xs truncate" title={getEvaluacionNombre(resultado.evaluacionId)}>
                        {getEvaluacionNombre(resultado.evaluacionId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {resultado.fechaRespuesta 
                        ? new Date(resultado.fechaRespuesta).toLocaleDateString('es-ES')
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        resultado.estado === 'Respondida' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {resultado.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      {calificacion ? (
                        <div>
                          <span className="font-semibold text-gray-900">{calificacion.calificacion}/10</span>
                          <span className="text-gray-500 ml-1">({calificacion.porcentaje}%)</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                      {resultado.estado === 'Respondida' && (
                        <button
                          onClick={() => handleVerDetalle(resultado)}
                          className="text-primary hover:text-primary-dark font-medium px-3 py-1 rounded hover:bg-primary-light transition-colors"
                        >
                          Ver Detalle
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {resultadosFiltrados.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No se encontraron resultados</p>
        </div>
      )}

      {/* Modal de Previsualización */}
      {selectedResultado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">Detalle de Resultado</h2>
              <button
                onClick={() => setSelectedResultado(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                title="Cerrar"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <iframe
                srcDoc={generarHTMLResultado(selectedResultado)}
                className="w-full h-full border border-gray-300 rounded-lg"
                title="Previsualización de Resultado"
                style={{ minHeight: '600px' }}
              />
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setSelectedResultado(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleDescargarPDF(selectedResultado)}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                <DownloadIcon className="w-5 h-5" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlResultados;

