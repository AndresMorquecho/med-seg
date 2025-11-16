import { useState } from 'react';

// Iconos simples SVG
const Building = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EstablecimientoSaludForm = ({ onAddEstablecimiento, onUpdateEstablecimiento, editingEstablecimiento, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (editingEstablecimiento) {
      return {
        nombre: editingEstablecimiento.nombre || '',
        codigo: editingEstablecimiento.codigo || '',
        direccion: editingEstablecimiento.direccion || '',
        telefono: editingEstablecimiento.telefono || '',
        email: editingEstablecimiento.email || ''
      };
    }
    return {
      nombre: '',
      codigo: '',
      direccion: '',
      telefono: '',
      email: ''
    };
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.codigo) {
      if (editingEstablecimiento && onUpdateEstablecimiento) {
        // Modo edición
        const updatedEstablecimiento = {
          ...editingEstablecimiento,
          ...formData,
          id: editingEstablecimiento.id
        };
        onUpdateEstablecimiento(updatedEstablecimiento);
      } else if (onAddEstablecimiento) {
        // Modo creación
        const newEstablecimiento = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        onAddEstablecimiento(newEstablecimiento);
        setFormData({
          nombre: '',
          codigo: '',
          direccion: '',
          telefono: '',
          email: ''
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-800">
          {editingEstablecimiento ? 'Editar Establecimiento de Salud' : 'Registrar Nuevo Establecimiento de Salud'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Establecimiento *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código *
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              required
              placeholder="Ej: CMO-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
            {editingEstablecimiento ? 'Actualizar Establecimiento' : 'Registrar Establecimiento'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EstablecimientoSaludForm;

