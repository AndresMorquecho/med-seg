// Sistema de documentos dinámicos creados (formularios como inspecciones, inducciones, fichas médicas)

export let documentosDinamicos = [
  // Fichas Médicas - Empresa 1 (Minera Los Andes S.A.)
  {
    id: 'FM-001',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 1,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-10',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-10-001',
      numeroArchivo: 'ARCH-2025-01-10-001',
      fechaInicioLabores: '2020-01-15',
      fechaSalida: null,
      tiempoMeses: '60',
      tiempoAnios: '5 años',
      puestoTrabajo: 'Operador de Maquinaria',
      presionArterial: '120/80',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '72 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '75 kg',
      talla: '172 cm',
      indiceMasaCorporal: '25.3',
      perimetroAbdominal: '88 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoSi: false,
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesSi: false,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico dentro de límites normales',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-002',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 5,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-12',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-12-005',
      numeroArchivo: 'ARCH-2025-01-12-005',
      fechaInicioLabores: '2019-03-10',
      tiempoMeses: '70',
      puestoTrabajo: 'Minero',
      presionArterial: '125/82',
      temperatura: '36.8°C',
      frecuenciaCardiaca: '68 lpm',
      saturacionOxigeno: '97%',
      frecuenciaRespiratoria: '16 rpm',
      peso: '82 kg',
      talla: '178 cm',
      indiceMasaCorporal: '25.9',
      perimetroAbdominal: '92 cm',
      antecedentesClinicosQuirurgicos: 'Hipertensión controlada',
      accidentesTrabajoSi: true,
      accidentesTrabajoEspecificar: 'Lesión en mano izquierda - 2023',
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Normal, con cicatriz en mano izquierda',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-003',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 7,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-15',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-15-007',
      numeroArchivo: 'ARCH-2025-01-15-007',
      fechaInicioLabores: '2018-06-01',
      tiempoMeses: '79',
      puestoTrabajo: 'Ingeniero de Minas',
      presionArterial: '118/75',
      temperatura: '36.6°C',
      frecuenciaCardiaca: '70 lpm',
      saturacionOxigeno: '99%',
      frecuenciaRespiratoria: '17 rpm',
      peso: '78 kg',
      talla: '175 cm',
      indiceMasaCorporal: '25.5',
      perimetroAbdominal: '86 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-004',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 8,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-18',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-18-008',
      numeroArchivo: 'ARCH-2025-01-18-008',
      fechaInicioLabores: '2021-02-14',
      tiempoMeses: '47',
      puestoTrabajo: 'Supervisora de Seguridad',
      presionArterial: '110/70',
      temperatura: '36.4°C',
      frecuenciaCardiaca: '74 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '62 kg',
      talla: '165 cm',
      indiceMasaCorporal: '22.8',
      perimetroAbdominal: '74 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico dentro de parámetros normales',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-005',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 9,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-20',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-20-009',
      numeroArchivo: 'ARCH-2025-01-20-009',
      fechaInicioLabores: '2020-05-20',
      tiempoMeses: '56',
      puestoTrabajo: 'Operador de Cargador Frontal',
      presionArterial: '128/85',
      temperatura: '36.7°C',
      frecuenciaCardiaca: '75 lpm',
      saturacionOxigeno: '97%',
      frecuenciaRespiratoria: '17 rpm',
      peso: '85 kg',
      talla: '180 cm',
      indiceMasaCorporal: '26.2',
      perimetroAbdominal: '95 cm',
      antecedentesClinicosQuirurgicos: 'Diabetes tipo 2 controlada',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Normal, requiere seguimiento por diabetes',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-006',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 10,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-22',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-22-010',
      numeroArchivo: 'ARCH-2025-01-22-010',
      fechaInicioLabores: '2019-11-08',
      tiempoMeses: '62',
      puestoTrabajo: 'Soldador',
      presionArterial: '122/78',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '69 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '16 rpm',
      peso: '79 kg',
      talla: '176 cm',
      indiceMasaCorporal: '25.5',
      perimetroAbdominal: '89 cm',
      antecedentesClinicosQuirurgicos: 'Apéndice extirpado - 2015',
      accidentesTrabajoSi: true,
      accidentesTrabajoEspecificar: 'Quemadura leve en brazo - 2022',
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Cicatriz en brazo derecho, resto normal',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-007',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 11,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-25',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-25-011',
      numeroArchivo: 'ARCH-2025-01-25-011',
      fechaInicioLabores: '2022-01-10',
      tiempoMeses: '36',
      puestoTrabajo: 'Enfermera Ocupacional',
      presionArterial: '115/72',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '72 lpm',
      saturacionOxigeno: '99%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '58 kg',
      talla: '162 cm',
      indiceMasaCorporal: '22.1',
      perimetroAbdominal: '72 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-008',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 12,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-28',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-28-012',
      numeroArchivo: 'ARCH-2025-01-28-012',
      fechaInicioLabores: '2018-08-15',
      tiempoMeses: '77',
      puestoTrabajo: 'Mecánico de Mantenimiento',
      presionArterial: '130/88',
      temperatura: '36.6°C',
      frecuenciaCardiaca: '73 lpm',
      saturacionOxigeno: '97%',
      frecuenciaRespiratoria: '17 rpm',
      peso: '88 kg',
      talla: '175 cm',
      indiceMasaCorporal: '28.7',
      perimetroAbdominal: '102 cm',
      antecedentesClinicosQuirurgicos: 'Hipertensión arterial',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Sobrepeso, requiere dieta y ejercicio',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-009',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 13,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-01',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-01-013',
      numeroArchivo: 'ARCH-2025-02-01-013',
      fechaInicioLabores: '2021-07-05',
      tiempoMeses: '43',
      puestoTrabajo: 'Asistente Administrativa',
      presionArterial: '112/68',
      temperatura: '36.4°C',
      frecuenciaCardiaca: '71 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '19 rpm',
      peso: '60 kg',
      talla: '160 cm',
      indiceMasaCorporal: '23.4',
      perimetroAbdominal: '75 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-010',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 14,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-03',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-03-014',
      numeroArchivo: 'ARCH-2025-02-03-014',
      fechaInicioLabores: '2017-01-20',
      tiempoMeses: '96',
      puestoTrabajo: 'Jefe de Planta',
      presionArterial: '135/90',
      temperatura: '36.8°C',
      frecuenciaCardiaca: '76 lpm',
      saturacionOxigeno: '96%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '92 kg',
      talla: '182 cm',
      indiceMasaCorporal: '27.8',
      perimetroAbdominal: '105 cm',
      antecedentesClinicosQuirurgicos: 'Hipertensión, hipercolesterolemia',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Sobrepeso, requiere control médico',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-011',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 15,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-05',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-05-015',
      numeroArchivo: 'ARCH-2025-02-05-015',
      fechaInicioLabores: '2020-09-12',
      tiempoMeses: '52',
      puestoTrabajo: 'Geóloga',
      presionArterial: '118/74',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '70 lpm',
      saturacionOxigeno: '99%',
      frecuenciaRespiratoria: '17 rpm',
      peso: '65 kg',
      talla: '168 cm',
      indiceMasaCorporal: '23.0',
      perimetroAbdominal: '78 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-012',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 16,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-08',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-08-016',
      numeroArchivo: 'ARCH-2025-02-08-016',
      fechaInicioLabores: '2019-04-18',
      tiempoMeses: '69',
      puestoTrabajo: 'Operador de Excavadora',
      presionArterial: '125/80',
      temperatura: '36.6°C',
      frecuenciaCardiaca: '74 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '17 rpm',
      peso: '81 kg',
      talla: '177 cm',
      indiceMasaCorporal: '25.8',
      perimetroAbdominal: '91 cm',
      antecedentesClinicosQuirurgicos: 'Hernia inguinal operada - 2020',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Normal, postoperatorio sin complicaciones',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-013',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 17,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-10',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-10-017',
      numeroArchivo: 'ARCH-2025-02-10-017',
      fechaInicioLabores: '2022-03-22',
      tiempoMeses: '34',
      puestoTrabajo: 'Técnica en Seguridad',
      presionArterial: '108/65',
      temperatura: '36.4°C',
      frecuenciaCardiaca: '73 lpm',
      saturacionOxigeno: '99%',
      frecuenciaRespiratoria: '19 rpm',
      peso: '59 kg',
      talla: '163 cm',
      indiceMasaCorporal: '22.2',
      perimetroAbdominal: '73 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-014',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 18,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-12',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-12-018',
      numeroArchivo: 'ARCH-2025-02-12-018',
      fechaInicioLabores: '2020-11-30',
      tiempoMeses: '50',
      puestoTrabajo: 'Electricista Industrial',
      presionArterial: '122/78',
      temperatura: '36.7°C',
      frecuenciaCardiaca: '72 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '77 kg',
      talla: '174 cm',
      indiceMasaCorporal: '25.4',
      perimetroAbdominal: '87 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoSi: true,
      accidentesTrabajoEspecificar: 'Descarga eléctrica menor - 2023',
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Normal, sin secuelas',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-015',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 19,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-15',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-15-019',
      numeroArchivo: 'ARCH-2025-02-15-019',
      fechaInicioLabores: '2021-05-15',
      tiempoMeses: '45',
      puestoTrabajo: 'Contadora',
      presionArterial: '116/72',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '71 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '63 kg',
      talla: '166 cm',
      indiceMasaCorporal: '22.9',
      perimetroAbdominal: '76 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. José Manuel Gutiérrez',
      codigoProfesional: '12345'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-016',
    tipo: 'ficha-medica',
    empresaId: 1,
    empleadoId: 20,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-02-18',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-02-18-020',
      numeroArchivo: 'ARCH-2025-02-18-020',
      fechaInicioLabores: '2019-12-10',
      tiempoMeses: '62',
      puestoTrabajo: 'Operador de Perforadora',
      presionArterial: '128/83',
      temperatura: '36.6°C',
      frecuenciaCardiaca: '75 lpm',
      saturacionOxigeno: '97%',
      frecuenciaRespiratoria: '16 rpm',
      peso: '84 kg',
      talla: '179 cm',
      indiceMasaCorporal: '26.2',
      perimetroAbdominal: '94 cm',
      antecedentesClinicosQuirurgicos: 'Hipertensión leve',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesSi: true,
      enfermedadesProfesionalesEspecificar: 'Pérdida auditiva por ruido',
      examenFisicoObservaciones: 'Requiere protección auditiva, hipoacusia leve',
      nombresApellidosProfesional: 'Dra. María Elena Vásquez',
      codigoProfesional: '23456'
    },
    creadoPor: 'admin'
  },
  
  // Fichas Médicas - Empresa 2 (Restaurante El Buen Sabor)
  {
    id: 'FM-017',
    tipo: 'ficha-medica',
    empresaId: 2,
    empleadoId: 2,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-15',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-15-002',
      numeroArchivo: 'ARCH-2025-01-15-002',
      fechaInicioLabores: '2020-08-01',
      tiempoMeses: '53',
      puestoTrabajo: 'Chef Ejecutivo',
      presionArterial: '118/75',
      temperatura: '36.5°C',
      frecuenciaCardiaca: '70 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '18 rpm',
      peso: '68 kg',
      talla: '170 cm',
      indiceMasaCorporal: '23.5',
      perimetroAbdominal: '80 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoNo: true,
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Examen físico normal',
      nombresApellidosProfesional: 'Dr. Carlos Ramírez',
      codigoProfesional: '34567'
    },
    creadoPor: 'admin'
  },
  {
    id: 'FM-018',
    tipo: 'ficha-medica',
    empresaId: 2,
    empleadoId: 6,
    titulo: 'Ficha Médica - Examen Periódico',
    fechaCreacion: '2025-01-20',
    estado: 'Publicado',
    datos: {
      numeroHistoriaClinica: 'HC-2025-01-20-006',
      numeroArchivo: 'ARCH-2025-01-20-006',
      fechaInicioLabores: '2022-03-15',
      tiempoMeses: '34',
      puestoTrabajo: 'Auxiliar de Cocina',
      presionArterial: '112/70',
      temperatura: '36.6°C',
      frecuenciaCardiaca: '74 lpm',
      saturacionOxigeno: '98%',
      frecuenciaRespiratoria: '19 rpm',
      peso: '55 kg',
      talla: '158 cm',
      indiceMasaCorporal: '22.0',
      perimetroAbdominal: '71 cm',
      antecedentesClinicosQuirurgicos: 'Sin antecedentes',
      accidentesTrabajoSi: true,
      accidentesTrabajoEspecificar: 'Corte menor en mano - 2024',
      enfermedadesProfesionalesNo: true,
      examenFisicoObservaciones: 'Cicatriz pequeña en mano, resto normal',
      nombresApellidosProfesional: 'Dr. Carlos Ramírez',
      codigoProfesional: '34567'
    },
    creadoPor: 'admin'
  }
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

// Función para publicar documento dinámico
export const publicarDocumentoDinamico = (documentoId) => {
  const documento = documentosDinamicos.find(doc => doc.id === documentoId);
  if (documento) {
    documento.estado = 'Publicado';
    documento.disponibleParaUsuario = true;
  }
};

// Función para eliminar documento dinámico
export const eliminarDocumentoDinamico = (documentoId) => {
  const index = documentosDinamicos.findIndex(doc => doc.id === documentoId);
  if (index !== -1) {
    documentosDinamicos.splice(index, 1);
    return true;
  }
  return false;
};

