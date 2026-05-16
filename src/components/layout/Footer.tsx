import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background py-16 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Row: Tracker & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pb-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-29 text-center md:text-left">
            <h3 className="text-3xl font-times italic text-foreground shrink-0">Rastrea tu Pedido</h3>
            <p className="text-secondary-text text-base max-w-sm">
              Si ya contrataste alguno de nuestros servicios, mantente al tanto desde esta plataforma.
            </p>
          </div>
          <div className="relative group w-full md:w-auto max-w-lg flex-1 md:max-w-md">
            <div className="bg-transparent border border-[#414146] text-[#414146] flex items-center w-full hover:bg-[#414146] hover:text-white transition-all duration-300 focus-within:bg-[#414146] focus-within:text-white group">
              <div className="pl-6 pointer-events-none">
                <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="ID de tu pedido"
                className="bg-transparent w-full py-4 px-4 outline-none text-base md:text-lg font-sans placeholder:text-[#414146]/60 group-hover:placeholder:text-white/60 focus:placeholder:text-white/60 text-current"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Logo, Links, Contact, Socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Logo */}
          <div className="flex items-center gap-2 group">
            <Image
              src="/images/codalystelogo.png"
              alt="Codalyste Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            <a href="#hero" className="text-foreground hover:text-primary transition-colors font-sans text-lg">Home</a>
            <a href="#proyectos" className="text-foreground hover:text-primary transition-colors font-sans text-lg">Proyectos</a>
            <a href="#soluciones" className="text-foreground hover:text-primary transition-colors font-sans text-lg">Soluciones</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-3">
            <a href="mailto:hola@codalyste.com" className="text-foreground hover:text-primary transition-colors font-sans text-lg">hola@codalyste.com</a>
            <a href="https://wa.me/528119784678" className="text-foreground hover:text-primary transition-colors font-sans text-lg">+52 (81) 1978 4678</a>
          </div>

          {/* Socials */}
          <div className="flex justify-start md:justify-end gap-6">
            <a href="https://wa.me/528119784678" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4a8 8 0 00-6.8 12.2l-1.2 3.6 3.8-1.2A8 8 0 1012 4z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 14.5c-.3.8-1.5 1.5-2.2 1.5s-2.1-.5-3.5-1.5c-1.5-1-2.5-2.5-2.5-3.5s.5-1.8 1.2-2.2c.4-.2.8-.2 1.2.3l1.2 1.6c.2.3.1.7-.2 1l-.5.5c-.2.2-.2.5 0 .8.8 1.2 2 2.2 3.2 2.5.3.1.6 0 .8-.2l.6-.6c.2-.3.6-.4.9-.2l1.8 1.2c.3.2.4.6.2.9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 8v2m1-1h-2"></path>
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="1.5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="1.5"></path>
                <path d="M17.5 6.5h.01" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-secondary-text text-sm">
            © {new Date().getFullYear()} Codalyste. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
