// Datos simulados de capacitaciones
export const capacitaciones = [
  {
    id: 1,
    nombre: 'Seguridad en Minería Subterránea',
    descripcion: 'Capacitación sobre protocolos de seguridad en trabajos mineros subterráneos',
    fechaProgramada: '2025-02-15',
    actividadRelacionada: 'Minería',
    estado: 'Programada',
    empresasAsignadas: [1, 2], // IDs de empresas
    fechaCreacion: '2025-01-10',
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

