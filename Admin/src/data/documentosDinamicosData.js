// Sistema de documentos dinámicos creados (formularios como inspecciones, inducciones, fichas médicas)

export let documentosDinamicos = [
  // Ejemplo de estructura:
  // {
  //   id: 'DOC-001',
  //   tipo: 'inspeccion', // inspeccion, induccion, ficha-medica, otros
  //   empresaId: 1,
  //   empleadoId: null, // null si es general, o ID del empleado si es específico
  //   titulo: 'Inspección de Áreas - Cocina',
  //   fechaCreacion: '2025-01-15',
  //   datos: { ... }, // Datos específicos del formulario
  //   estado: 'Borrador' | 'Publicado',
  //   vinculadoAItem: null, // ID del ítem del Anexo 1 si está vinculado
  //   creadoPor: 'admin'
  // }
];

// Función para obtener documentos por empresa
export const getDocumentosByEmpresa = (empresaId) => {
  return documentosDinamicos.filter(doc => doc.empresaId === empresaId)
    .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
};

// Función para obtener documentos vinculados a un ítem del Anexo 1
export const getDocumentosByItem = (itemId) => {
  return documentosDinamicos.filter(doc => doc.vinculadoAItem === itemId);
};

// Función para crear un nuevo documento dinámico
export const crearDocumentoDinamico = (tipo, empresaId, datos, empleadoId = null) => {
  const nuevoId = `DOC-${String(documentosDinamicos.length + 1).padStart(3, '0')}`;
  const nuevoDocumento = {
    id: nuevoId,
    tipo,
    empresaId,
    empleadoId,
    titulo: datos.titulo || `${tipo} - ${nuevoId}`,
    fechaCreacion: new Date().toISOString().split('T')[0],
    datos,
    estado: 'Borrador',
    vinculadoAItem: null,
    creadoPor: 'admin'
  };
  documentosDinamicos.push(nuevoDocumento);
  return nuevoDocumento;
};

// Función para vincular documento a ítem del Anexo 1
export const vincularDocumentoAItem = (documentoId, itemId) => {
  const documento = documentosDinamicos.find(doc => doc.id === documentoId);
  if (documento) {
    documento.vinculadoAItem = itemId;
  }
};

// Función para actualizar documento
export const actualizarDocumentoDinamico = (documentoId, datos) => {
  const documento = documentosDinamicos.find(doc => doc.id === documentoId);
  if (documento) {
    Object.assign(documento, datos);
    documento.fechaActualizacion = new Date().toISOString().split('T')[0];
  }
};

