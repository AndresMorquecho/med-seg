export function Footer() {
  return (
    <footer className="bg-brand-blue py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="text-sm">
          © 2025 MEDI&SEG CIA LTDA. Todos los derechos reservados.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <a
            href="#"
            className="transition hover:text-brand-light"
          >
            Políticas de privacidad
          </a>
          <a
            href="#contacto"
            className="transition hover:text-brand-light"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}


