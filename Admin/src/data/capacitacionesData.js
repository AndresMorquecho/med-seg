// Datos simulados de capacitaciones
export let capacitaciones = [
  {
    id: 1,
    nombre: 'Seguridad en Minería Subterránea',
    descripcion: 'Capacitación sobre protocolos de seguridad en trabajos mineros subterráneos',
    fechaProgramada: '2025-02-15',
    actividadRelacionada: 'Minería',
    estado: 'Programada',
    empresasAsignadas: [1, 2], // IDs de empresas
    fechaCreacion: '2025-01-10',
    anexo1ItemId: null, // ID del ítem del Anexo 1 relacionado
    anexo1Id: null, // ID del Anexo 1 relacionado
    empresaId: null, // ID de la empresa
    trabajadoresAsignados: [], // IDs de trabajadores
    responsable: null, // ID del profesional responsable
    modalidad: 'presencial', // presencial/virtual
    hora: null,
  },
  {
    id: 2,
    nombre: 'Manejo Seguro de Maquinaria Agrícola',
    descripcion: 'Capacitación sobre el uso correcto y seguro de equipos agrícolas',
    fechaProgramada: '2025-02-20',
    actividadRelacionada: 'Agricultura',
    estado: 'En curso',
    empresasAsignadas: [3],
    fechaCreacion: '2025-01-12',
  },
  {
    id: 3,
    nombre: 'Bienestar Animal en Avicultura',
    descripcion: 'Capacitación sobre el manejo ético y seguro de aves de corral',
    fechaProgramada: '2025-01-25',
    actividadRelacionada: 'Avicultura',
    estado: 'Finalizada',
    empresasAsignadas: [4],
    fechaCreacion: '2025-01-05',
  },
];

export const actividadesDisponibles = [
  'Minería',
  'Agricultura',
  'Avicultura',
  'Pesca',
  'Manufactura',
  'Construcción',
  'Transporte',
  'Salud',
  'Alimentación',
  'Otros',
];

export const estadosCapacitacion = ['Programada', 'En curso', 'Finalizada'];

// Función para obtener capacitaciones por ítem del Anexo 1
export const getCapacitacionesByItem = (itemId) => {
  return capacitaciones.filter(c => c.anexo1ItemId === itemId);
};

// Función para crear una capacitación desde un ítem del Anexo 1
export const crearCapacitacionDesdeItem = (itemId, anexo1Id, empresaId, datos) => {
  const nuevaCapacitacion = {
    id: capacitaciones.length > 0 ? Math.max(...capacitaciones.map(c => c.id)) + 1 : 1,
    nombre: datos.titulo || `Capacitación para ítem ${itemId}`,
    descripcion: datos.descripcion || '',
    fechaProgramada: datos.fecha || new Date().toISOString().split('T')[0],
    hora: datos.hora || null,
    modalidad: datos.modalidad || 'presencial',
    responsable: datos.responsable || null,
    trabajadoresAsignados: datos.trabajadores || [],
    actividadRelacionada: datos.actividad || 'General',
    estado: 'Programada',
    empresasAsignadas: [empresaId],
    anexo1ItemId: itemId,
    anexo1Id: anexo1Id,
    empresaId: empresaId,
    fechaCreacion: new Date().toISOString().split('T')[0],
  };
  capacitaciones.push(nuevaCapacitacion);
  return nuevaCapacitacion;
};

