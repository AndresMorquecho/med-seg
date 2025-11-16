import { useState, useMemo } from 'react';
import CapacitacionForm from '../components/CapacitacionForm';
import { capacitaciones as initialCapacitaciones, actividadesDisponibles, estadosCapacitacion } from '../data/capacitacionesData';

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Capacitaciones = ({ companies }) => {
  const [capacitaciones, setCapacitaciones] = useState(initialCapacitaciones);
  const [showForm, setShowForm] = useState(false);
  const [editingCapacitacion, setEditingCapacitacion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [filterActividad, setFilterActividad] = useState('Todas');

  const capacitacionesFiltradas = useMemo(() => {
    return capacitaciones.filter(cap => {
      const matchSearch = cap.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cap.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchEstado = filterEstado === 'Todos' || cap.estado === filterEstado;
      const matchActividad = filterActividad === 'Todas' || cap.actividadRelacionada === filterActividad;
      return matchSearch && matchEstado && matchActividad;
    });
  }, [capacitaciones, searchTerm, filterEstado, filterActividad]);

  const handleAddCapacitacion = (newCapacitacion) => {
    setCapacitaciones([...capacitaciones, newCapacitacion]);
    setShowForm(false);
  };

  const handleUpdateCapacitacion = (updatedCapacitacion) => {
    setCapacitaciones(capacitaciones.map(cap =>
      cap.id === updatedCapacitacion.id ? updatedCapacitacion : cap
    ));
    setEditingCapacitacion(null);
    setShowForm(false);
  };

  const handleDeleteCapacitacion = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta capacitación?')) {
      setCapacitaciones(capacitaciones.filter(cap => cap.id !== id));
    }
  };

  const handleEdit = (cap) => {
    setEditingCapacitacion(cap);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCapacitacion(null);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Programada':
        return 'bg-blue-100 text-blue-800';
      case 'En curso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEmpresasNombres = (empresasIds) => {
    if (!companies || !empresasIds) return [];
    return empresasIds.map(id => {
      const empresa = companies.find(e => e.id === id);
      return empresa ? empresa.name : `Empresa ${id}`;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Capacitaciones</h1>
          <p className="text-gray-600 mt-1">Gestiona las capacitaciones mensuales por empresa</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingCapacitacion(null);
          }}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Capacitación
        </button>
      </div>

      {showForm && (
        <CapacitacionForm
          onAddCapacitacion={handleAddCapacitacion}
          onUpdateCapacitacion={handleUpdateCapacitacion}
          editingCapacitacion={editingCapacitacion}
          onCancel={handleCancel}
          companies={companies}
          actividadesDisponibles={actividadesDisponibles}
          estadosCapacitacion={estadosCapacitacion}
        />
      )}

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
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
            <option value="Todos">Todos los estados</option>
            {estadosCapacitacion.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
          <select
            value={filterActividad}
            onChange={(e) => setFilterActividad(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="Todas">Todas las actividades</option>
            {actividadesDisponibles.map(actividad => (
              <option key={actividad} value={actividad}>{actividad}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de capacitaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capacitacionesFiltradas.map(cap => {
          const empresasNombres = getEmpresasNombres(cap.empresasAsignadas);
          return (
            <div key={cap.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{cap.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{cap.descripcion}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Fecha:</span>
                  <span className="font-medium text-gray-700">
                    {new Date(cap.fechaProgramada).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Actividad:</span>
                  <span className="font-medium text-gray-700">{cap.actividadRelacionada}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Estado:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(cap.estado)}`}>
                    {cap.estado}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Empresas:</span>
                  <span className="font-medium text-gray-700">{empresasNombres.length}</span>
                </div>
              </div>

              {empresasNombres.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Asignada a:</p>
                  <div className="flex flex-wrap gap-1">
                    {empresasNombres.slice(0, 2).map((nombre, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {nombre}
                      </span>
                    ))}
                    {empresasNombres.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{empresasNombres.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => handleEdit(cap)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <EditIcon className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCapacitacion(cap.id)}
                  className="flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {capacitacionesFiltradas.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No se encontraron capacitaciones</p>
        </div>
      )}
    </div>
  );
};

export default Capacitaciones;

