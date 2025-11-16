import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1 } from '../data/anexo1Data';
import { SECCIONES_SST } from '../components/documentos/anexo1/anexo1';
import { crearTareaDesdeItem, tareas, getTareasByItem, actualizarEstadoTarea } from '../data/tareasData';
import { getEvidenciasByItem, evidencias } from '../data/evidenciasData';
import { updateRespuestaItem } from '../data/anexo1Data';
import { getDocumentosByEmpresa, getDocumentosByItem, vincularDocumentoAItem } from '../data/documentosDinamicosData';

const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const SaveIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const PrinterIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);

const EditorAnexo1 = ({ companies = initialCompanies }) => {
  const { empresaId, anexoId } = useParams();
  const navigate = useNavigate();
  
  const empresa = companies.find(c => c.id === parseInt(empresaId));
  const anexoExistente = anexoId ? anexos1.find(a => a.id === parseInt(anexoId)) : null;

  const [datosGenerales, setDatosGenerales] = useState(() => {
    if (anexoExistente) return anexoExistente.datosGenerales || {};
    return {
      inspeccion: '',
      fecha_inspeccion: new Date().toISOString().split('T')[0],
      reinspeccion: '',
      fecha_reinspeccion: '',
      fecha_maxima_info: '',
      tipo_empresa: '',
      empleador: empresa?.name || '',
      telefono: '',
      razon_social: empresa?.name || '',
      ruc: empresa?.ruc || '',
      correo: empresa?.email || '',
      actividad_economica: empresa?.tipoActividad || '',
      tipo_centro_trabajo: '',
      direccion_centro: empresa?.address || '',
      numero_total_trabajadores: '',
      consolidado_iess: '',
      trabajadores_centro: '',
      hombres: '',
      mujeres: '',
      teletrabajadores: '',
      extranjeros: '',
      adolescentes: '',
      mujeres_embarazadas: '',
      adultos_mayores: '',
      ninos: '',
      mujeres_lactancia: '',
      numero_centros_abiertos: '',
      horario_trabajo: '',
      entrevistados: ''
    };
  });

  const [respuestas, setRespuestas] = useState(() => {
    if (anexoExistente) return anexoExistente.respuestas || {};
    return {};
  });

  const [estado, setEstado] = useState(anexoExistente?.estado || 'Borrador');
  const [filtroEstado, setFiltroEstado] = useState('all');
  const [filtroCategoria, setFiltroCategoria] = useState('all');
  const [busquedaItem, setBusquedaItem] = useState('');
  const [busquedaReferencia, setBusquedaReferencia] = useState('');
  const [seccionesExpandidas, setSeccionesExpandidas] = useState({});
  const [itemAccionesAbierto, setItemAccionesAbierto] = useState(null);
  const [showEvidenciaPanel, setShowEvidenciaPanel] = useState(false);
  const [itemEvidenciaSeleccionado, setItemEvidenciaSeleccionado] = useState(null);
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: 'success' });

  // Inicializar todas las secciones expandidas
  useEffect(() => {
    const expandidas = {};
    SECCIONES_SST.forEach(seccion => {
      expandidas[seccion.id] = true; // Expandir todas las secciones por defecto (datos y checklist)
    });
    setSeccionesExpandidas(expandidas);
  }, []);

  const toggleSeccion = (seccionId) => {
    setSeccionesExpandidas(prev => ({
      ...prev,
      [seccionId]: !prev[seccionId]
    }));
  };

  const handleChangeCampo = (campoId, valor) => {
    setDatosGenerales(prev => ({
      ...prev,
      [campoId]: valor
    }));
  };

  const handleChangeRespuesta = (itemId, nuevoValor) => {
    const estadoAnterior = respuestas[itemId]?.estado;
    const nuevoEstado = nuevoValor.estado;

    setRespuestas(prev => ({
      ...prev,
      [itemId]: nuevoValor
    }));

    // Si cambió de NO_CUMPLE a otro estado, no hacer nada
    // Si cambió a NO_CUMPLE, crear tarea automática
    if (nuevoEstado === 'NO_CUMPLE' && estadoAnterior !== 'NO_CUMPLE') {
      // Buscar el ítem para obtener su texto
      let itemTexto = '';
      SECCIONES_SST.forEach(seccion => {
        if (seccion.tipo === 'checklist' && seccion.items) {
          const item = seccion.items.find(i => i.id === itemId);
          if (item) {
            itemTexto = item.texto;
          }
        }
      });

      // Crear tarea automática
      const nuevaTarea = crearTareaDesdeItem(
        parseInt(empresaId),
        anexoId ? parseInt(anexoId) : null,
        itemId,
        itemTexto
      );
      tareas.push(nuevaTarea);
    }
  };

  // Filtrar ítems según los filtros
  const itemsFiltrados = useMemo(() => {
    let items = [];
    
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist' && seccion.items) {
        seccion.items.forEach(item => {
          const respuesta = respuestas[item.id];
          const estadoItem = respuesta?.estado;
          
          // Filtrar por estado
          if (filtroEstado !== 'all' && estadoItem !== filtroEstado) {
            return;
          }
          
          // Filtrar por categoría
          if (filtroCategoria !== 'all' && seccion.id !== filtroCategoria) {
            return;
          }
          
          // Filtrar por búsqueda (ítem, texto, referencia legal)
          if (busquedaItem.trim()) {
            const busqueda = busquedaItem.toLowerCase();
            const textoItem = item.texto.toLowerCase();
            const numeroItem = item.numero?.toLowerCase() || '';
            const referenciaLegal = item.referenciaLegal?.toLowerCase() || '';
            if (!textoItem.includes(busqueda) && 
                !numeroItem.includes(busqueda) && 
                !referenciaLegal.includes(busqueda)) {
              return;
            }
          }
          
          items.push({ ...item, seccionId: seccion.id, seccionTitulo: seccion.titulo });
        });
      }
    });
    
    return items;
  }, [filtroEstado, filtroCategoria, busquedaItem, respuestas]);

  const handleGuardar = (nuevoEstado = null) => {
    const estadoFinal = nuevoEstado || estado;
    const fechaActual = new Date().toISOString().split('T')[0];
    
    const anexoData = {
      id: anexoId ? parseInt(anexoId) : Date.now(),
      empresaId: parseInt(empresaId),
      fechaInspeccion: datosGenerales.fecha_inspeccion || fechaActual,
      fechaReinspeccion: datosGenerales.fecha_reinspeccion || null,
      fechaMaximaInfo: datosGenerales.fecha_maxima_info || null,
      estado: estadoFinal,
      datosGenerales,
      respuestas,
      documentosInSitu: anexoExistente?.documentosInSitu || [],
      creadoPor: 'admin',
      fechaCreacion: anexoExistente?.fechaCreacion || fechaActual,
      fechaActualizacion: fechaActual
    };

    if (anexoId) {
      const index = anexos1.findIndex(a => a.id === parseInt(anexoId));
      if (index !== -1) {
        anexos1[index] = anexoData;
      } else {
        anexos1.push(anexoData);
      }
    } else {
      anexos1.push(anexoData);
    }

    mostrarToast(`Anexo 1 ${estadoFinal === 'Publicado' ? 'publicado' : 'guardado'} exitosamente`, 'success');
    
    if (estadoFinal === 'Publicado') {
      setTimeout(() => {
        navigate(`/anexo1/gestion`);
      }, 1500);
    }
  };

  const handleImprimir = () => {
    window.print();
  };

  if (!empresa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500">Empresa no encontrada</p>
        </div>
      </div>
    );
  }

  // Función para mostrar toast
  const mostrarToast = (message, type = 'success') => {
    setShowToast({ visible: true, message, type });
    setTimeout(() => setShowToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  // Función para subir evidencia
  const handleSubirEvidencia = (itemId, file) => {
    if (!file) return;
    
    const nuevaEvidencia = {
      id: Date.now(),
      empresaId: parseInt(empresaId),
      anexo1Id: anexoId ? parseInt(anexoId) : null,
      itemId: itemId,
      nombre: file.name,
      archivo: URL.createObjectURL(file),
      tipo: file.type.startsWith('image/') ? 'imagen' : 'documento',
      estado: 'Pendiente',
      subidoPor: 'admin',
      aprobadoPor: null,
      fechaSubida: new Date().toISOString().split('T')[0],
      fechaAprobacion: null,
      observaciones: '',
      tamaño: file.size
    };
    evidencias.push(nuevaEvidencia);
    mostrarToast('Evidencia subida exitosamente', 'success');
    
    // Forzar re-render actualizando el estado
    setRespuestas(prev => ({ ...prev }));
  };

  return (
    <div className="relative">
      {/* Toast de notificación */}
      {showToast.visible && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          showToast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{showToast.message}</span>
        </div>
      )}

      {/* Panel lateral de evidencias */}
      {showEvidenciaPanel && itemEvidenciaSeleccionado && (
        <PanelEvidencias
          itemId={itemEvidenciaSeleccionado}
          anexoId={anexoId ? parseInt(anexoId) : null}
          empresaId={parseInt(empresaId)}
          onCerrar={() => {
            setShowEvidenciaPanel(false);
            setItemEvidenciaSeleccionado(null);
          }}
          onSubirEvidencia={handleSubirEvidencia}
        />
      )}

      <div className="space-y-6 no-print">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate('/anexo1/gestion')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a Gestión
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Editor Anexo 1 - SST</h1>
            <p className="text-gray-600 mt-1">{empresa.name}</p>
          </div>
          <div className="flex gap-3">
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="Borrador">Borrador</option>
              <option value="Publicado">Publicado</option>
            </select>
            <button
              onClick={() => handleGuardar()}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <SaveIcon className="w-5 h-5" />
              Guardar
            </button>
            <button
              onClick={() => handleGuardar('Publicado')}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Publicar
            </button>
            <button
              onClick={handleImprimir}
              className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <PrinterIcon className="w-5 h-5" />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda mejorado */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ítem, texto o referencia legal..."
              value={busquedaItem}
              onChange={(e) => setBusquedaItem(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="CUMPLE">Cumple</option>
            <option value="NO_CUMPLE">No Cumple</option>
            <option value="NA">No Aplica</option>
          </select>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {SECCIONES_SST.filter(s => s.tipo === 'checklist').map(seccion => (
              <option key={seccion.id} value={seccion.id}>{seccion.titulo}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setFiltroEstado('all');
              setFiltroCategoria('all');
              setBusquedaItem('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Sección de Datos Generales */}
      {SECCIONES_SST.filter(s => s.tipo === 'datos').map(seccion => (
        <SeccionDatos
          key={seccion.id}
          seccion={seccion}
          datosGenerales={datosGenerales}
          onChange={handleChangeCampo}
          isExpanded={seccionesExpandidas[seccion.id]}
          onToggle={() => toggleSeccion(seccion.id)}
        />
      ))}

      {/* Secciones de Checklist */}
      {SECCIONES_SST.filter(s => s.tipo === 'checklist').map(seccion => {
        const itemsSeccion = seccion.items.filter(item => {
          if (filtroEstado !== 'all') {
            const respuesta = respuestas[item.id];
            if (respuesta?.estado !== filtroEstado) return false;
          }
          if (filtroCategoria !== 'all' && seccion.id !== filtroCategoria) return false;
          if (busquedaItem.trim()) {
            const busqueda = busquedaItem.toLowerCase();
            const textoItem = item.texto.toLowerCase();
            const numeroItem = item.numero?.toLowerCase() || '';
            if (!textoItem.includes(busqueda) && !numeroItem.includes(busqueda)) return false;
          }
          return true;
        });

        return (
          <SeccionChecklist
            key={seccion.id}
            seccion={seccion}
            items={itemsSeccion}
            respuestas={respuestas}
            onChange={handleChangeRespuesta}
            isExpanded={seccionesExpandidas[seccion.id]}
            onToggle={() => toggleSeccion(seccion.id)}
            empresaId={parseInt(empresaId)}
            anexoId={anexoId ? parseInt(anexoId) : null}
            numeroTrabajadores={datosGenerales?.numero_total_trabajadores || datosGenerales?.trabajadores_centro}
            onAbrirPanelEvidencias={(itemId) => {
              setItemEvidenciaSeleccionado(itemId);
              setShowEvidenciaPanel(true);
            }}
            onGenerarTarea={(itemId, itemTexto) => {
              const nuevaTarea = crearTareaDesdeItem(parseInt(empresaId), anexoId ? parseInt(anexoId) : null, itemId, itemTexto);
              tareas.push(nuevaTarea);
              setShowToast({ visible: true, message: 'Tarea generada exitosamente', type: 'success' });
              setTimeout(() => setShowToast({ visible: false, message: '', type: 'success' }), 3000);
            }}
          />
        );
      })}
      </div>
    </div>
  );
};

// Componente Panel de Evidencias
function PanelEvidencias({ itemId, anexoId, empresaId, onCerrar, onSubirEvidencia }) {
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const evidenciasItem = getEvidenciasByItem(itemId, anexoId);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoSeleccionado(file);
    }
  };

  const handleSubir = () => {
    if (archivoSeleccionado) {
      onSubirEvidencia(itemId, archivoSeleccionado);
      setArchivoSeleccionado(null);
      // Resetear el input
      const input = document.getElementById('file-input-evidencias');
      if (input) input.value = '';
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Evidencias del Ítem</h2>
        <button
          onClick={onCerrar}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Formulario de subida */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar archivo
          </label>
          <input
            id="file-input-evidencias"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
          />
          {archivoSeleccionado && (
            <div className="mt-2 text-sm text-gray-600">
              <p>Archivo: {archivoSeleccionado.name}</p>
              <p>Tamaño: {(archivoSeleccionado.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
          <button
            onClick={handleSubir}
            disabled={!archivoSeleccionado}
            className="mt-3 w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Subir Evidencia
          </button>
        </div>

        {/* Lista de evidencias */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Evidencias subidas ({evidenciasItem.length})
          </h3>
          {evidenciasItem.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">
              No hay evidencias subidas para este ítem
            </p>
          ) : (
            <div className="space-y-2">
              {evidenciasItem.map((evidencia) => (
                <div
                  key={evidencia.id}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{evidencia.nombre}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {evidencia.fechaSubida} • {(evidencia.tamaño / 1024).toFixed(2)} KB
                      </p>
                      <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        evidencia.estado === 'Aprobado' ? 'bg-green-100 text-green-800' :
                        evidencia.estado === 'Rechazado' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {evidencia.estado}
                      </span>
                    </div>
                    <a
                      href={evidencia.archivo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-primary hover:text-primary-dark"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente para sección de datos
function SeccionDatos({ seccion, datosGenerales, onChange, isExpanded, onToggle }) {
  return (
    <section className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary via-primary-dark to-secondary text-white flex items-center justify-between hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <h2 className="text-[14px] font-bold uppercase tracking-wide">{seccion.titulo}</h2>
        </div>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
          {seccion.campos.length} campos
        </span>
      </button>

      {isExpanded && (
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-[10px] bg-gray-50 p-3 rounded-lg">
            {seccion.campos.map((campo) => (
              <div key={campo.id} className="flex flex-col gap-0.5 mb-1.5">
                <label className="text-[9px] font-semibold uppercase tracking-wide text-gray-600">
                  {campo.etiqueta}
                </label>
                <input
                  type="text"
                  value={datosGenerales[campo.id] || ""}
                  onChange={(e) => onChange(campo.id, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all bg-white hover:border-gray-400"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// Componente para fila del checklist
function FilaChecklist({ item, value, onChange, categoriaGeneral, isFirstRow, totalRows, empresaId, anexoId, numeroTrabajadores, onAbrirPanelEvidencias, onGenerarTarea }) {
  const [showAcciones, setShowAcciones] = useState(false);
  const evidenciasItem = getEvidenciasByItem(item.id, anexoId);
  const tareasItem = getTareasByItem(item.id);
  const documentosVinculados = getDocumentosByItem(item.id);

  // Detectar si el ítem debe ser NA automáticamente según número de trabajadores
  const debeSerNA = useMemo(() => {
    if (!numeroTrabajadores) return false;
    const numTrab = parseInt(numeroTrabajadores);
    if (isNaN(numTrab)) return false;
    // Ítems que requieren >10 trabajadores
    const itemsMasDe10 = ['ga2']; // Reglamento de Higiene (más de 10 trabajadores)
    if (itemsMasDe10.includes(item.id)) {
      return numTrab <= 10;
    }
    // Ítems que requieren 1-10 trabajadores
    const itemsMenosDe10 = ['ga1']; // Plan de Prevención (1 a 10 trabajadores)
    if (itemsMenosDe10.includes(item.id)) {
      return numTrab > 10;
    }
    return false;
  }, [item.id, numeroTrabajadores]);

  // Auto-marcar como NA si corresponde (solo una vez al montar o cuando cambia debeSerNA)
  useEffect(() => {
    if (debeSerNA && (!value || value.estado !== 'NA')) {
      onChange(item.id, { 
        estado: 'NA',
        observacion: value?.observacion || ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debeSerNA, item.id]); // Solo ejecutar cuando cambia debeSerNA o item.id
  const handleEstado = (estado) => {
    onChange(item.id, {
      ...value,
      estado,
    });
  };

  const handleObs = (e) => {
    onChange(item.id, {
      ...value,
      observacion: e.target.value,
    });
  };

  const formatearReferencias = (referencia) => {
    if (!referencia) return null;
    const lineas = referencia.split(/ - |\. /).filter(line => line.trim());
    return lineas.map((linea, idx) => {
      const texto = linea.trim();
      if (idx < lineas.length - 1 && !texto.endsWith('.')) {
        return texto + '.';
      }
      return texto;
    });
  };

  return (
    <tr className="align-top break-inside-avoid hover:bg-gray-50 transition-colors">
      <td className="border border-gray-300 p-2 text-[9px] leading-tight text-left align-top w-[12%] bg-blue-50">
        {item.referenciaLegal && (
          <div className="text-gray-700 italic">
            {formatearReferencias(item.referenciaLegal)?.map((linea, idx) => (
              <div key={idx} className="mb-1">{linea}</div>
            ))}
          </div>
        )}
      </td>
      {isFirstRow && categoriaGeneral && (
        <td
          rowSpan={totalRows}
          className="border border-gray-300 p-3 text-[10px] leading-tight text-center align-middle w-[12%] font-semibold bg-primary/10 text-primary-dark"
          style={{ verticalAlign: 'middle' }}
        >
          <div className="flex items-center justify-center h-full text-center">
            {categoriaGeneral}
          </div>
        </td>
      )}
      <td className="border border-gray-300 p-2 text-center align-middle w-[3%] bg-gray-50">
        <div className="font-bold text-[11px] text-primary">{item.numero || ""}</div>
      </td>
      <td className="border border-gray-300 p-3 text-[10px] leading-relaxed text-left align-top w-[30%] bg-white">
        <div className="font-medium text-gray-800">{item.texto}</div>
        {item.subLista && (
          <ul className="mt-2 ml-5 list-disc text-[9px] space-y-1 text-gray-600">
            {item.subLista.map((subItem, idx) => (
              <li key={idx}>{subItem}</li>
            ))}
          </ul>
        )}
        {/* Badges de evidencias y documentos vinculados */}
        <div className="flex flex-wrap gap-1 mt-2">
          {evidenciasItem.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] bg-blue-100 text-blue-800 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Evidencias ({evidenciasItem.length})
            </span>
          )}
          {documentosVinculados.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[8px] bg-purple-100 text-purple-800 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documentos ({documentosVinculados.length})
            </span>
          )}
        </div>
      </td>
      <td className="border border-gray-300 p-2 text-center align-middle w-[6%] bg-green-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "CUMPLE"}
          onChange={() => handleEstado("CUMPLE")}
          className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
        />
      </td>
      <td className="border border-gray-300 p-2 text-center align-middle w-[6%] bg-red-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "NO_CUMPLE"}
          onChange={() => handleEstado("NO_CUMPLE")}
          className="w-4 h-4 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
        />
      </td>
      <td className="border border-gray-300 p-2 text-center align-middle w-[6%] bg-yellow-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "NA"}
          onChange={() => handleEstado("NA")}
          className="w-4 h-4 text-yellow-600 focus:ring-2 focus:ring-yellow-500 cursor-pointer"
        />
      </td>
      <td className="border border-gray-300 p-2 align-top w-[20%] bg-white">
        <textarea
          value={value?.observacion || ""}
          onChange={handleObs}
          placeholder="Observaciones..."
          className="w-full h-16 text-[9px] border border-gray-300 rounded px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          rows={2}
        />
      </td>
      <td className="border border-gray-300 p-2 align-middle w-[3%] bg-white">
        <div className="relative">
          <button
            onClick={() => setShowAcciones(!showAcciones)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
            title="Acciones"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          {showAcciones && (
            <div className="absolute right-0 top-10 z-10 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[200px]">
              <div className="py-1">
                <button
                  onClick={() => {
                    if (onAbrirPanelEvidencias) {
                      onAbrirPanelEvidencias(item.id);
                    }
                    setShowAcciones(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  {evidenciasItem.length > 0 ? `Ver/Subir Evidencias (${evidenciasItem.length})` : 'Subir Evidencia'}
                </button>
                <button
                  onClick={() => {
                    if (onGenerarTarea) {
                      onGenerarTarea(item.id, item.texto);
                    }
                    setShowAcciones(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Generar Tarea
                </button>
                <button
                  onClick={() => {
                    // TODO: Implementar vinculación de documentos dinámicos
                    setShowAcciones(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Vincular Documento Dinámico
                </button>
                {tareasItem.length > 0 && (
                  <button
                    onClick={() => {
                      window.location.href = `/anexo1/tareas?empresa=${empresaId}&item=${item.id}`;
                      setShowAcciones(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ver Tareas ({tareasItem.length})
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

// Componente para sección de checklist
function SeccionChecklist({ seccion, items, respuestas, onChange, isExpanded, onToggle, empresaId, anexoId, numeroTrabajadores, onAbrirPanelEvidencias, onGenerarTarea }) {
  return (
    <section className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-gradient-to-r from-primary via-primary-dark to-secondary text-white flex items-center justify-between hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <h2 className="text-[14px] font-bold uppercase tracking-wide">{seccion.titulo}</h2>
          {seccion.subtituloNorma && (
            <span className="text-[10px] text-white/80 italic ml-2">{seccion.subtituloNorma}</span>
          )}
        </div>
        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
          {items.length} ítems
        </span>
      </button>

      {isExpanded && (
        <div className="p-6">
          <table className="w-full border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm text-[11px]">
            <thead>
              <tr className="bg-gradient-to-r from-primary via-primary-dark to-secondary text-white">
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[12%]"></th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[12%]"></th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[3%]">#</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[30%]">
                  {seccion.titulo}
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[6%] bg-green-600">
                  CUMPLE
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[6%] bg-red-600">
                  NO CUMPLE
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[6%] bg-yellow-600">
                  NO APLICA
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[20%]">
                  OBSERVACIONES
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[3%]">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <FilaChecklist
                  key={item.id}
                  item={item}
                  value={respuestas[item.id]}
                  onChange={onChange}
                  categoriaGeneral={seccion.categoriaGeneral}
                  isFirstRow={index === 0}
                  totalRows={items.length}
                  empresaId={empresaId}
                  anexoId={anexoId}
                  numeroTrabajadores={numeroTrabajadores}
                  onAbrirPanelEvidencias={onAbrirPanelEvidencias}
                  onGenerarTarea={onGenerarTarea}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default EditorAnexo1;


