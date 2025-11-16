import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, calcularPorcentajeCumplimiento } from '../data/anexo1Data';

const HistoryIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HistoricoAnexo1 = ({ companies = initialCompanies }) => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  
  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexosEmpresa = anexos1
    .filter(a => a.empresaId === parseInt(empresaId))
    .sort((a, b) => new Date(b.fechaInspeccion) - new Date(a.fechaInspeccion));

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
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/anexo1/gestion')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Gestión
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <HistoryIcon className="w-8 h-8 text-primary" />
              Histórico de Inspecciones - Anexo 1
            </h1>
            <p className="text-gray-600 mt-1">{empresa.name}</p>
          </div>
        </div>
      </div>

      {/* Lista de inspecciones */}
      {anexosEmpresa.length > 0 ? (
        <div className="space-y-4">
          {anexosEmpresa.map((anexo, index) => {
            const porcentaje = calcularPorcentajeCumplimiento(anexo.respuestas || {});
            const anexoAnterior = index < anexosEmpresa.length - 1 ? anexosEmpresa[index + 1] : null;
            const porcentajeAnterior = anexoAnterior ? calcularPorcentajeCumplimiento(anexoAnterior.respuestas || {}) : null;
            const diferencia = porcentajeAnterior !== null ? porcentaje - porcentajeAnterior : null;

            return (
              <div
                key={anexo.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">#{anexosEmpresa.length - index}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          Inspección {new Date(anexo.fechaInspeccion).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Estado: <span className={`font-semibold ${
                            anexo.estado === 'Publicado' ? 'text-green-600' : 'text-yellow-600'
                          }`}>{anexo.estado}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Cumplimiento</p>
                        <p className="text-2xl font-bold text-primary">{porcentaje}%</p>
                        {diferencia !== null && (
                          <p className={`text-xs mt-1 ${diferencia >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {diferencia >= 0 ? '+' : ''}{diferencia}% vs. anterior
                          </p>
                        )}
                      </div>
                      {anexo.fechaReinspeccion && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-600 mb-1">Reinspección</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {new Date(anexo.fechaReinspeccion).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Actualizado</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {new Date(anexo.fechaActualizacion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-600">
                        <span className="font-semibold">Creado por:</span> {anexo.creadoPor}
                      </span>
                      {anexo.documentosInSitu && anexo.documentosInSitu.length > 0 && (
                        <span className="text-gray-600">
                          <span className="font-semibold">Documentos in situ:</span> {anexo.documentosInSitu.length}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => navigate(`/anexo1/editor/${empresaId}/${anexo.id}`)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
                    >
                      Ver/Editar
                    </button>
                    <button
                      onClick={() => navigate(`/empresas/${empresaId}/anexo1/analitica?anexo=${anexo.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                    >
                      Análisis
                    </button>
                      <button
                        onClick={() => {
                          // Descargar PDF (simulado)
                          window.print();
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                      >
                        Descargar PDF
                      </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <HistoryIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">
            No hay inspecciones en el histórico
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Crea una nueva inspección para comenzar
          </p>
          <button
            onClick={() => navigate(`/anexo1/editor/${empresaId}`)}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Nueva Inspección
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoricoAnexo1;


