// Plantillas de documentos disponibles por categoría
export const documentoTemplates = {
  'INDUCCIÓN': [
    {
      id: 'induccion-minera-planta',
      nombre: 'Inducción Minera - Planta',
      descripcion: 'Inducción de seguridad y salud ocupacional para personal de planta minera',
      icono: '⛏️',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Minería']
    },
    {
      id: 'induccion-trabajador-avicola',
      nombre: 'Inducción Trabajador Avícola',
      descripcion: 'Inducción de seguridad y salud ocupacional para trabajadores avícolas',
      icono: '🐔',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Avicultura']
    },
    {
      id: 'induccion-personal-cocina',
      nombre: 'Inducción Personal de Cocina',
      descripcion: 'Formulario de inducción para personal de cocina con información de seguridad y salud ocupacional',
      icono: '🍳',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Alimentación']
    },
    {
      id: 'induccion-conductor-chofer',
      nombre: 'Inducción Conductor o Chofer',
      descripcion: 'Inducción de seguridad vial y operativa para conductores y choferes',
      icono: '🚛',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Transporte']
    },
    {
      id: 'induccion-cuerpo-bomberos',
      nombre: 'Inducción Cuerpo de Bomberos',
      descripcion: 'Inducción de seguridad y procedimientos para personal de bomberos',
      icono: '🚒',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Otros']
    },
    {
      id: 'induccion-guardia',
      nombre: 'Inducción Guardia',
      descripcion: 'Inducción de seguridad y procedimientos para personal de seguridad y guardias',
      icono: '🛡️',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Otros']
    },
    {
      id: 'induccion-personal-administrativo',
      nombre: 'Inducción Personal Administrativo',
      descripcion: 'Inducción de seguridad y salud ocupacional para personal administrativo',
      icono: '📋',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Otros']
    },
    {
      id: 'induccion-labores-varias',
      nombre: 'Inducción Labores Varias',
      descripcion: 'Inducción general de seguridad y salud ocupacional para labores diversas',
      icono: '🔧',
      categoria: 'INDUCCIÓN',
      requiereEmpleado: true,
      tipoActividad: ['Otros']
    }
  ],
  'FICHA MÉDICA': [
    {
      id: 'ficha-medica-evaluacion-retiro',
      nombre: 'Ficha Médica - Evaluación de Retiro',
      descripcion: 'Evaluación médica ocupacional para retiro de trabajadores',
      icono: '🏥',
      categoria: 'FICHA MÉDICA',
      requiereEmpleado: true,
      tipoActividad: null // Ficha médica es general, no se filtra por actividad
    },
    {
      id: 'ficha-medica-ingreso',
      nombre: 'Ficha Médica - Ingreso',
      descripcion: 'Evaluación médica ocupacional para ingreso de nuevos trabajadores',
      icono: '📋',
      categoria: 'FICHA MÉDICA',
      requiereEmpleado: true,
      tipoActividad: null // Ficha médica es general, no se filtra por actividad
    },
    {
      id: 'ficha-medica-periodica',
      nombre: 'Ficha Médica - Periódica',
      descripcion: 'Evaluación médica ocupacional periódica de trabajadores',
      icono: '🩺',
      categoria: 'FICHA MÉDICA',
      requiereEmpleado: true,
      tipoActividad: null // Ficha médica es general, no se filtra por actividad
    }
  ],
  'INSPECCIONES': [
    {
      id: 'inspeccion-areas-mineria',
      nombre: 'Inspección de Áreas - Minería',
      descripcion: 'Formato de inspección de seguridad en áreas de trabajo minero (boca mina, polvorín, etc.)',
      icono: '🔍',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Minería']
    },
    {
      id: 'inspeccion-areas-avicultura',
      nombre: 'Inspección de Áreas - Avicultura',
      descripcion: 'Formato de inspección de seguridad en áreas de trabajo avícola',
      icono: '🔍',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Avicultura']
    },
    {
      id: 'inspeccion-equipos-mineria',
      nombre: 'Inspección de Equipos - Minería',
      descripcion: 'Inspección de seguridad de maquinaria y equipos mineros (perforadoras, cargadores, etc.)',
      icono: '⚙️',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Minería']
    },
    {
      id: 'inspeccion-equipos-avicultura',
      nombre: 'Inspección de Equipos - Avicultura',
      descripcion: 'Inspección de seguridad de equipos avícolas (silos, molinos, mezcladoras, etc.)',
      icono: '⚙️',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Avicultura']
    },
    {
      id: 'inspeccion-equipos-agricultura',
      nombre: 'Inspección de Equipos - Agricultura',
      descripcion: 'Inspección de seguridad de maquinaria agrícola (tractores, cosechadoras, etc.)',
      icono: '⚙️',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Agricultura']
    },
    {
      id: 'inspeccion-orden-limpieza',
      nombre: 'Inspección de Orden y Limpieza',
      descripcion: 'Inspección de condiciones de orden y limpieza en el lugar de trabajo',
      icono: '🧹',
      categoria: 'INSPECCIONES',
      requiereEmpleado: false,
      tipoActividad: ['Minería', 'Avicultura', 'Agricultura', 'Manufactura', 'Construcción', 'Transporte', 'Alimentación', 'Otros']
    }
  ],
  'OTROS': [
    {
      id: 'informe-psicosocial',
      nombre: 'Informe Psicosocial',
      descripcion: 'Informe de evaluación psicosocial de trabajadores',
      icono: '🧠',
      categoria: 'OTROS',
      requiereEmpleado: true
    },
    {
      id: 'informe-accidente',
      nombre: 'Informe de Accidente',
      descripcion: 'Registro y análisis de accidentes de trabajo',
      icono: '🚨',
      categoria: 'OTROS',
      requiereEmpleado: true
    }
  ]
};

// Función helper para obtener plantillas por categoría y actividad
export const getTemplatesByCategory = (categoria, tipoActividad = null) => {
  const templates = documentoTemplates[categoria] || [];
  
  // Si es FICHA MÉDICA, siempre retornar todas (no se filtra por actividad)
  if (categoria === 'FICHA MÉDICA') {
    return templates;
  }
  
  // Si no hay actividad seleccionada, retornar todas las plantillas
  if (!tipoActividad) {
    return templates;
  }
  
  // Filtrar por actividad: si tipoActividad es null (general) o incluye la actividad seleccionada
  return templates.filter(template => {
    // Si no tiene tipoActividad definido, es general y se muestra para todas
    if (!template.tipoActividad) {
      return true;
    }
    // Si tiene tipoActividad, debe incluir la actividad seleccionada
    return template.tipoActividad.includes(tipoActividad);
  });
};

// Función helper para obtener una plantilla por ID
export const getTemplateById = (id) => {
  for (const categoria in documentoTemplates) {
    const template = documentoTemplates[categoria].find(t => t.id === id);
    if (template) return template;
  }
  return null;
};


