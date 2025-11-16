import { useState } from 'react';

// Iconos simples SVG
const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);
const SaveIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);
const SendIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const UploadSignedDocument = ({ companies, employees, onSave, onPublish }) => {
  const [formData, setFormData] = useState({
    empresaId: '',
    empleadoId: '',
    responsable: '',
    tipo: 'inspeccion',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Draft',
    archivo: null,
    archivoPreviewUrl: null
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({
        ...formData,
        archivo: file,
        archivoPreviewUrl: url
      });
    }
  };

  const handleSave = () => {
    if (!formData.empresaId || !formData.responsable || !formData.archivo) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const empresa = companies.find(c => c.id === parseInt(formData.empresaId));
    const empleado = formData.empleadoId 
      ? employees.find(e => e.id === parseInt(formData.empleadoId))
      : null;

    const document = {
      id: Date.now(),
      empresa: empresa?.name || '',
      empresaId: formData.empresaId,
      empleado: empleado ? `${empleado.names} ${empleado.lastNames}` : '',
      empleadoId: formData.empleadoId || null,
      tecnico: formData.responsable,
      responsable: formData.responsable,
      tipo: formData.tipo === 'inspeccion' ? 'Inspección de Áreas' : formData.tipo,
      fecha: formData.fecha,
      estado: 'Draft',
      archivo: formData.archivoPreviewUrl,
      createdAt: new Date().toISOString()
    };

    if (onSave) {
      onSave(document);
      // Reset form
      setFormData({
        empresaId: '',
        empleadoId: '',
        responsable: '',
        tipo: 'inspeccion',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Draft',
        archivo: null,
        archivoPreviewUrl: null
      });
      const fileInput = document.getElementById('pdf-upload-signed');
      if (fileInput) fileInput.value = '';
      alert('Documento guardado como borrador exitosamente');
    }
  };

  const handlePublish = () => {
    if (!formData.empresaId || !formData.responsable || !formData.archivo) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const empresa = companies.find(c => c.id === parseInt(formData.empresaId));
    const empleado = formData.empleadoId 
      ? employees.find(e => e.id === parseInt(formData.empleadoId))
      : null;

    const document = {
      id: Date.now(),
      empresa: empresa?.name || '',
      empresaId: formData.empresaId,
      empleado: empleado ? `${empleado.names} ${empleado.lastNames}` : '',
      empleadoId: formData.empleadoId || null,
      tecnico: formData.responsable,
      responsable: formData.responsable,
      tipo: formData.tipo === 'inspeccion' ? 'Inspección de Áreas' : formData.tipo,
      fecha: formData.fecha,
      estado: 'Publicado',
      archivo: formData.archivoPreviewUrl,
      createdAt: new Date().toISOString()
    };

    if (onPublish) {
      onPublish(document);
      // Reset form
      setFormData({
        empresaId: '',
        empleadoId: '',
        responsable: '',
        tipo: 'inspeccion',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Draft',
        archivo: null,
        archivoPreviewUrl: null
      });
      const fileInput = document.getElementById('pdf-upload-signed');
      if (fileInput) fileInput.value = '';
      alert('Documento publicado exitosamente');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <UploadIcon className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-800">Subir Documento Escaneado (PDF)</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subir documento escaneado (PDF) * <span className="text-red-500">*</span>
          </label>
          <input
            id="pdf-upload-signed"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {formData.archivoPreviewUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Vista previa del PDF:</p>
              <iframe
                src={formData.archivoPreviewUrl}
                className="w-full h-96 border border-gray-200 rounded"
                title="Vista previa PDF"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa * <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.empresaId}
              onChange={(e) => handleChange('empresaId', e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Seleccione una empresa</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empleado (opcional)
            </label>
            <select
              value={formData.empleadoId}
              onChange={(e) => handleChange('empleadoId', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={!formData.empresaId}
            >
              <option value="">Seleccione un empleado</option>
              {employees
                .filter(emp => emp.companyId === parseInt(formData.empresaId))
                .map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.names} {employee.lastNames} - {employee.position}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Técnico Responsable / Encargado * <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.responsable}
              onChange={(e) => handleChange('responsable', e.target.value)}
              placeholder="Ej: Ing. Roque Maldonado Ramírez"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Documento
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="inspeccion">Inspección de Áreas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => handleChange('fecha', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) => handleChange('estado', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Draft">Draft (Borrador)</option>
              <option value="Publicado">Publicado</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={handleSave}
            disabled={!formData.empresaId || !formData.responsable || !formData.archivo}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SaveIcon className="w-5 h-5" />
            Guardar como Borrador
          </button>
          <button
            onClick={handlePublish}
            disabled={!formData.empresaId || !formData.responsable || !formData.archivo}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 h-5" />
            Publicar Documento
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSignedDocument;

