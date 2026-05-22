"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const [trackingId, setTrackingId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // Trigger shake animation
    setIsShaking(true);
    setSearchedId(trackingId.trim().toUpperCase());
    setShowError(true);

    // Reset shake after 500ms
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  return (
    <footer className="bg-background py-16 px-6 border-t border-gray-100">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Row & Alert Wrapper */}
        <div className="w-full">
          {/* Top Row: Tracker & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pb-8 border-b border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-29 text-center md:text-left">
              <h3 className="text-3xl font-times italic text-foreground shrink-0">Rastrea tu Pedido</h3>
              <p className="text-secondary-text text-base max-w-sm">
                Si ya contrataste alguno de nuestros servicios, mantente al tanto desde esta plataforma.
              </p>
            </div>
            <form 
              onSubmit={handleSearch} 
              className={`relative group w-full md:w-auto max-w-lg flex-1 md:max-w-md transition-transform duration-300 ${isShaking ? "animate-shake" : ""}`}
            >
              <div className="bg-transparent border border-[#414146] text-[#414146] flex items-center w-full hover:bg-[#414146] hover:text-white transition-all duration-300 focus-within:bg-[#414146] focus-within:text-white group">
                <button 
                  type="submit" 
                  className="pl-6 bg-transparent border-none outline-none cursor-pointer text-current flex items-center justify-center p-0"
                >
                  <svg className="w-5 h-5 opacity-70 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <input 
                  type="text" 
                  placeholder="ID de tu pedido"
                  value={trackingId}
                  onChange={(e) => {
                    setTrackingId(e.target.value);
                    if (showError) setShowError(false);
                  }}
                  className="bg-transparent w-full py-4 px-4 outline-none text-base md:text-lg font-sans placeholder:text-[#414146]/60 group-hover:placeholder:text-white/60 focus:placeholder:text-white/60 text-current"
                />
              </div>
            </form>
          </div>

          {/* Dynamic Tracking Alert Result */}
          <AnimatePresence>
            {showError && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 32 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex justify-center overflow-hidden"
              >
                <div className="bg-[#FFFBEB]/80 backdrop-blur-sm border border-amber-200 p-6 md:p-8 flex items-start gap-4 text-left max-w-2xl w-full">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                      <span className="block text-lg font-times italic text-[#111115] font-bold">Búsqueda de Seguimiento</span>
                      <p className="text-secondary-text text-base leading-relaxed">
                        ¡Ups! No encontramos el código <strong className="text-primary font-bold">{searchedId}</strong>. Verifica que incluya letras y números, o contáctanos por WhatsApp para ayudarte de inmediato.
                      </p>
                    </div>
                    
                    <div className="flex justify-start">
                      <a
                        href={`https://wa.me/528126001588?text=${encodeURIComponent(`Hola, tengo dudas con mi código de rastreo ${searchedId}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-3.5 font-bold text-base transition-all hover:scale-[1.03] shadow-[0_4px_15px_rgba(37,211,102,0.15)] flex items-center gap-2.5 whitespace-nowrap shrink-0 border-none outline-none text-center justify-center w-full sm:w-auto"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.475 1.332 4.988l-1.34 4.902 5.016-1.316c1.466.8 3.115 1.22 4.808 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 17.925c-1.554 0-3.078-.419-4.41-1.21l-.317-.188-3.279.86.875-3.203-.207-.33c-.868-1.385-1.326-2.993-1.326-4.664 0-4.929 4.01-8.939 8.939-8.939 4.929 0 8.939 4.01 8.939 8.939 0 4.929-4.01 8.939-8.939 8.939zm4.909-6.721c-.269-.134-1.59-.785-1.837-.875-.246-.089-.426-.134-.606.134-.18.269-.696.875-.853 1.054-.157.18-.314.202-.583.067-.269-.134-1.137-.419-2.167-1.337-.802-.716-1.344-1.602-1.501-1.871-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.18-.269.269-.449.089-.18.045-.336-.022-.471-.067-.134-.606-1.459-.83-1.998-.218-.527-.459-.454-.63-.463-.163-.008-.348-.01-.533-.01s-.488.067-.743.342c-.255.275-.975.953-.975 2.327 0 1.374 1 2.701 1.137 2.88.137.18 1.968 3.006 4.767 4.213.666.287 1.187.458 1.59.587.67.213 1.28.183 1.762.111.537-.08 1.59-.65 1.815-1.246.224-.595.224-1.105.157-1.212-.067-.107-.246-.18-.515-.314z"/>
                        </svg>
                        <span>Asistencia en Línea</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Row: Logo, Links, Contact, Socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleScroll(e, "hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/codalystelogo.png"
              alt="Codalyste Logo"
              width={133}
              height={40}
              style={{ height: '40px', width: '133px' }}
            />
          </a>






          {/* Links */}
          <div className="flex flex-col space-y-3">
            <a 
              href="#hero" 
              onClick={(e) => handleScroll(e, "hero")}
              className="text-foreground hover:text-primary transition-colors font-sans text-base hover-underline w-fit py-0.5 cursor-pointer"
            >
              Home
            </a>
            <a 
              href="#proyectos" 
              onClick={(e) => handleScroll(e, "proyectos")}
              className="text-foreground hover:text-primary transition-colors font-sans text-base hover-underline w-fit py-0.5 cursor-pointer"
            >
              Proyectos
            </a>
            <a 
              href="#soluciones" 
              onClick={(e) => handleScroll(e, "soluciones")}
              className="text-foreground hover:text-primary transition-colors font-sans text-base hover-underline w-fit py-0.5 cursor-pointer"
            >
              Soluciones
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-3">
            <a href="mailto:codalyste@gmail.com" className="text-foreground hover:text-primary transition-colors font-sans text-base hover-underline w-fit py-0.5">codalyste@gmail.com</a>
            <a href="https://wa.me/528126001588?text=Hola,%20me%20interesa%20conocer%20c%C3%B3mo%20las%20soluciones%20de%20Codalyste%20pueden%20optimizar%20mi%20negocio.%20%C2%BFMe%20podr%C3%ADan%20brindar%20m%C3%A1s%20informaci%C3%B3n%3F" className="text-foreground hover:text-primary transition-colors font-sans text-base hover-underline w-fit py-0.5">+52 (81) 2600 1588</a>
            <span className="text-secondary-text font-sans text-base w-fit py-0.5">Monterrey, N.L.</span>
          </div>

          {/* Socials */}
          <div className="flex justify-start md:justify-end gap-6 items-center">
            <a 
              href="https://wa.me/528126001588?text=Hola,%20me%20interesa%20conocer%20c%C3%B3mo%20las%20soluciones%20de%20Codalyste%20pueden%20optimizar%20mi%20negocio.%20%C2%BFMe%20podr%C3%ADan%20brindar%20m%C3%A1s%20informaci%C3%B3n%3F" 
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
