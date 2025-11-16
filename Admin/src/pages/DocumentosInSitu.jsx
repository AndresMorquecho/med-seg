import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { documentosInSitu, anexos1 } from '../data/anexo1Data';

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DocumentosInSitu = ({ companies = initialCompanies }) => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexosEmpresa = anexos1.filter(a => a.empresaId === parseInt(empresaId));
  const documentosEmpresa = documentosInSitu.filter(doc => doc.empresaId === parseInt(empresaId));

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: new Date().toISOString().split('T')[0],
    categoria: '',
    observaciones: '',
    estado: 'Borrador',
    anexo1Id: null
  });
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [archivoPreview, setArchivoPreview] = useState(null);

  const categorias = [
    'Inducción',
    'Inspección cocina',
    'Inspección mina',
    'Inspección áreas',
    'Inspección equipos',
    'Ficha médica',
    'Otros'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const esPDF = file.type === 'application/pdf';
    const esImagen = file.type.startsWith('image/');

    if (!esPDF && !esImagen) {
      alert('Solo se permiten archivos PDF o imágenes (JPG, PNG)');
      return;
    }

    setArchivoSeleccionado(file);

    // Crear preview
    if (esImagen) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setArchivoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setArchivoPreview(null);
    }
  };

  const convertirImagenAPDF = async (file) => {
    // En un entorno real, esto se haría en el backend
    // Por ahora, simulamos que la imagen se convierte a PDF
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulamos la conversión creando un objeto URL
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!archivoSeleccionado) {
      alert('Debe seleccionar un archivo');
      return;
    }

    let archivoFinal = archivoSeleccionado;

    // Si es imagen, convertir a PDF (simulado)
    if (archivoSeleccionado.type.startsWith('image/')) {
      const pdfData = await convertirImagenAPDF(archivoSeleccionado);
      // En producción, esto se enviaría al backend para conversión real
      archivoFinal = new File([pdfData], archivoSeleccionado.name.replace(/\.[^/.]+$/, '.pdf'), {
        type: 'application/pdf'
      });
    }

    // Crear URL del archivo (simulado)
    const archivoUrl = URL.createObjectURL(archivoFinal);

    const nuevoDocumento = {
      id: Date.now(),
      anexo1Id: formData.anexo1Id || null,
      empresaId: parseInt(empresaId),
      nombre: formData.nombre,
      fecha: formData.fecha,
      categoria: formData.categoria,
      archivo: archivoUrl,
      observaciones: formData.observaciones,
      estado: formData.estado,
      subidoPor: 'admin',
      fechaSubida: new Date().toISOString().split('T')[0]
    };

    documentosInSitu.push(nuevoDocumento);

    alert('Documento subido exitosamente');
    
    // Reset form
    setFormData({
      nombre: '',
      fecha: new Date().toISOString().split('T')[0],
      categoria: '',
      observaciones: '',
      estado: 'Borrador',
      anexo1Id: null
    });
    setArchivoSeleccionado(null);
    setArchivoPreview(null);
    setShowForm(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVerDocumento = (documento) => {
    window.open(documento.archivo, '_blank');
  };

  const handlePublicar = (documentoId) => {
    const documento = documentosInSitu.find(d => d.id === documentoId);
    if (documento) {
      documento.estado = 'Publicado';
      alert('Documento publicado exitosamente');
    }
  };

  const handleEliminar = (documentoId) => {
    if (window.confirm('¿Está seguro de eliminar este documento?')) {
      const index = documentosInSitu.findIndex(d => d.id === documentoId);
      if (index !== -1) {
        documentosInSitu.splice(index, 1);
        alert('Documento eliminado');
      }
    }
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
              <FileIcon className="w-8 h-8 text-primary" />
              Documentos In Situ
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
          <h2 className="text-xl font-bold text-gray-800 mb-4">Subir Documento In Situ</h2>
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
                  placeholder="Ej: Inspección de cocina - Enero 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
                </label>
                <input
                  type="date"
                  required
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anexo 1 Relacionado (Opcional)
                </label>
                <select
                  value={formData.anexo1Id || ''}
                  onChange={(e) => setFormData({ ...formData, anexo1Id: e.target.value ? parseInt(e.target.value) : null })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Ninguno</option>
                  {anexosEmpresa.map(anexo => (
                    <option key={anexo.id} value={anexo.id}>
                      Inspección {new Date(anexo.fechaInspeccion).toLocaleDateString('es-ES')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="Borrador">Borrador</option>
                  <option value="Publicado">Publicado</option>
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
                {archivoPreview && (
                  <div className="mt-2">
                    <img src={archivoPreview} alt="Preview" className="max-w-xs border border-gray-300 rounded" />
                    <p className="text-xs text-gray-500 mt-1">La imagen se convertirá a PDF al subir</p>
                  </div>
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
                placeholder="Documento firmado en sitio..."
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
                  setFormData({
                    nombre: '',
                    fecha: new Date().toISOString().split('T')[0],
                    categoria: '',
                    observaciones: '',
                    estado: 'Borrador',
                    anexo1Id: null
                  });
                  setArchivoSeleccionado(null);
                  setArchivoPreview(null);
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de documentos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-surface to-secondary-light/70">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FileIcon className="w-6 h-6 text-primary" />
            Documentos Subidos ({documentosEmpresa.length})
          </h2>
        </div>
        <div className="p-6">
          {documentosEmpresa.length > 0 ? (
            <div className="space-y-4">
              {documentosEmpresa.map((documento) => (
                <div
                  key={documento.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <FileIcon className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="font-semibold text-gray-800">{documento.nombre}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(documento.estado)}`}>
                          {documento.estado}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Fecha:</span> {new Date(documento.fecha).toLocaleDateString('es-ES')}
                        </div>
                        <div>
                          <span className="font-medium">Categoría:</span> {documento.categoria}
                        </div>
                        <div>
                          <span className="font-medium">Subido:</span> {new Date(documento.fechaSubida).toLocaleDateString('es-ES')}
                        </div>
                        {documento.observaciones && (
                          <div className="col-span-2 md:col-span-4">
                            <span className="font-medium">Observaciones:</span> {documento.observaciones}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleVerDocumento(documento)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ver
                      </button>
                      {documento.estado === 'Borrador' && (
                        <>
                          <button
                            onClick={() => handlePublicar(documento.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Publicar
                          </button>
                          <button
                            onClick={() => handleEliminar(documento.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium mb-2">
                No hay documentos subidos
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Sube documentos escaneados del trabajo in situ
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

export default DocumentosInSitu;


