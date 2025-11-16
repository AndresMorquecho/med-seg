import { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1, getAnexosByEmpresa } from '../data/anexo1Data';
import { evidencias, getEvidenciasByEmpresa, aprobarEvidencia, rechazarEvidencia } from '../data/evidenciasData';
import { SECCIONES_SST } from '../components/documentos/anexo1/anexo1';

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const EmpresaRepositorio = ({ companies = initialCompanies }) => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexosEmpresa = getAnexosByEmpresa(parseInt(empresaId));
  const evidenciasEmpresa = getEvidenciasByEmpresa(parseInt(empresaId));

  const [filtroEstado, setFiltroEstado] = useState('all');
  const [filtroCategoria, setFiltroCategoria] = useState('all');
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    itemId: '',
    categoria: '',
    observaciones: ''
  });
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const evidenciasFiltradas = useMemo(() => {
    let filtradas = evidenciasEmpresa;

    if (filtroEstado !== 'all') {
      filtradas = filtradas.filter(e => e.estado === filtroEstado);
    }

    if (filtroCategoria !== 'all') {
      filtradas = filtradas.filter(e => e.itemId && e.itemId.startsWith(filtroCategoria));
    }

    if (busqueda.trim()) {
      const busquedaLower = busqueda.toLowerCase();
      filtradas = filtradas.filter(e =>
        e.nombre.toLowerCase().includes(busquedaLower) ||
        e.observaciones?.toLowerCase().includes(busquedaLower)
      );
    }

    return filtradas.sort((a, b) => new Date(b.fechaSubida) - new Date(a.fechaSubida));
  }, [evidenciasEmpresa, filtroEstado, filtroCategoria, busqueda]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivoSeleccionado(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!archivoSeleccionado) {
      alert('Debe seleccionar un archivo');
      return;
    }

    const archivoUrl = URL.createObjectURL(archivoSeleccionado);
    const nuevaEvidencia = {
      id: Date.now(),
      empresaId: parseInt(empresaId),
      anexo1Id: formData.itemId ? anexosEmpresa[0]?.id : null,
      itemId: formData.itemId || null,
      nombre: formData.nombre || archivoSeleccionado.name,
      archivo: archivoUrl,
      tipo: archivoSeleccionado.type.startsWith('image/') ? 'imagen' : 'documento',
      estado: 'Pendiente',
      subidoPor: 'empresa',
      aprobadoPor: null,
      fechaSubida: new Date().toISOString().split('T')[0],
      fechaAprobacion: null,
      observaciones: formData.observaciones,
      tamaño: archivoSeleccionado.size
    };

    evidencias.push(nuevaEvidencia);
    alert('Documento subido exitosamente');
    
    setFormData({ nombre: '', itemId: '', categoria: '', observaciones: '' });
    setArchivoSeleccionado(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAprobar = (evidenciaId) => {
    if (window.confirm('¿Aprobar este documento?')) {
      aprobarEvidencia(evidenciaId, 'admin');
      alert('Documento aprobado');
    }
  };

  const handleRechazar = (evidenciaId) => {
    const observaciones = prompt('Ingrese motivo de rechazo:');
    if (observaciones) {
      rechazarEvidencia(evidenciaId, 'admin', observaciones);
      alert('Documento rechazado');
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Obtener todos los ítems del Anexo 1 para el selector
  const todosLosItems = useMemo(() => {
    const items = [];
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          items.push({
            id: item.id,
            texto: `#${item.numero} - ${item.texto.substring(0, 50)}...`,
            seccion: seccion.titulo
          });
        });
      }
    });
    return items;
  }, []);

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
              onClick={() => navigate(`/empresas/${empresaId}`)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a {empresa.name}
            </button>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <UploadIcon className="w-8 h-8 text-primary" />
              Repositorio de Evidencias
            </h1>
            <p className="text-gray-600 mt-1">{empresa.name}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <UploadIcon className="w-5 h-5" />
            {showForm ? 'Cancelar' : 'Subir Documento'}
          </button>
        </div>
      </div>

      {/* Formulario de subida */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Subir Documento al Repositorio</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Documento *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ej: Reglamento de Higiene y Seguridad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asociar a Ítem del Anexo 1 (Opcional)
                </label>
                <select
                  value={formData.itemId}
                  onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Ningún ítem</option>
                  {todosLosItems.map(item => (
                    <option key={item.id} value={item.id}>{item.texto}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Sin categoría</option>
                  <option value="documento-legal">Documento Legal</option>
                  <option value="certificado">Certificado</option>
                  <option value="informe">Informe</option>
                  <option value="registro">Registro</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo (PDF o Imagen) *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {archivoSeleccionado && (
                  <p className="text-sm text-gray-600 mt-1">
                    {archivoSeleccionado.name} ({(archivoSeleccionado.size / 1024).toFixed(2)} KB)
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones
              </label>
              <textarea
                value={formData.observaciones}
                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Observaciones sobre el documento..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Subir Documento
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ nombre: '', itemId: '', categoria: '', observaciones: '' });
                  setArchivoSeleccionado(null);
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar documento..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
          </select>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {SECCIONES_SST.filter(s => s.tipo === 'checklist').map(seccion => (
              <option key={seccion.id} value={seccion.id}>{seccion.titulo}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setFiltroEstado('all');
              setFiltroCategoria('all');
              setBusqueda('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600 mb-1">Total Documentos</p>
          <p className="text-2xl font-bold text-blue-600">{evidenciasEmpresa.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600 mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {evidenciasEmpresa.filter(e => e.estado === 'Pendiente').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600 mb-1">Aprobados</p>
          <p className="text-2xl font-bold text-green-600">
            {evidenciasEmpresa.filter(e => e.estado === 'Aprobado').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <p className="text-sm text-gray-600 mb-1">Rechazados</p>
          <p className="text-2xl font-bold text-red-600">
            {evidenciasEmpresa.filter(e => e.estado === 'Rechazado').length}
          </p>
        </div>
      </div>

      {/* Lista de documentos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-surface to-secondary-light/70">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <UploadIcon className="w-6 h-6 text-primary" />
            Documentos ({evidenciasFiltradas.length})
          </h2>
        </div>
        <div className="p-6">
          {evidenciasFiltradas.length > 0 ? (
            <div className="space-y-4">
              {evidenciasFiltradas.map((evidencia) => {
                // Buscar el ítem asociado
                let itemAsociado = null;
                if (evidencia.itemId) {
                  SECCIONES_SST.forEach(seccion => {
                    if (seccion.tipo === 'checklist' && seccion.items) {
                      const item = seccion.items.find(i => i.id === evidencia.itemId);
                      if (item) {
                        itemAsociado = { ...item, seccion: seccion.titulo };
                      }
                    }
                  });
                }

                return (
                  <div
                    key={evidencia.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="font-semibold text-gray-800">{evidencia.nombre}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(evidencia.estado)}`}>
                            {evidencia.estado}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Tipo:</span> {evidencia.tipo}
                          </div>
                          <div>
                            <span className="font-medium">Subido:</span> {new Date(evidencia.fechaSubida).toLocaleDateString('es-ES')}
                          </div>
                          <div>
                            <span className="font-medium">Tamaño:</span> {(evidencia.tamaño / 1024).toFixed(2)} KB
                          </div>
                          {itemAsociado && (
                            <div>
                              <span className="font-medium">Ítem:</span> #{itemAsociado.numero} - {itemAsociado.seccion}
                            </div>
                          )}
                        </div>
                        {evidencia.observaciones && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
                            <span className="font-medium">Observaciones:</span> {evidencia.observaciones}
                          </div>
                        )}
                        {evidencia.estado === 'Rechazado' && evidencia.observaciones && (
                          <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-600">
                            <span className="font-medium">Motivo de rechazo:</span> {evidencia.observaciones}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => window.open(evidencia.archivo, '_blank')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Ver
                        </button>
                        {evidencia.estado === 'Pendiente' && (
                          <>
                            <button
                              onClick={() => handleAprobar(evidencia.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Aprobar
                            </button>
                            <button
                              onClick={() => handleRechazar(evidencia.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Rechazar
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <UploadIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No hay documentos
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Sube documentos para comenzar
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                <UploadIcon className="w-5 h-5" />
                Subir Primer Documento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpresaRepositorio;

