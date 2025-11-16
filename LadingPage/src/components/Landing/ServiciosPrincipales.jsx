import { motion } from "framer-motion";

import { mainServices } from "@/data/landingContent";

const fadeInProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function ServiciosPrincipales() {
  return (
    <section id="servicios" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div className="text-center" {...fadeInProps}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-blue">
            Especialidades
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 lg:text-4xl">
            Nuestras Especialidades
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Soluciones integrales en medicina y seguridad ocupacional para proteger a
            tu equipo y cumplir con los más altos estándares de la industria.
          </p>
        </motion.div>
        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          {...fadeInProps}
          transition={{ delay: 0.1 }}
        >
          {mainServices.map((service) => (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-brand-light/60 p-6 shadow-md transition"
            >
              <div className="flex flex-1 flex-col gap-4">
                <h3 className="text-xl font-semibold text-brand-blue">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600">{service.description}</p>
                <div className="mt-auto rounded-2xl bg-white/80 p-4 text-sm text-slate-700 transition group-hover:bg-white">
                  <p className="font-semibold text-brand-blue">Objetivo</p>
                  <p>{service.objective}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


