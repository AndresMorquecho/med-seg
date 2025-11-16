import { useState } from 'react';

// Iconos simples SVG
const UserCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const Plus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ProfesionalForm = ({ onAddProfesional, onUpdateProfesional, editingProfesional, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (editingProfesional) {
      return {
        nombres: editingProfesional.nombres || '',
        apellidos: editingProfesional.apellidos || '',
        codigo: editingProfesional.codigo || '',
        especialidad: editingProfesional.especialidad || '',
        tipoProfesional: editingProfesional.tipoProfesional || 'Médico',
        registro: editingProfesional.registro || '',
        email: editingProfesional.email || '',
        telefono: editingProfesional.telefono || ''
      };
    }
    return {
      nombres: '',
      apellidos: '',
      codigo: '',
      especialidad: '',
      tipoProfesional: 'Médico',
      registro: '',
      email: '',
      telefono: ''
    };
  });

  const tiposProfesional = ['Médico', 'Ingeniero', 'Técnico', 'Otro'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombres && formData.apellidos && formData.codigo) {
      if (editingProfesional && onUpdateProfesional) {
        // Modo edición
        const updatedProfesional = {
          ...editingProfesional,
          ...formData,
          id: editingProfesional.id
        };
        onUpdateProfesional(updatedProfesional);
      } else if (onAddProfesional) {
        // Modo creación
        const newProfesional = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        onAddProfesional(newProfesional);
        setFormData({
          nombres: '',
          apellidos: '',
          codigo: '',
          especialidad: '',
          tipoProfesional: 'Médico',
          registro: '',
          email: '',
          telefono: ''
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <UserCircle className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-800">
          {editingProfesional ? 'Editar Profesional' : 'Registrar Nuevo Profesional'}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombres *
            </label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellidos *
            </label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
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
              placeholder="Ej: PROF-001"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Profesional
            </label>
            <select
              name="tipoProfesional"
              value={formData.tipoProfesional}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {tiposProfesional.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especialidad
            </label>
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              placeholder="Ej: Medicina Ocupacional"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Registro
            </label>
            <input
              type="text"
              name="registro"
              value={formData.registro}
              onChange={handleChange}
              placeholder="Nº de registro profesional"
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
          <div>
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
            {editingProfesional ? 'Actualizar Profesional' : 'Registrar Profesional'}
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

export default ProfesionalForm;

