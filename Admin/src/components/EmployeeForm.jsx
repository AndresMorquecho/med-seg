import { useState } from 'react';

// Iconos simples SVG
const UserPlus = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-6-3a3 3 0 11-6 0 3 3 0 016 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);
const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EmployeeForm = ({ onAddEmployee, onUpdateEmployee, companies, employees, editingEmployee, onCancel }) => {
  const [formData, setFormData] = useState(() => {
    if (editingEmployee) {
      return {
        names: editingEmployee.names || editingEmployee.firstName || '',
        lastNames: editingEmployee.lastNames || editingEmployee.lastName || '',
        dni: editingEmployee.dni || editingEmployee.cedula || '',
        position: editingEmployee.position || '',
        actividadesPuesto: editingEmployee.actividadesPuesto || '',
        sexo: editingEmployee.sexo || '',
        fechaInicioLabores: editingEmployee.fechaInicioLabores || '',
        fechaSalida: editingEmployee.fechaSalida || '',
        companyId: editingEmployee.companyId || (companies.length > 0 ? companies[0].id : ''),
        email: editingEmployee.email || ''
      };
    }
    return {
      names: '',
      lastNames: '',
      dni: '',
      position: '',
      actividadesPuesto: '',
      sexo: '',
      fechaInicioLabores: '',
      fechaSalida: '',
      companyId: companies.length > 0 ? companies[0].id : '',
      email: ''
    };
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'companyId' 
        ? parseInt(e.target.value) 
        : e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.names && formData.lastNames && formData.dni && formData.companyId) {
      if (editingEmployee && onUpdateEmployee) {
        // Modo edición
        const updatedEmployee = {
          ...editingEmployee,
          ...formData,
          id: editingEmployee.id
        };
        onUpdateEmployee(updatedEmployee);
      } else if (onAddEmployee) {
        // Modo creación
        const newEmployee = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString().split('T')[0]
        };
        onAddEmployee(newEmployee);
        setFormData({
          names: '',
          lastNames: '',
          dni: '',
          position: '',
          actividadesPuesto: '',
          sexo: '',
          fechaInicioLabores: '',
          fechaSalida: '',
          companyId: companies.length > 0 ? companies[0].id : '',
          email: ''
        });
      }
    }
  };

  // Get employees for the selected company to show in the select
  const getEmployeesForCompany = (companyId) => {
    return employees.filter(emp => emp.companyId === companyId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold text-gray-800">
          {editingEmployee ? 'Editar Trabajador' : 'Registrar Nuevo Trabajador'}
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
              name="names"
              value={formData.names}
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
              name="lastNames"
              value={formData.lastNames}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cédula *
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actividades del Puesto
            </label>
            <textarea
              name="actividadesPuesto"
              value={formData.actividadesPuesto}
              onChange={handleChange}
              rows={3}
              placeholder="Descripción de las actividades principales del puesto..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sexo
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Seleccione</option>
              <option value="H">H</option>
              <option value="M">M</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio de Labores
            </label>
            <input
              type="date"
              name="fechaInicioLabores"
              value={formData.fechaInicioLabores}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Salida
            </label>
            <input
              type="date"
              name="fechaSalida"
              value={formData.fechaSalida}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empresa *
            </label>
            <select
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
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
            <UserPlus className="w-5 h-5" />
            {editingEmployee ? 'Actualizar Trabajador' : 'Registrar Trabajador'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5" />
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;

