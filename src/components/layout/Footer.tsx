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
            <img
              src="/images/codalystelogo.png"
              alt="Codalyste Logo"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>






          {/* Links */}
          <div className="flex flex-col space-y-3">
            <a href="#hero" className="text-foreground hover:text-primary transition-colors font-sans text-lg hover-underline w-fit py-0.5">Home</a>
            <a href="#proyectos" className="text-foreground hover:text-primary transition-colors font-sans text-lg hover-underline w-fit py-0.5">Proyectos</a>
            <a href="#soluciones" className="text-foreground hover:text-primary transition-colors font-sans text-lg hover-underline w-fit py-0.5">Soluciones</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-3">
            <a href="mailto:codalyste@gmail.com" className="text-foreground hover:text-primary transition-colors font-sans text-lg hover-underline w-fit py-0.5">codalyste@gmail.com</a>
            <a href="https://wa.me/529613025277" className="text-foreground hover:text-primary transition-colors font-sans text-lg hover-underline w-fit py-0.5">+52 (961) 302 5277</a>
            <span className="text-secondary-text font-sans text-lg w-fit py-0.5">Monterrey, N.L.</span>
          </div>

          {/* Socials */}
          <div className="flex justify-start md:justify-end gap-6 items-center">
            <a 
              href="https://wa.me/529613025277" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors flex items-center justify-center w-8 h-8 relative"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.475 1.332 4.988l-1.34 4.902 5.016-1.316c1.466.8 3.115 1.22 4.808 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 17.925c-1.554 0-3.078-.419-4.41-1.21l-.317-.188-3.279.86.875-3.203-.207-.33c-.868-1.385-1.326-2.993-1.326-4.664 0-4.929 4.01-8.939 8.939-8.939 4.929 0 8.939 4.01 8.939 8.939 0 4.929-4.01 8.939-8.939 8.939zm4.909-6.721c-.269-.134-1.59-.785-1.837-.875-.246-.089-.426-.134-.606.134-.18.269-.696.875-.853 1.054-.157.18-.314.202-.583.067-.269-.134-1.137-.419-2.167-1.337-.802-.716-1.344-1.602-1.501-1.871-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.18-.269.269-.449.089-.18.045-.336-.022-.471-.067-.134-.606-1.459-.83-1.998-.218-.527-.459-.454-.63-.463-.163-.008-.348-.01-.533-.01s-.488.067-.743.342c-.255.275-.975.953-.975 2.327 0 1.374 1 2.701 1.137 2.88.137.18 1.968 3.006 4.767 4.213.666.287 1.187.458 1.59.587.67.213 1.28.183 1.762.111.537-.08 1.59-.65 1.815-1.246.224-.595.224-1.105.157-1.212-.067-.107-.246-.18-.515-.314z"/>
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/codalyste/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-foreground hover:text-primary transition-colors flex items-center justify-center w-8 h-8 relative"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
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
