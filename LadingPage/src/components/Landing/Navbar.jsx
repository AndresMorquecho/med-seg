import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.table(Object.fromEntries(formData.entries()));
    event.target.reset();
    alert("¡Gracias! Nos pondremos en contacto contigo muy pronto.");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-lg backdrop-blur" : "bg-white"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-4 text-brand-blue transition hover:opacity-90"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-brand-blue/20 bg-white shadow-sm">
            <img
              src="/Imagen/Logo.jpg"
              alt="MEDI&SEG CIA LTDA"
              className="h-10 w-10 object-contain"
            />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
              MEDI&SEG
            </p>
            <p className="text-lg font-semibold text-brand-blue">
              Medicina y Seguridad Ocupacional
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigate(link.href)}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-blue"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Agendar cita</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agenda una cita con nuestro equipo</DialogTitle>
                <DialogDescription>
                  Déjanos tus datos y uno de nuestros especialistas se pondrá en
                  contacto contigo para coordinar la atención.
                </DialogDescription>
              </DialogHeader>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" name="name" placeholder="Ingresa tu nombre" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" name="company" placeholder="Nombre de la empresa (opcional)" />
                </div>
                <div className="grid gap-2 md:grid-cols-2 md:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+593 99 999 9999"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="correo@empresa.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos qué necesitas..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Enviar solicitud
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-brand-blue hover:text-brand-blue lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-white shadow-lg lg:hidden"
          >
            <div className="space-y-4 px-6 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigate(link.href)}
                  className="block w-full text-left text-base font-medium text-slate-700"
                >
                  {link.label}
                </button>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    Agendar cita
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agenda una cita con nuestro equipo</DialogTitle>
                    <DialogDescription>
                      Déjanos tus datos y nos comunicaremos contigo a la brevedad.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <Label htmlFor="name-mobile">Nombre completo</Label>
                      <Input
                        id="name-mobile"
                        name="name"
                        placeholder="Ingresa tu nombre"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company-mobile">Empresa</Label>
                      <Input
                        id="company-mobile"
                        name="company"
                        placeholder="Nombre de la empresa (opcional)"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone-mobile">Teléfono</Label>
                      <Input
                        id="phone-mobile"
                        name="phone"
                        placeholder="+593 99 999 9999"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email-mobile">Correo electrónico</Label>
                      <Input
                        id="email-mobile"
                        type="email"
                        name="email"
                        placeholder="correo@empresa.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message-mobile">Mensaje</Label>
                      <Textarea
                        id="message-mobile"
                        name="message"
                        placeholder="Cuéntanos qué necesitas..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar solicitud
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


