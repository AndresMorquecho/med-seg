import { Navbar } from "@/components/Landing/Navbar";
import { HeroSection } from "@/components/Landing/HeroSection";
import { MisionVisionValores } from "@/components/Landing/MisionVisionValores";
import { Experiencia } from "@/components/Landing/Experiencia";
import { ServiciosPrincipales } from "@/components/Landing/ServiciosPrincipales";
import { ServiciosDetalle } from "@/components/Landing/ServiciosDetalle";
import { Contacto } from "@/components/Landing/Contacto";
import { Footer } from "@/components/Landing/Footer";

function App() {
  return (
    <div className="bg-white">
      <Navbar />
      <main className="flex flex-col pt-24">
        <HeroSection />
        <MisionVisionValores />
        <Experiencia />
        <ServiciosPrincipales />
        <ServiciosDetalle />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
