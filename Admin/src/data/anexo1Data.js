// Estructura de datos para el Anexo 1 - SST
// Cada empresa puede tener múltiples inspecciones del Anexo 1

export let anexos1 = [
  // Ejemplo de estructura:
  // {
  //   id: 1,
  //   empresaId: 1,
  //   fechaInspeccion: '2025-01-15',
  //   fechaReinspeccion: null,
  //   fechaMaximaInfo: '2025-02-15',
  //   estado: 'Borrador' | 'Publicado',
  //   datosGenerales: { ... },
  //   respuestas: { ga1: { estado: 'CUMPLE', observacion: '' }, ... },
  //   documentosInSitu: [],
  //   creadoPor: 'admin',
  //   fechaCreacion: '2025-01-15',
  //   fechaActualizacion: '2025-01-15'
  // }
];

// Documentos in situ subidos manualmente
export let documentosInSitu = [
  // Ejemplo:
  // {
  //   id: 1,
  //   anexo1Id: 1,
  //   empresaId: 1,
  //   nombre: 'Inspección de cocina - Enero 2025',
  //   fecha: '2025-01-15',
  //   categoria: 'Inspección cocina',
  //   archivo: '/uploads/anexo1/empresa1/inspeccion-cocina-2025-01.pdf',
  //   observaciones: 'Documento firmado en sitio',
  //   estado: 'Publicado',
  //   subidoPor: 'admin',
  //   fechaSubida: '2025-01-16'
  // }
];

// Función helper para obtener anexos por empresa
export const getAnexosByEmpresa = (empresaId) => {
  return anexos1.filter(anexo => anexo.empresaId === empresaId)
    .sort((a, b) => new Date(b.fechaInspeccion) - new Date(a.fechaInspeccion));
};

// Función helper para obtener documentos in situ por anexo
export const getDocumentosByAnexo = (anexo1Id) => {
  return documentosInSitu.filter(doc => doc.anexo1Id === anexo1Id);
};

// Función helper para calcular porcentaje de cumplimiento
export const calcularPorcentajeCumplimiento = (respuestas) => {
  if (!respuestas || Object.keys(respuestas).length === 0) return 0;
  
  const items = Object.values(respuestas);
  const cumplidos = items.filter(r => r.estado === 'CUMPLE').length;
  const total = items.filter(r => r.estado !== 'NA').length;
  
  return total > 0 ? Math.round((cumplidos / total) * 100) : 0;
};

// Función helper para calcular cumplimiento por categoría
export const calcularCumplimientoPorCategoria = (respuestas, categoriaItems) => {
  const itemsCategoria = categoriaItems.map(item => respuestas[item.id]);
  const cumplidos = itemsCategoria.filter(r => r && r.estado === 'CUMPLE').length;
  const total = itemsCategoria.filter(r => r && r.estado !== 'NA').length;
  
  return total > 0 ? Math.round((cumplidos / total) * 100) : 0;
};


