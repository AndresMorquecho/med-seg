import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const videoSrc = "/videos/Video.mp4";

export function HeroSection() {
  const handleScrollToServices = () => {
    const servicesSection = document.querySelector("#servicios");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-900"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square h-full w-full max-h-[90vh] max-w-[90vh] md:aspect-auto md:h-full md:w-full md:max-h-none md:max-w-none">
          <video
            className="h-full w-full object-contain md:object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-brand-blue/65 to-brand-teal/40" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white"
      >
        <motion.p
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-sm font-medium"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          MEDI&SEG CIA LTDA
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          Tu salud y seguridad laboral son nuestra prioridad.
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-slate-100 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }}
        >
          Evaluaciones médicas, seguridad industrial y programas de prevención en un
          solo lugar.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <Button size="lg" onClick={handleScrollToServices}>
            Conoce nuestros servicios
          </Button>
          <button
            onClick={handleScrollToServices}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            Desplázate para explorar
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}


