import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { detailedServices } from "@/data/landingContent";

const fadeInProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export function ServiciosDetalle() {
  return (
    <section className="bg-brand-light/50 py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div className="text-center" {...fadeInProps}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-blue">
            Servicios detallados
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 lg:text-4xl">
            Soluciones a la medida de tu organización
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Programas integrales orientados a proteger la salud de tu talento humano y
            garantizar el cumplimiento normativo de tu empresa.
          </p>
        </motion.div>

        <motion.div className="mt-12" {...fadeInProps} transition={{ delay: 0.1 }}>
          <Accordion type="single" collapsible className="space-y-4">
            {detailedServices.map((service) => (
              <AccordionItem key={service.name} value={service.name}>
                <AccordionTrigger>{service.name}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base leading-relaxed">{service.description}</p>
                  <div className="mt-4 rounded-2xl bg-brand-blue/5 p-4">
                    <p className="text-sm font-semibold text-brand-blue">Objetivo</p>
                    <p className="text-sm text-slate-700">{service.objective}</p>
                  </div>
                  <div className="mt-5 space-y-3">
                    <p className="text-sm font-semibold text-slate-700">Beneficios</p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-blue" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}


