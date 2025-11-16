import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { values } from "@/data/landingContent";

const fadeInProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function MisionVisionValores() {
  return (
    <section id="nosotros" className="bg-brand-light/60 py-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch lg:px-8">
        <motion.div className="grid gap-6 lg:grid-rows-2" {...fadeInProps}>
          <Card className="flex h-full flex-col overflow-hidden bg-white/95 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-brand-blue">Misión</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-base leading-relaxed text-slate-700">
              Realizar evaluaciones audiométricas precisas y confiables que permitan
              prevenir, detectar y controlar oportunamente alteraciones auditivas
              preexistentes y derivadas del entorno laboral. En MEDI&SEG, trabajamos
              para proteger la salud auditiva de los trabajadores, cumpliendo con los
              más altos estándares de calidad, ética y seguridad.
            </CardContent>
          </Card>

          <Card className="flex h-full flex-col overflow-hidden bg-white/95 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-brand-blue">Visión</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 text-base leading-relaxed text-slate-700">
              Ser una empresa líder y referente nacional en servicios de audiometría
              ocupacional, reconocida por su tecnología avanzada, personal altamente
              capacitado y compromiso con la prevención auditiva.
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="flex flex-col rounded-3xl border border-white/60 bg-white p-8 shadow-xl"
          {...fadeInProps}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <CardHeader className="p-0">
            <CardTitle className="text-2xl text-brand-blue">Valores</CardTitle>
            <CardDescription className="text-base text-slate-600">
              Principios que guían cada una de nuestras acciones para proteger la salud
              y bienestar de las empresas y sus colaboradores.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2">
            {values.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col gap-2 rounded-2xl bg-brand-light/60 p-5 text-slate-700 transition hover:bg-brand-blue/10"
              >
                <span className="text-3xl">{item.icon}</span>
                <p className="text-base font-semibold text-brand-blue">{item.title}</p>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </motion.div>
      </div>
    </section>
  );
}


