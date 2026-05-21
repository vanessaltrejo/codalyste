"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ChevronDown, X } from "lucide-react";

interface NavbarProps {
  isFormActive?: boolean;
  onCloseForm?: () => void;
}

export function Navbar({ isFormActive = false, onCloseForm }: NavbarProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      {/* Invisible backdrop to close the dropdown when clicking outside */}
      {showContact && (
        <div 
          className="fixed inset-0 z-40 bg-transparent" 
          onClick={() => setShowContact(false)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 h-20 bg-surface/40 backdrop-blur-md z-50 border-b border-gray-100/50 flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">
          <a 
            href="#hero" 
            onClick={() => {
              if (isFormActive) {
                onCloseForm?.();
              }
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/codalystelogo.png" 
              alt="Codalyste Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
          </a>




          {/* Links */}
          {!isFormActive && (
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-secondary-text">
              <Link href="#hero" className="hover:text-primary transition-colors hover-underline py-0.5">Home</Link>
              <Link href="#proyectos" className="hover:text-primary transition-colors hover-underline py-0.5">Proyectos</Link>
              <Link href="#soluciones" className="hover:text-primary transition-colors hover-underline py-0.5">Soluciones</Link>
            </div>
          )}

          {/* CTA with Dropdown or Close Button */}
          {isFormActive ? (
            <button 
              onClick={onCloseForm}
              className="flex items-center gap-2 text-[#66666A] hover:text-black transition-colors duration-300 font-bold text-sm md:text-base group cursor-pointer border-none outline-none bg-transparent"
            >
              <span>Cerrar</span>
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          ) : (
            <div className="relative z-50">
              <button 
                onClick={() => setShowContact(!showContact)}
                className="bg-primary text-white px-6 py-2.5 rounded-none font-bold text-sm hover:bg-blue-700 hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(11,83,250,0.15)] flex items-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Contacto</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-350 ${showContact ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute right-0 mt-3 w-[276px] bg-white border border-gray-100 shadow-2xl transition-all duration-350 ease-out origin-top-right transform ${
                  showContact 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="p-2 flex flex-col divide-y divide-gray-50">
                  {/* Email Option */}
                  <a 
                    href="mailto:codalyste@gmail.com" 
                    className="flex items-center gap-4 p-4 hover:bg-surface transition-colors group text-left"
                    onClick={() => setShowContact(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-secondary-text opacity-60 font-sans font-bold">Enviar correo</span>
                      <span className="block text-sm font-sans font-bold text-foreground group-hover:text-primary transition-colors mt-0.5">codalyste@gmail.com</span>
                    </div>
                  </a>

                  {/* WhatsApp Option */}
                  <a 
                    href="https://wa.me/528126001588" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 p-4 hover:bg-surface transition-colors group text-left"
                    onClick={() => setShowContact(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 relative shrink-0">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.475 1.332 4.988l-1.34 4.902 5.016-1.316c1.466.8 3.115 1.22 4.808 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 17.925c-1.554 0-3.078-.419-4.41-1.21l-.317-.188-3.279.86.875-3.203-.207-.33c-.868-1.385-1.326-2.993-1.326-4.664 0-4.929 4.01-8.939 8.939-8.939 4.929 0 8.939 4.01 8.939 8.939 0 4.929-4.01 8.939-8.939 8.939zm4.909-6.721c-.269-.134-1.59-.785-1.837-.875-.246-.089-.426-.134-.606.134-.18.269-.696.875-.853 1.054-.157.18-.314.202-.583.067-.269-.134-1.137-.419-2.167-1.337-.802-.716-1.344-1.602-1.501-1.871-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.18-.269.269-.449.089-.18.045-.336-.022-.471-.067-.134-.606-1.459-.83-1.998-.218-.527-.459-.454-.63-.463-.163-.008-.348-.01-.533-.01s-.488.067-.743.342c-.255.275-.975.953-.975 2.327 0 1.374 1 2.701 1.137 2.88.137.18 1.968 3.006 4.767 4.213.666.287 1.187.458 1.59.587.67.213 1.28.183 1.762.111.537-.08 1.59-.65 1.815-1.246.224-.595.224-1.105.157-1.212-.067-.107-.246-.18-.515-.314z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-secondary-text opacity-60 font-sans font-bold">Escríbenos</span>
                      <span className="block text-sm font-sans font-bold text-foreground group-hover:text-emerald-600 transition-colors mt-0.5">+52 (81) 2600 1588</span>
                    </div>
                  </a>


                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
