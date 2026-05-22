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

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isFormActive) {
      onCloseForm?.();
      return;
    }
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
            onClick={(e) => handleScroll(e, "hero")}
            className="flex items-center gap-3 group cursor-pointer"
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
          {!isFormActive && (
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-secondary-text">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("hero");
                  if (element) {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                  }
                }}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Home
              </a>
              <a 
                href="#proyectos" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("proyectos");
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
                }}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Proyectos
              </a>
              <a 
                href="#soluciones" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("soluciones");
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
                }}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Soluciones
              </a>
              <a 
                href="#contacto" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("contacto");
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
                }}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Hablemos
              </a>
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
            <button 
              onClick={() => window.openProjectForm?.()}
              className="bg-primary text-white px-6 py-2.5 rounded-none font-bold text-sm hover:bg-blue-700 hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(11,83,250,0.15)] flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span>Iniciar Proyecto</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
