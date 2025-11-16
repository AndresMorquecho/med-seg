// Datos simulados de evaluaciones
export let evaluaciones = [
  {
    id: 1,
    capacitacionId: 1,
    nombre: 'Evaluación: Seguridad en Minería Subterránea',
    descripcion: 'Evaluación de conocimientos sobre seguridad minera',
    fechaCreacion: '2025-01-10',
    fechaLimite: '2025-02-20',
    estado: 'Activa', // Ya está activa porque fue enviada
    preguntas: [
      {
        id: 1,
        tipo: 'opcion-multiple',
        pregunta: '¿Cuál es el equipo de protección personal obligatorio en minería subterránea?',
        opciones: [
          { id: 1, texto: 'Casco, botas y guantes', correcta: false },
          { id: 2, texto: 'Casco, lámpara, botas de seguridad y respirador', correcta: true },
          { id: 3, texto: 'Solo casco y botas', correcta: false },
          { id: 4, texto: 'Guantes y gafas de seguridad', correcta: false },
        ],
      },
      {
        id: 2,
        tipo: 'opcion-multiple',
        pregunta: '¿Qué hacer en caso de derrumbe en una mina?',
        opciones: [
          { id: 1, texto: 'Correr hacia la salida inmediatamente', correcta: false },
          { id: 2, texto: 'Buscar un área segura y activar el protocolo de emergencia', correcta: true },
          { id: 3, texto: 'Esperar instrucciones sin moverse', correcta: false },
        ],
      },
      {
        id: 3,
        tipo: 'respuesta-corta',
        pregunta: 'Mencione tres riesgos principales en minería subterránea',
        respuestaCorrecta: '', // Para preguntas abiertas, se revisa manualmente
      },
    ],
    linkUnico: 'EVAL-MIN-2025-001',
    codigoAcceso: 'MIN2025',
  },
  {
    id: 2,
    capacitacionId: 2,
    nombre: 'Evaluación: Manejo Seguro de Maquinaria Agrícola',
    descripcion: 'Evaluación sobre uso seguro de equipos agrícolas',
    fechaCreacion: '2025-01-12',
    fechaLimite: '2025-02-25',
    estado: 'Activa', // Ya está activa porque fue enviada
    preguntas: [
      {
        id: 1,
        tipo: 'opcion-multiple',
        pregunta: '¿Cuál es la velocidad máxima recomendada al operar un tractor?',
        opciones: [
          { id: 1, texto: 'No hay límite de velocidad', correcta: false },
          { id: 2, texto: 'Según las condiciones del terreno y las recomendaciones del fabricante', correcta: true },
          { id: 3, texto: 'Siempre a máxima velocidad', correcta: false },
        ],
      },
      {
        id: 2,
        tipo: 'opcion-multiple',
        pregunta: '¿Qué debe verificar antes de usar maquinaria agrícola?',
        opciones: [
          { id: 1, texto: 'Solo el nivel de combustible', correcta: false },
          { id: 2, texto: 'Combustible, aceite, neumáticos, frenos y sistemas de seguridad', correcta: true },
          { id: 3, texto: 'Solo que esté encendida', correcta: false },
          { id: 4, texto: 'Nada, si funcionó ayer funcionará hoy', correcta: false },
        ],
      },
      {
        id: 3,
        tipo: 'opcion-multiple',
        pregunta: '¿Cuál es la distancia mínima recomendada de personas cuando se opera maquinaria agrícola?',
        opciones: [
          { id: 1, texto: '1 metro', correcta: false },
          { id: 2, texto: '3 metros', correcta: false },
          { id: 3, texto: '5 metros o más, según el tipo de maquinaria', correcta: true },
          { id: 4, texto: 'No importa la distancia', correcta: false },
        ],
      },
      {
        id: 4,
        tipo: 'opcion-multiple',
        pregunta: '¿Qué hacer si detecta una falla en la maquinaria durante su uso?',
        opciones: [
          { id: 1, texto: 'Continuar trabajando hasta terminar', correcta: false },
          { id: 2, texto: 'Detener inmediatamente, apagar el motor y reportar la falla', correcta: true },
          { id: 3, texto: 'Usar la maquinaria con más cuidado', correcta: false },
        ],
      },
      {
        id: 5,
        tipo: 'respuesta-corta',
        pregunta: 'Mencione tres medidas de seguridad al operar maquinaria agrícola',
        respuestaCorrecta: '', // Para preguntas abiertas, se revisa manualmente
      },
    ],
    linkUnico: 'EVAL-AGR-2025-001',
    codigoAcceso: 'AGR2025',
  },
];

// Respuestas de trabajadores a evaluaciones
export let respuestasEvaluaciones = [
  {
    id: 1,
    evaluacionId: 1,
    trabajadorId: 1,
    empresaId: 1,
    fechaRespuesta: '2025-01-15T10:30:00',
    estado: 'Respondida',
    respuestas: [
      {
        preguntaId: 1,
        respuestaSeleccionada: 2, // ID de la opción seleccionada
        esCorrecta: true,
      },
      {
        preguntaId: 2,
        respuestaSeleccionada: 2,
        esCorrecta: true,
      },
      {
        preguntaId: 3,
        respuestaTexto: 'Derrumbe, explosiones, gases tóxicos',
        revisada: false,
      },
    ],
    calificacion: 10, // Sobre 10 puntos
    porcentaje: 100,
  },
  {
    id: 2,
    evaluacionId: 1,
    trabajadorId: 2,
    empresaId: 1,
    fechaRespuesta: null,
    estado: 'Pendiente',
    respuestas: [],
    calificacion: null,
    porcentaje: null,
  },
];

