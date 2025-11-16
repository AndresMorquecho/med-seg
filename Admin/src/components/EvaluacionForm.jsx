import { useState, useEffect } from 'react';

const EvaluacionForm = ({ 
  onAddEvaluacion, 
  onUpdateEvaluacion, 
  editingEvaluacion, 
  onCancel, 
  capacitaciones 
}) => {
  const [formData, setFormData] = useState({
    capacitacionId: editingEvaluacion?.capacitacionId || '',
    nombre: editingEvaluacion?.nombre || '',
    descripcion: editingEvaluacion?.descripcion || '',
    fechaLimite: editingEvaluacion?.fechaLimite || '',
    estado: editingEvaluacion?.estado || 'Borrador',
    preguntas: editingEvaluacion?.preguntas || [],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPregunta = (tipo) => {
    const nuevaPregunta = {
      id: Date.now(),
      tipo: tipo,
      pregunta: '',
      opciones: tipo === 'opcion-multiple' ? [
        { id: 1, texto: '', correcta: false },
        { id: 2, texto: '', correcta: false },
      ] : [],
      respuestaCorrecta: tipo === 'respuesta-corta' ? '' : '',
    };
    setFormData({
      ...formData,
      preguntas: [...formData.preguntas, nuevaPregunta]
    });
  };

  const handleUpdatePregunta = (preguntaId, field, value) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(p =>
        p.id === preguntaId ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleUpdateOpcion = (preguntaId, opcionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(p => {
        if (p.id === preguntaId) {
          return {
            ...p,
            opciones: p.opciones.map(op =>
              op.id === opcionId ? { ...op, [field]: value } : op
            )
          };
        }
        return p;
      })
    }));
  };

  const handleAddOpcion = (preguntaId) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(p => {
        if (p.id === preguntaId && p.opciones.length < 5) {
          const nuevoId = Math.max(...p.opciones.map(o => o.id), 0) + 1;
          return {
            ...p,
            opciones: [...p.opciones, { id: nuevoId, texto: '', correcta: false }]
          };
        }
        return p;
      })
    }));
  };

  const handleRemoveOpcion = (preguntaId, opcionId) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(p => {
        if (p.id === preguntaId && p.opciones.length > 2) {
          return {
            ...p,
            opciones: p.opciones.filter(op => op.id !== opcionId)
          };
        }
        return p;
      })
    }));
  };

  const handleSetCorrecta = (preguntaId, opcionId) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(p => {
        if (p.id === preguntaId) {
          return {
            ...p,
            opciones: p.opciones.map(op => ({
              ...op,
              correcta: op.id === opcionId
            }))
          };
        }
        return p;
      })
    }));
  };

  const handleRemovePregunta = (preguntaId) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.filter(p => p.id !== preguntaId)
    }));
  };

  const generateLinkUnico = () => {
    const prefix = formData.capacitacionId ? 'EVAL-' : 'EVAL-';
    const date = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${date}-${random}`;
  };

  const generateCodigoAcceso = () => {
    const capacitacion = capacitaciones?.find(c => c.id === parseInt(formData.capacitacionId));
    if (capacitacion) {
      const actividad = capacitacion.actividadRelacionada.substring(0, 3).toUpperCase();
      const year = new Date().getFullYear();
      return `${actividad}${year}`;
    }
    return `EVAL${new Date().getFullYear()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que todas las preguntas estén completas
    const preguntasValidas = formData.preguntas.every(p => {
      if (!p.pregunta.trim()) return false;
      if (p.tipo === 'opcion-multiple') {
        if (p.opciones.length < 2) return false;
        if (!p.opciones.every(op => op.texto.trim())) return false;
        if (!p.opciones.some(op => op.correcta)) return false;
      }
      return true;
    });

    if (!preguntasValidas) {
      alert('Por favor complete todas las preguntas correctamente');
      return;
    }

    if (formData.nombre && formData.capacitacionId && formData.preguntas.length > 0) {
      const linkUnico = editingEvaluacion?.linkUnico || generateLinkUnico();
      const codigoAcceso = editingEvaluacion?.codigoAcceso || generateCodigoAcceso();

      if (editingEvaluacion) {
        onUpdateEvaluacion({
          ...editingEvaluacion,
          ...formData,
          linkUnico,
          codigoAcceso,
          fechaCreacion: editingEvaluacion.fechaCreacion
        });
      } else {
        const newEvaluacion = {
          id: Date.now(),
          ...formData,
          linkUnico,
          codigoAcceso,
          fechaCreacion: new Date().toISOString().split('T')[0]
        };
        onAddEvaluacion(newEvaluacion);
        setFormData({
          capacitacionId: '',
          nombre: '',
          descripcion: '',
          fechaLimite: '',
          estado: 'Borrador',
          preguntas: [],
        });
      }
    }
  };

  const capacitacionSeleccionada = capacitaciones && Array.isArray(capacitaciones) 
    ? capacitaciones.find(c => c && c.id === parseInt(formData.capacitacionId))
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {editingEvaluacion ? 'Editar Evaluación' : 'Nueva Evaluación'}
        </h2>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-secondary text-gray-800 rounded-lg hover:bg-secondary-dark transition-colors"
        >
          {showPreview ? 'Ocultar Vista Previa' : 'Ver Vista Previa'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacitación Asociada *
            </label>
            <select
              name="capacitacionId"
              value={formData.capacitacionId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Seleccione una capacitación</option>
              {capacitaciones && Array.isArray(capacitaciones) && capacitaciones.map(cap => (
                <option key={cap?.id} value={cap?.id}>{cap?.nombre || 'Sin nombre'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Evaluación *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ej: Evaluación: Seguridad en Minería"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Límite
            </label>
            <input
              type="date"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={editingEvaluacion && editingEvaluacion.estado === 'Activa'}
            >
              <option value="Borrador">Borrador</option>
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
              <option value="Finalizada">Finalizada</option>
            </select>
            {editingEvaluacion && editingEvaluacion.estado === 'Activa' && (
              <p className="text-xs text-yellow-600 mt-1 font-medium">
                ⚠️ Esta evaluación está activa. Solo se pueden editar evaluaciones en estado "Borrador".
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Descripción de la evaluación..."
          />
        </div>

        {/* Preguntas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Preguntas *
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAddPregunta('opcion-multiple')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
              >
                + Opción Múltiple
              </button>
              <button
                type="button"
                onClick={() => handleAddPregunta('respuesta-corta')}
                className="px-4 py-2 bg-primary-light text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm"
              >
                + Respuesta Corta
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {formData.preguntas.map((pregunta, idx) => (
              <div key={pregunta.id} className="border border-gray-300 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Pregunta {idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePregunta(pregunta.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Eliminar
                  </button>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={pregunta.pregunta}
                    onChange={(e) => handleUpdatePregunta(pregunta.id, 'pregunta', e.target.value)}
                    placeholder="Escriba la pregunta..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {pregunta.tipo === 'opcion-multiple' && (
                  <div className="space-y-2">
                    {pregunta.opciones.map((opcion, opIdx) => (
                      <div key={opcion.id} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correcta-${pregunta.id}`}
                          checked={opcion.correcta}
                          onChange={() => handleSetCorrecta(pregunta.id, opcion.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <input
                          type="text"
                          value={opcion.texto}
                          onChange={(e) => handleUpdateOpcion(pregunta.id, opcion.id, 'texto', e.target.value)}
                          placeholder={`Opción ${opIdx + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        {pregunta.opciones.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOpcion(pregunta.id, opcion.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    {pregunta.opciones.length < 5 && (
                      <button
                        type="button"
                        onClick={() => handleAddOpcion(pregunta.id)}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        + Agregar opción
                      </button>
                    )}
                    {!pregunta.opciones.some(op => op.correcta) && (
                      <p className="text-xs text-red-600 mt-1">Seleccione la respuesta correcta</p>
                    )}
                  </div>
                )}

                {pregunta.tipo === 'respuesta-corta' && (
                  <div>
                    <textarea
                      value={pregunta.respuestaCorrecta || ''}
                      onChange={(e) => handleUpdatePregunta(pregunta.id, 'respuestaCorrecta', e.target.value)}
                      placeholder="Respuesta de referencia (opcional, para revisión manual)"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Esta pregunta será revisada manualmente</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {formData.preguntas.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">No hay preguntas. Agregue al menos una pregunta.</p>
            </div>
          )}
        </div>

        {/* Vista Previa */}
        {showPreview && formData.preguntas.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vista Previa de la Evaluación</h3>
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{formData.nombre || 'Nombre de la evaluación'}</h4>
                {formData.descripcion && (
                  <p className="text-sm text-gray-600">{formData.descripcion}</p>
                )}
                {capacitacionSeleccionada && (
                  <p className="text-xs text-gray-500 mt-2">
                    Capacitación: {capacitacionSeleccionada.nombre}
                  </p>
                )}
              </div>
              {formData.preguntas.map((pregunta, idx) => (
                <div key={pregunta.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="font-medium text-gray-800 mb-3">
                    {idx + 1}. {pregunta.pregunta || 'Pregunta sin texto'}
                  </p>
                  {pregunta.tipo === 'opcion-multiple' && (
                    <div className="space-y-2">
                      {pregunta.opciones.map((opcion) => (
                        <label key={opcion.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`preview-${pregunta.id}`}
                            disabled
                            className="w-4 h-4"
                          />
                          <span className={opcion.correcta ? 'text-green-600 font-semibold' : 'text-gray-700'}>
                            {opcion.texto || 'Opción sin texto'}
                            {opcion.correcta && ' ✓'}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                  {pregunta.tipo === 'respuesta-corta' && (
                    <textarea
                      disabled
                      placeholder="El trabajador escribirá su respuesta aquí..."
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {editingEvaluacion ? 'Actualizar Evaluación' : 'Crear Evaluación'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EvaluacionForm;

