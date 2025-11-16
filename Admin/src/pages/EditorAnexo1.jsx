import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialCompanies } from '../data/companiesData';
import { anexos1 } from '../data/anexo1Data';
import { SECCIONES_SST } from '../components/documentos/anexo1/anexo1';

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
  const [seccionesExpandidas, setSeccionesExpandidas] = useState({});

  // Inicializar todas las secciones expandidas
  useEffect(() => {
    const expandidas = {};
    SECCIONES_SST.forEach(seccion => {
      if (seccion.tipo === 'checklist') {
        expandidas[seccion.id] = true;
      }
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
    setRespuestas(prev => ({
      ...prev,
      [itemId]: nuevoValor
    }));
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
          
          // Filtrar por búsqueda
          if (busquedaItem.trim()) {
            const busqueda = busquedaItem.toLowerCase();
            const textoItem = item.texto.toLowerCase();
            const numeroItem = item.numero?.toLowerCase() || '';
            if (!textoItem.includes(busqueda) && !numeroItem.includes(busqueda)) {
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

    alert(`Anexo 1 ${estadoFinal === 'Publicado' ? 'publicado' : 'guardado'} exitosamente`);
    
    if (estadoFinal === 'Publicado') {
      navigate(`/anexo1/gestion`);
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

  return (
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

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ítem o número..."
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
          />
        );
      })}
    </div>
  );
};

// Componente para sección de datos
function SeccionDatos({ seccion, datosGenerales, onChange }) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="mb-4 pb-3 border-b-2 border-primary">
        <h2 className="text-[14px] font-bold uppercase text-center mb-2 text-primary-dark tracking-wide">
          {seccion.titulo}
        </h2>
      </div>
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
    </section>
  );
}

// Componente para sección de checklist
function SeccionChecklist({ seccion, items, respuestas, onChange, isExpanded, onToggle }) {
  const FilaChecklist = ({ item, value, onChange, categoriaGeneral, isFirstRow, totalRows }) => {
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
        <td className="border border-gray-300 p-2 text-[9px] leading-tight text-left align-top w-[15%] bg-blue-50">
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
            className="border border-gray-300 p-3 text-[10px] leading-tight text-center align-middle w-[15%] font-semibold bg-primary/10 text-primary-dark"
            style={{ verticalAlign: 'middle' }}
          >
            <div className="flex items-center justify-center h-full text-center">
              {categoriaGeneral}
            </div>
          </td>
        )}
        <td className="border border-gray-300 p-2 text-center align-middle w-[5%] bg-gray-50">
          <div className="font-bold text-[12px] text-primary">{item.numero || ""}</div>
        </td>
        <td className="border border-gray-300 p-3 text-[10px] leading-relaxed text-left align-top w-[35%] bg-white">
          <div className="font-medium text-gray-800">{item.texto}</div>
          {item.subLista && (
            <ul className="mt-2 ml-5 list-disc text-[9px] space-y-1 text-gray-600">
              {item.subLista.map((subItem, idx) => (
                <li key={idx}>{subItem}</li>
              ))}
            </ul>
          )}
        </td>
        <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-green-50">
          <input
            type="radio"
            name={item.id}
            checked={value?.estado === "CUMPLE"}
            onChange={() => handleEstado("CUMPLE")}
            className="w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
          />
        </td>
        <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-red-50">
          <input
            type="radio"
            name={item.id}
            checked={value?.estado === "NO_CUMPLE"}
            onChange={() => handleEstado("NO_CUMPLE")}
            className="w-5 h-5 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
          />
        </td>
        <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-yellow-50">
          <input
            type="radio"
            name={item.id}
            checked={value?.estado === "NA"}
            onChange={() => handleEstado("NA")}
            className="w-5 h-5 text-yellow-600 focus:ring-2 focus:ring-yellow-500 cursor-pointer"
          />
        </td>
        <td className="border border-gray-300 p-2 align-top w-[10%] bg-white">
          <textarea
            value={value?.observacion || ""}
            onChange={handleObs}
            placeholder="Observaciones..."
            className="w-full h-16 text-[9px] border border-gray-300 rounded px-2 py-1 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            rows={2}
          />
        </td>
      </tr>
    );
  };

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
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[15%]"></th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[15%]"></th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[5%]">#</th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[35%]">
                  {seccion.titulo}
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[10%] bg-green-600">
                  CUMPLE
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[10%] bg-red-600">
                  NO CUMPLE
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[10%] bg-yellow-600">
                  NO APLICA
                </th>
                <th className="border border-gray-300 p-2 text-[10px] font-bold w-[10%]">
                  OBSERVACIONES
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


