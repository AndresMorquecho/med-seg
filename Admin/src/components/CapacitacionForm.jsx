import { useState, useEffect } from 'react';

const CapacitacionForm = ({ onAddCapacitacion, onUpdateCapacitacion, editingCapacitacion, onCancel, companies, actividadesDisponibles, estadosCapacitacion, empresaId }) => {
  const [formData, setFormData] = useState({
    nombre: editingCapacitacion?.nombre || '',
    descripcion: editingCapacitacion?.descripcion || '',
    fechaProgramada: editingCapacitacion?.fechaProgramada || '',
    actividadRelacionada: editingCapacitacion?.actividadRelacionada || 'Minería',
    estado: editingCapacitacion?.estado || 'Programada',
    empresasAsignadas: editingCapacitacion?.empresasAsignadas || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmpresasChange = (empresaId) => {
    const empresaIdNum = parseInt(empresaId, 10);
    setFormData(prev => {
      const empresas = prev.empresasAsignadas || [];
      if (empresas.includes(empresaIdNum)) {
        return {
          ...prev,
          empresasAsignadas: empresas.filter(id => id !== empresaIdNum)
        };
      } else {
        return {
          ...prev,
          empresasAsignadas: [...empresas, empresaIdNum]
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.fechaProgramada && formData.actividadRelacionada) {
      if (editingCapacitacion) {
        onUpdateCapacitacion({
          ...editingCapacitacion,
          ...formData,
          fechaCreacion: editingCapacitacion.fechaCreacion
        });
      } else {
        const newCapacitacion = {
          id: Date.now(),
          empresaId: empresaId || null,
          ...formData,
          fechaCreacion: new Date().toISOString().split('T')[0]
        };
        onAddCapacitacion(newCapacitacion);
        setFormData({
          nombre: '',
          descripcion: '',
          fechaProgramada: '',
          actividadRelacionada: 'Minería',
          estado: 'Programada',
          empresasAsignadas: [],
        });
      }
    }
  };

  // Filtrar empresas según actividad seleccionada
  const empresasFiltradas = companies?.filter(emp => 
    emp.tipoActividad === formData.actividadRelacionada
  ) || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editingCapacitacion ? 'Editar Capacitación' : 'Nueva Capacitación'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Capacitación *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ej: Seguridad en Minería Subterránea"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Descripción detallada de la capacitación..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Programada *
            </label>
            <input
              type="date"
              name="fechaProgramada"
              value={formData.fechaProgramada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actividad Relacionada *
            </label>
            <select
              name="actividadRelacionada"
              value={formData.actividadRelacionada}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {actividadesDisponibles.map(actividad => (
                <option key={actividad} value={actividad}>{actividad}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {estadosCapacitacion.map(estado => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Empresas Asignadas
          </label>
          <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
            {empresasFiltradas.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No hay empresas disponibles para la actividad seleccionada
              </p>
            ) : (
              empresasFiltradas.map(empresa => (
                <label key={empresa.id} className="flex items-center space-x-2 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
                  <input
                    type="checkbox"
                    checked={formData.empresasAsignadas.includes(empresa.id)}
                    onChange={() => handleEmpresasChange(empresa.id)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{empresa.name}</span>
                </label>
              ))
            )}
          </div>
          {formData.empresasAsignadas.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              {formData.empresasAsignadas.length} empresa(s) seleccionada(s)
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {editingCapacitacion ? 'Actualizar Capacitación' : 'Crear Capacitación'}
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

export default CapacitacionForm;

