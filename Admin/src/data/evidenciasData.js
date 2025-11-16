// Sistema de evidencias adjuntables por ítem del Anexo 1

export let evidencias = [
  // Ejemplo de estructura:
  // {
  //   id: 1,
  //   empresaId: 1,
  //   anexo1Id: 1,
  //   itemId: 'ga1',
  //   nombre: 'Reglamento de Higiene y Seguridad.pdf',
  //   archivo: '/uploads/evidencias/empresa1/anexo1/ga1/reglamento.pdf',
  //   tipo: 'documento', // documento, imagen, video, otro
  //   estado: 'Pendiente', // Pendiente, Aprobado, Rechazado
  //   subidoPor: 'empresa',
  //   aprobadoPor: null,
  //   fechaSubida: '2025-01-15',
  //   fechaAprobacion: null,
  //   observaciones: '',
  //   tamaño: 1024000 // bytes
  // }
];

// Función para obtener evidencias por ítem
export const getEvidenciasByItem = (itemId, anexo1Id) => {
  return evidencias.filter(e => e.itemId === itemId && e.anexo1Id === anexo1Id);
};

// Función para obtener evidencias por empresa
export const getEvidenciasByEmpresa = (empresaId) => {
  return evidencias.filter(e => e.empresaId === empresaId);
};

// Función para aprobar evidencia
export const aprobarEvidencia = (evidenciaId, aprobadoPor, observaciones = '') => {
  const evidencia = evidencias.find(e => e.id === evidenciaId);
  if (evidencia) {
    evidencia.estado = 'Aprobado';
    evidencia.aprobadoPor = aprobadoPor;
    evidencia.fechaAprobacion = new Date().toISOString().split('T')[0];
    evidencia.observaciones = observaciones;
  }
};

// Función para rechazar evidencia
export const rechazarEvidencia = (evidenciaId, rechazadoPor, observaciones) => {
  const evidencia = evidencias.find(e => e.id === evidenciaId);
  if (evidencia) {
    evidencia.estado = 'Rechazado';
    evidencia.aprobadoPor = rechazadoPor;
    evidencia.fechaAprobacion = new Date().toISOString().split('T')[0];
    evidencia.observaciones = observaciones;
  }
};

