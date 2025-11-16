import { useState } from 'react';
import EstablecimientoSaludForm from '../components/EstablecimientoSaludForm';

// Iconos simples SVG
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const BuildingIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const Trash2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const EditIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const EstablecimientosSalud = ({ establecimientos, setEstablecimientos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEstablecimiento, setEditingEstablecimiento] = useState(null);

  const filteredEstablecimientos = establecimientos.filter(est =>
    est.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (est.direccion && est.direccion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddEstablecimiento = (newEstablecimiento) => {
    setEstablecimientos([...establecimientos, newEstablecimiento]);
    setShowForm(false);
    setEditingEstablecimiento(null);
  };

  const handleEditEstablecimiento = (establecimiento) => {
    setEditingEstablecimiento(establecimiento);
    setShowForm(true);
  };

  const handleUpdateEstablecimiento = (updatedEstablecimiento) => {
    setEstablecimientos(establecimientos.map(est => 
      est.id === updatedEstablecimiento.id ? updatedEstablecimiento : est
    ));
    setShowForm(false);
    setEditingEstablecimiento(null);
  };

  const handleDeleteEstablecimiento = (id) => {
    if (window.confirm('¿Está seguro de eliminar este establecimiento de salud?')) {
      setEstablecimientos(establecimientos.filter(est => est.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEstablecimiento(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Establecimientos de Salud</h1>
          <p className="text-gray-600 mt-1">Gestión de establecimientos de salud registrados</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <BuildingIcon className="w-5 h-5" />
          {showForm ? 'Ocultar Formulario' : 'Nuevo Establecimiento'}
        </button>
      </div>

      {showForm && (
        <EstablecimientoSaludForm 
          onAddEstablecimiento={handleAddEstablecimiento}
          onUpdateEstablecimiento={handleUpdateEstablecimiento}
          editingEstablecimiento={editingEstablecimiento}
          onCancel={handleCancel}
        />
      )}

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Lista de establecimientos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstablecimientos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No se encontraron establecimientos de salud
                  </td>
                </tr>
              ) : (
                filteredEstablecimientos.map((est) => (
                  <tr key={est.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{est.nombre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{est.codigo}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{est.direccion || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{est.telefono || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{est.email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditEstablecimiento(est)}
                          className="text-primary hover:text-primary-dark transition-colors"
                          title="Editar establecimiento"
                        >
                          <EditIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEstablecimiento(est.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Eliminar establecimiento"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EstablecimientosSalud;

