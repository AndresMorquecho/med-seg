import React, { useState } from "react";

/**
 * SECCIONES_SST:
 * - "datos" => campos de texto (DATOS GENERALES)
 * - "checklist" => tabla con CUMPLE / NO CUMPLE / NO APLICA + Observaciones
 *
 * Ya te dejo armadas:
 * - DATOS GENERALES
 * - GESTIÓN ADMINISTRATIVA (varios ítems)
 * - GESTIÓN TÉCNICA (varios ítems)
 *
 * El resto de secciones / ítems los puedes seguir agregando
 * siguiendo exactamente el mismo formato.
 */

export const SECCIONES_SST = [
  {
    id: "datos-generales",
    titulo: "DATOS GENERALES DE LA EMPRESA",
    tipo: "datos",
    campos: [
      { id: "inspeccion", etiqueta: "Inspección" },
      { id: "fecha_inspeccion", etiqueta: "Fecha inspección" },
      { id: "reinspeccion", etiqueta: "Re inspección" },
      { id: "fecha_reinspeccion", etiqueta: "Fecha re inspección" },
      {
        id: "fecha_maxima_info",
        etiqueta: "Fecha máxima para remitir información",
      },
      { id: "tipo_empresa", etiqueta: "Tipo de empresa (pública / privada)" },
      { id: "empleador", etiqueta: "Empleador" },
      { id: "telefono", etiqueta: "Número de teléfono" },
      { id: "razon_social", etiqueta: "Razón social" },
      { id: "ruc", etiqueta: "RUC" },
      { id: "correo", etiqueta: "Correo electrónico" },
      { id: "actividad_economica", etiqueta: "Actividad económica" },
      {
        id: "tipo_centro_trabajo",
        etiqueta: "Tipo de centro de trabajo (Matriz / Sucursal)",
      },
      {
        id: "direccion_centro",
        etiqueta: "Dirección del centro de trabajo de la empresa inspeccionada",
      },
      {
        id: "numero_total_trabajadores",
        etiqueta: "Número total de trabajadores / servidores",
      },
      {
        id: "consolidado_iess",
        etiqueta: "Consolidado de planilla del IESS (SI/NO)",
      },
      {
        id: "trabajadores_centro",
        etiqueta: "Número de trabajadores / servidores del centro de trabajo",
      },
      { id: "hombres", etiqueta: "Hombres" },
      { id: "mujeres", etiqueta: "Mujeres" },
      { id: "teletrabajadores", etiqueta: "Teletrabajadores" },
      { id: "extranjeros", etiqueta: "Extranjeros" },
      { id: "adolescentes", etiqueta: "Adolescentes" },
      { id: "mujeres_embarazadas", etiqueta: "Mujeres embarazadas" },
      { id: "adultos_mayores", etiqueta: "Adultos mayores" },
      { id: "ninos", etiqueta: "Niños" },
      { id: "mujeres_lactancia", etiqueta: "Mujeres en lactancia" },
      {
        id: "numero_centros_abiertos",
        etiqueta: "Número de centros de trabajo abiertos",
      },
      { id: "horario_trabajo", etiqueta: "Horario de trabajo" },
      {
        id: "entrevistados",
        etiqueta: "Nombre de los entrevistados en la inspección o re inspección",
      },
    ],
  },

  // ===================== GESTIÓN ADMINISTRATIVA =====================
  {
    id: "gestion-administrativa",
    titulo: "GESTIÓN ADMINISTRATIVA",
    subtituloNorma:
      "Acuerdo Ministerial 196 (2024) Art. 4 y Art.18. - Decisión 584 (2004) Art. 11.",
    tipo: "checklist",
    categoriaGeneral: "Organización de seguridad y salud en el trabajo",
    items: [
      {
        id: "ga1",
        numero: "1",
        texto:
          "¿Cuenta con un Plan de Prevención de Riesgos Laborales (1 a 10 trabajadores) aprobado y registrado en el SUT?",
        referenciaLegal:
          "Acuerdo Ministerial 196 (2024) Art. 4 y Art.18.Decisión 584 (2004) Art. 11",
      },
      {
        id: "ga2",
        numero: "2",
        texto:
          "¿Cuenta con un Reglamento de Higiene y seguridad (más de 10 trabajadores) aprobado y registrado en el SUT?",
        referenciaLegal: "Código del Trabajo (2005) Art. 434. Acuerdo Ministerial 196 (2024) Art. 4, 19,"
      },
      {
        id: "ga3",
        numero: "3",
        texto:
          "¿Se ha socializado a todos los trabajadores la Política de seguridad y salud en el trabajo?",
        referenciaLegal:
          "Decisión 584 (2004) Art. 11",
      },
      {
        id: "ga4",
        numero: "4",
        texto:
          "¿Cuenta con el registro del Monitor de Seguridad e Higiene del Trabajo en la Plataforma SUT?",
        referenciaLegal:
          "Decreto Ejecutivo 255 (2024) Art. 20. - Acuerdo Ministerial 196 (2024) Art. 18 y 19.",
      },
      {
        id: "ga5",
        numero: "5",
        texto:
          "¿Cuenta con el registro del Técnico de Seguridad e Higiene del Trabajo en la Plataforma SUT?",
        referenciaLegal:
          "Decreto Ejecutivo 255 (2024) Art. 25. - Acuerdo Ministerial 196 (2024) Art. 14.",
      },
      {
        id: "ga6",
        numero: "6",
        texto:
          "¿Cuenta con el registro del Servicio Externo de Seguridad e Higiene del Trabajo en la Plataforma SUT?",
        referenciaLegal: "Acuerdo Ministerial 196 (2024) Art. 13.",
      },
      {
        id: "ga7",
        numero: "7",
        texto:
          "¿Cuenta con el informe de actividades realizadas por técnico o servicio externo de seguridad e higiene del trabajo?",
        referenciaLegal: "Decreto Ejecutivo 255 (2024) Art. 21.",
        subLista: [
          "El informe debe contener como mínimo:",
          "Objetivo",
          "Estadísticas básicas (accidentes de trabajo, incidentes y/o presunción de enfermedades profesionales registradas)",
          "Principales actividades ejecutadas con detalle de las horas de gestión asignadas a cada actividad.",
          "Conclusiones",
          "Registro fotográfico",
          "Firmas de Responsabilidad"
        ]
      },
      {
        id: "ga8",
        numero: "8",
        texto:
          "¿Cuenta con el registro del profesional médico en la Plataforma SUT?",
        referenciaLegal:
          "Decreto Ejecutivo 255 (2024) Art. 33. - Acuerdo Ministerial 196 (2024) Art. 18 y 19.",
      },
      {
        id: "ga9",
        numero: "9",
        texto:
          "¿Cuenta con el registro del Delegado de Seguridad y Salud en la plataforma SUT?",
        referenciaLegal:
          "Decreto Ejecutivo 255 (2024) Art. 32. - Acuerdo Ministerial 196 (2024) Art. 18 y 19.",
      },
      {
        id: "ga10",
        numero: "10",
        texto:
          "¿Cuenta con el registro del Comité de Seguridad y Salud en la plataforma SUT?",
        referenciaLegal:
          "Resolución 957 (2008) Art. 10, 13, 14. - Decreto Ejecutivo 255 (2024) Art. 36, 38.",
      },
      {
        id: "ga11",
        numero: "11",
        texto:
          "¿Cuenta con informe de la gestión realizada por los miembros del Organismo Paritario? El informe debe contener como mínimo: Objetivo, cronograma de actividades conforme Art. 39 del Decreto Ejecutivo Nro. 255, conclusiones, registro fotográfico y firmas de responsabilidad.",
        referenciaLegal: "Acuerdo Ministerial 196 (2024) Art. 4.",
      },
      {
        id: "ga12",
        numero: "12",
        texto:
          "¿Se evidencia por escrito los procedimientos generales que establecen el deber de colaboración en la implementación de las medidas de seguridad y salud en el trabajo para empleadores que realizan actividades simultáneas en un mismo lugar y/o centro de trabajo? (contratistas, subcontratistas, etc.).",
        referenciaLegal: "",
      },
    ],
  },

  // ===================== GESTIÓN TÉCNICA =====================
  {
    id: "gestion-tecnica",
    titulo: "GESTIÓN TÉCNICA",
    subtituloNorma:
      "Decisión 584 (2004) Art. 11. - Código del Trabajo Art. 42. - Decreto Ejecutivo 255 (2024) Art. 28.",
    tipo: "checklist",
    categoriaGeneral: "Identificación y evaluación de peligros y riesgos",
    items: [
      {
        id: "gt1",
        numero: "1",
        texto:
          "¿Cuenta con un diagrama de flujo de todos los procesos productivos y/o de servicios?",
        referenciaLegal: "Decisión 584 (2004) Art. 11.",
      },
      {
        id: "gt2",
        numero: "2",
        texto:
          "¿Se dispone de un descriptivo por puesto de trabajo? Debe incluir número de trabajadores, actividades realizadas, horas diarias por actividad y recursos utilizados (máquinas, equipos, herramientas, agentes químicos, biológicos, etc.).",
        referenciaLegal: "Decisión 584 (2004) Art. 11.",
      },
      {
        id: "gt3",
        numero: "3",
        texto:
          "¿Cuenta con un mapa de riesgos del lugar y/o centro de trabajo, con señalización de seguridad, EPP y dispositivos de parada de emergencia?",
        referenciaLegal:
          "Decisión 584 (2004) Art. 11. - Resolución 957 (2008) Art. 1. - Decreto Ejecutivo 255 (2024) Art. 27, 28, 47.",
      },
      {
        id: "gt4",
        numero: "4",
        texto:
          "¿Cuenta con una matriz de identificación de peligros y evaluación de riesgos laborales por puesto de trabajo en la que se ha aplicado una metodología reconocida y validada?",
        referenciaLegal:
          "Decisión 584 (2004) Art. 11, 12, 18. - Resolución 957 (2008) Art. 1. - Decreto Ejecutivo 255 (2024) Art. 48.",
      },
      {
        id: "gt5",
        numero: "5",
        texto:
          "¿Cuenta con un informe de medición de los agentes físicos, químicos y/o biológicos del puesto de trabajo? Debe incluir fecha, puesto, número de expuestos, metodología, resultados, comparación con norma técnica, certificados de calibración, registro fotográfico y firmas de responsabilidad.",
        referenciaLegal:
          "Decisión 584 (2004) Art. 11, 12, 18. - Resolución 957 (2008) Art. 1. - Decreto Ejecutivo 255 (2024) Art. 44, 45 y 46.",
      },
      {
        id: "gt6",
        numero: "6",
        texto:
          "¿Cuenta con un informe de evaluación de riesgos de seguridad, ergonómicos y psicosociales de los puestos de trabajo, con metodología reconocida, resultados y comparación con estándares técnicos?",
        referenciaLegal:
          "Decisión 584 (2004) Art. 11. - Resolución 957 (2008) Art. 1. - Código del Trabajo Art. 412. - Decreto Ejecutivo 255 (2024) Art. 49.",
      },
      {
        id: "gt7",
        numero: "7",
        texto:
          "¿Cuenta con un informe de las medidas de prevención y protección implementadas por puesto de trabajo, con fechas, cronograma, jerarquía de controles, resultados y seguimiento?",
        referenciaLegal: "Resolución 957 (2008) Art. 1.",
      },
      {
        id: "gt8",
        numero: "8",
        texto:
          "¿Cuenta con el cálculo del riesgo residual en la matriz de identificación de peligros y evaluación de riesgos laborales?",
        referenciaLegal: "Decisión 584 (2004) Art. 11.",
      },
      {
        id: "gt9",
        numero: "9",
        texto:
          "¿Se ha verificado in situ la implementación de medidas de prevención y protección conforme el informe de medidas implementadas por puesto de trabajo?",
        referenciaLegal: "Acuerdo Ministerial 196 (2024) Anexo 3.",
      },
      // 👉 A partir de aquí puedes seguir agregando TODOS los demás ítems
      // (Condiciones de Trabajo, Señalización, Gestión del talento humano, etc.)
      // usando el mismo formato: { id, numero, texto, referenciaLegal }
    ],
  },
];

/* ==== COMPONENTES DE APOYO ==== */

function CampoTexto({ campoId, etiqueta, value, onChange }) {
  return (
    <div className="flex flex-col gap-0.5 mb-1.5">
      <label
        htmlFor={campoId}
        className="text-[9px] font-semibold uppercase tracking-wide text-gray-600"
      >
        {etiqueta}
      </label>
      <input
        id={campoId}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(campoId, e.target.value)}
        className="border border-gray-300 rounded px-2 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all bg-white hover:border-gray-400"
      />
    </div>
  );
}

function FilaChecklist({ item, value, onChange, isFirstRow, totalRows, categoriaGeneral }) {
  const handleEstado = (estado) => {
    onChange(item.id, {
      ...value,
      estado,
    });
  };

  // Formatear referencias legales en múltiples líneas
  const formatearReferencias = (referencia) => {
    if (!referencia) return null;
    // Separar por " - " o ". " para crear líneas
    const lineas = referencia.split(/ - |\. /).filter(line => line.trim());
    return lineas.map((linea, idx) => {
      const texto = linea.trim();
      // Agregar punto si no termina con uno y no es la última línea
      if (idx < lineas.length - 1 && !texto.endsWith('.')) {
        return texto + '.';
      }
      return texto;
    });
  };

  return (
    <tr className="align-top break-inside-avoid">
      {/* Columna 1: Referencia Legal (izquierda) */}
      <td className="border border-gray-300 p-2 text-[9px] leading-tight text-left align-top w-[15%] bg-blue-50">
        {item.referenciaLegal && (
          <div className="text-gray-700 italic">
            {formatearReferencias(item.referenciaLegal)?.map((linea, idx) => (
              <div key={idx} className="mb-1">
                {linea}
              </div>
            ))}
          </div>
        )}
      </td>
      {/* Columna 2: Categoría General (combinada con rowspan) */}
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
      {/* Columna 3: Número */}
      <td className="border border-gray-300 p-2 text-center align-middle w-[5%] bg-gray-50">
        <div className="font-bold text-[12px] text-primary">
          {item.numero || ""}
        </div>
      </td>
      {/* Columna 4: Pregunta/Ítem */}
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
      {/* Columna 5: CUMPLE */}
      <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-green-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "CUMPLE"}
          onChange={() => handleEstado("CUMPLE")}
          className="w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
        />
      </td>
      {/* Columna 6: NO CUMPLE */}
      <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-red-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "NO_CUMPLE"}
          onChange={() => handleEstado("NO_CUMPLE")}
          className="w-5 h-5 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
        />
      </td>
      {/* Columna 7: NO APLICA */}
      <td className="border border-gray-300 p-2 text-center align-middle w-[10%] bg-yellow-50">
        <input
          type="radio"
          name={item.id}
          checked={value?.estado === "NA"}
          onChange={() => handleEstado("NA")}
          className="w-5 h-5 text-yellow-600 focus:ring-2 focus:ring-yellow-500 cursor-pointer"
        />
      </td>
    </tr>
  );
}

function SeccionSST({
  seccion,
  datosGenerales,
  setDatosGenerales,
  respuestas,
  setRespuestas,
}) {
  const isDatos = seccion.tipo === "datos";

  const handleChangeCampo = (campoId, val) => {
    setDatosGenerales((prev) => ({
      ...prev,
      [campoId]: val,
    }));
  };

  const handleChangeItem = (itemId, nuevoValor) => {
    setRespuestas((prev) => ({
      ...prev,
      [itemId]: nuevoValor,
    }));
  };

  return (
    <section
      className="mb-8 pb-6 break-inside-avoid bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="mb-4 pb-3 border-b-2 border-primary">
        <h2 className="text-[14px] font-bold uppercase text-center mb-2 text-primary-dark tracking-wide">
          {seccion.titulo}
        </h2>
        {seccion.subtituloNorma && (
          <p className="text-[10px] text-center text-gray-600 italic">
            {seccion.subtituloNorma}
          </p>
        )}
      </div>

      {isDatos ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-[10px] bg-gray-50 p-3 rounded-lg">
          {seccion.campos.map((campo) => (
            <CampoTexto
              key={campo.id}
              campoId={campo.id}
              etiqueta={campo.etiqueta}
              value={datosGenerales[campo.id]}
              onChange={handleChangeCampo}
            />
          ))}
        </div>
      ) : (
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
            </tr>
          </thead>
          <tbody>
            {seccion.items.map((item, index) => (
              <FilaChecklist
                key={item.id}
                item={item}
                value={respuestas[item.id]}
                onChange={handleChangeItem}
                isFirstRow={index === 0}
                totalRows={seccion.items.length}
                categoriaGeneral={seccion.categoriaGeneral}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

/**
 * Componente principal del documento
 */
export default function ListaVerificacionSST() {
  const [datosGenerales, setDatosGenerales] = useState({});
  const [respuestas, setRespuestas] = useState({});

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-white text-gray-900 p-8 text-[11px] leading-tight rounded-2xl shadow-2xl">
      {/* Encabezado */}
      <header className="mb-6 pb-4 border-b-4 border-primary bg-gradient-to-r from-primary via-primary-dark to-secondary text-white rounded-t-xl p-6 -m-8 mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-[16px] font-bold text-center uppercase tracking-wide">
            ANEXO 1 - LISTA DE VERIFICACIÓN DE CUMPLIMIENTO DE OBLIGACIONES DE
            SEGURIDAD Y SALUD EN EL TRABAJO
          </h1>
        </div>
        <p className="text-[11px] text-center mt-2 text-white/90 bg-white/10 rounded-lg px-4 py-2 inline-block">
          MDT-(SIGLAS DE LA DIRECCIÓN REGIONAL)-(INICIALES)-(AÑO)-(NÚMERO DE
          INSPECCIÓN)
        </p>
      </header>

      {/* Secciones */}
      {SECCIONES_SST.map((seccion) => (
        <SeccionSST
          key={seccion.id}
          seccion={seccion}
          datosGenerales={datosGenerales}
          setDatosGenerales={setDatosGenerales}
          respuestas={respuestas}
          setRespuestas={setRespuestas}
        />
      ))}

      {/* Observaciones finales y firmas */}
      <section
        className="mt-8 pt-6 border-t-2 border-gray-300 break-inside-avoid bg-white rounded-xl shadow-lg p-6"
        style={{ pageBreakInside: "avoid" }}
      >
        <div className="mb-4 pb-3 border-b-2 border-primary">
          <h3 className="text-[13px] font-bold uppercase text-primary-dark mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            OBSERVACIONES DE LA INSPECCIÓN
          </h3>
        </div>
        <textarea
          className="w-full h-32 border-2 border-gray-300 rounded-lg text-[11px] p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-gray-50"
          placeholder="Escriba aquí las observaciones generales de la inspección..."
        />

        <div className="grid grid-cols-2 gap-8 mt-10 text-[11px]">
          <div className="text-center bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="font-bold mb-2 text-primary-dark text-[12px]">MINISTERIO DEL TRABAJO</div>
            <div className="border-t-2 border-gray-400 w-3/4 mx-auto mt-10 mb-2" />
            <div className="text-gray-600 font-medium">NOMBRE Y FIRMA</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-6 border-2 border-green-200">
            <div className="font-bold mb-2 text-primary-dark text-[12px]">EMPRESA / INSTITUCIÓN</div>
            <div className="border-t-2 border-gray-400 w-3/4 mx-auto mt-10 mb-2" />
            <div className="text-gray-600 font-medium">NOMBRE Y FIRMA DE QUIÉN RECIBE EL ACTA</div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-primary text-[9px] leading-relaxed">
          <p className="font-bold mb-2 text-primary-dark text-[10px] uppercase flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            CÓDIGO DE TRABAJO
          </p>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Art. 42.-</span> Obligaciones del empleador.- Numeral 17. Facilitar la inspección y vigilancia que las autoridades practiquen en los locales de trabajo, para cerciorarse del cumplimiento de las disposiciones de este Código y darles los informes que para ese efecto sean indispensables. Numeral 32. Las empresas empleadoras registradas en el Instituto Ecuatoriano de Seguridad Social están obligadas a exhibir, en lugar visible y al alcance de todos sus trabajadores/servidores, las planillas mensuales de remisión de aportes individuales y patronales y de descuentos, y las correspondientes al pago de fondo de reserva, debidamente selladas por el respectivo Departamento del Instituto Ecuatoriano de Seguridad Social.
            </p>
            <p>
              <span className="font-semibold">Art. 412.-</span> El Departamento de Seguridad e Higiene del Trabajo y los Inspectores del Trabajo exigirán a los propietarios de talleres o fábricas y de los demás medios de trabajo, el cumplimiento de las obligaciones en materia de prevención de riesgos;
            </p>
            <p>
              <span className="font-semibold">Art. 542.-</span> Atribuciones de las Direcciones Regionales del trabajo.- Además de lo expresado en los Artículos anteriores, a las Direcciones Regionales del Trabajo, les corresponde. Numeral 5. Visitar fábricas, talleres, establecimientos, construcciones de locales destinados al trabajo y a viviendas de trabajadores/servidores, siempre que lo estimaren conveniente o cuando las empresas o trabajadores/servidores lo soliciten.
            </p>
            <p>
              <span className="font-semibold">Art. 436.-</span> Suspensión de labores y cierre de locales. El Ministerio de Trabajo y Empleo podrá disponer la suspensión de actividades o el cierre de los lugares o medios colectivos de labor, en los que se atentare o afectare a la salud y seguridad e higiene de los trabajadores/servidores, o se contraviniere a las medidas de seguridad e higiene dictadas, sin perjuicio de las demás sanciones legales. Tal decisión requerirá dictamen previo del Jefe del Departamento de Seguridad e Higiene del Trabajo.
            </p>
            <p>
              <span className="font-semibold">Art. 628.-</span> Caso de violación de las normas del Código del Trabajo. Las violaciones de las normas de este Código, serán sancionadas en la forma prescrita en los Artículos pertinentes y, cuando no se haya fijado sanción especial, el Director Regional del Trabajo podrá imponer multas de hasta doscientos dólares de los Estados Unidos de América, sin perjuicio de lo establecido en Artículo 95 del Código de la Niñez y Adolescencia
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
