import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fadeInProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const socials = [
  { icon: Instagram, label: "Instagram @mediseg2", href: "https://instagram.com/mediseg2" },
  { icon: Facebook, label: "Facebook MEDI&SEG", href: "https://www.facebook.com/MEDISEG" },
  { icon: Clapperboard, label: "TikTok @mediyseg", href: "https://www.tiktok.com/@mediyseg" },
];

const contactDetails = [
  {
    title: "MEDI&SEG Piñas (Trabajo Social)",
    phones: ["098 731 2800"],
  },
  {
    title: "MEDI&SEG Radiografías",
    phones: ["099 511 8247"],
  },
  {
    title: "MEDI&SEG Sucursal Pache",
    phones: ["098 743 2002"],
  },
  {
    title: "Dr. Rolando Maldonado",
    phones: ["099 591 5869", "098 154 5692"],
  },
  {
    title: "Ing. Mikaela Granda",
    phones: ["099 463 2986"],
  },
];

export function Contacto() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.table(Object.fromEntries(formData.entries()));
    event.target.reset();
    alert("¡Gracias por escribirnos! Te contactaremos muy pronto.");
  };

  return (
    <section id="contacto" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div className="text-center" {...fadeInProps}>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-blue">
            Contáctanos
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 lg:text-4xl">
            Tu salud y bienestar, nuestra prioridad.
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-lg text-slate-600">
            Cuidamos de ti y tu familia, en el trabajo y en casa. Escríbenos y recibe
            asesoría personalizada de nuestros especialistas.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-10 rounded-3xl border border-slate-100 bg-brand-light/60 p-8 shadow-xl lg:grid-cols-2 lg:items-stretch"
          {...fadeInProps}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold text-brand-blue">
                Datos de contacto
              </h3>
              <div className="mt-6 space-y-4 text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Dirección</p>
                    <p className="text-sm">
                      Av. de los Empresarios 120, Edificio Salud Integral, Quito - Ecuador.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Teléfono</p>
                    <p className="text-sm">+593 2 456 7890</p>
                    <p className="text-sm">+593 99 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-brand-blue" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Correo</p>
                    <p className="text-sm">contacto@mediseg.com.ec</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-white p-6 shadow-md">
              <h3 className="text-base font-semibold text-slate-700">
                Sucursales y contactos directos
              </h3>
              <div className="mt-4 grid gap-4 text-sm text-slate-700 md:grid-cols-2">
                {contactDetails.map((contact) => (
                  <div key={contact.title}>
                    <p className="font-semibold text-brand-blue">{contact.title}</p>
                    <ul className="mt-1 space-y-1 text-sm text-slate-600">
                      {contact.phones.map((phone) => (
                        <li key={phone} className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-brand-teal" />
                          <span>{phone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <h3 className="text-base font-semibold text-slate-700">
                Síguenos en redes sociales
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-blue/20 text-brand-blue transition hover:-translate-y-1 hover:bg-brand-blue hover:text-white"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-md" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Nombre completo</Label>
              <Input id="fullName" name="fullName" placeholder="Nombre y apellidos" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Empresa (opcional)</Label>
              <Input id="company" name="company" placeholder="Empresa o institución" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@empresa.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" name="phone" placeholder="+593 99 999 9999" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Cuéntanos cómo podemos apoyarte..."
                required
              />
            </div>
            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto">
              Enviar mensaje
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}


