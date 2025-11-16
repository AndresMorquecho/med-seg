import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const listItems = [
  "Evaluaciones audiométricas de ingreso, periódicas y de retiro.",
  "Monitoreo de pérdida auditiva inducida por ruido laboral (PAIR).",
  "Programas de conservación auditiva y capacitaciones en prevención.",
  "Asesoramiento técnico a empresas en programas de vigilancia de salud auditiva.",
];

const fadeInProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function Experiencia() {
  return (
    <section id="experiencia" className="bg-white py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:px-8">
        <motion.div className="flex-1 space-y-6" {...fadeInProps}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-blue">
            Trayectoria
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 lg:text-4xl">
            Nuestra Experiencia
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            MEDI&SEG cuenta con un equipo médico y técnico especializado en
            audiometrías ocupacionales, respaldado por una sólida trayectoria en
            salud laboral y atención médica general.
          </p>
        </motion.div>
        <motion.div className="flex-1 space-y-4" {...fadeInProps} transition={{ delay: 0.1 }}>
          {listItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-brand-blue/10 bg-brand-light/50 p-4"
            >
              <span className="mt-1">
                <CheckCircle className="h-6 w-6 text-brand-blue" />
              </span>
              <p className="text-base leading-relaxed text-slate-700">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


