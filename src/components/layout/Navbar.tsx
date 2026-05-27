"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface NavbarProps {
  isFormActive?: boolean;
  onCloseForm?: () => void;
}

export function Navbar({ isFormActive = false, onCloseForm }: NavbarProps) {
  const [showContact, setShowContact] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (isFormActive) {
      onCloseForm?.();
      return;
    }

    if (!isHome) {
      router.push(`/#${targetId}`);
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

      <nav className="fixed top-0 left-0 right-0 h-20 bg-surface-light/75 backdrop-blur-md z-50 border-b border-border-light/50 flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center relative">
          {isHome ? (
            <a 
              href="/#hero" 
              onClick={(e) => handleScroll(e, "hero")}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Image 
                src="/images/codalystelogo.png" 
                alt="Codalyste Logo" 
                width={133}
                height={40}
                priority
                style={{ height: '40px', width: '133px' }}
              />
            </a>
          ) : (
            <Link 
              href="/" 
              className="flex items-center gap-3 group cursor-pointer"
            >
              <Image 
                src="/images/codalystelogo.png" 
                alt="Codalyste Logo" 
                width={133}
                height={40}
                priority
                style={{ height: '40px', width: '133px' }}
              />
            </Link>
          )}




          {/* Desktop Nav - Only show internal links on Home page */}
          {!isFormActive && isHome && (
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-secondary-text">
              <a 
                href="/#hero" 
                onClick={(e) => handleScroll(e, "hero")}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Home
              </a>
              <a 
                href="/#proyectos" 
                onClick={(e) => handleScroll(e, "proyectos")}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Proyectos
              </a>
              <a 
                href="/#soluciones" 
                onClick={(e) => handleScroll(e, "soluciones")}
                className="hover:text-primary transition-colors hover-underline py-0.5 cursor-pointer"
              >
                Soluciones
              </a>
              <button 
                onClick={() => setShowContact(true)}
                className="hover:text-primary transition-colors border-none outline-none bg-transparent hover-underline py-0.5 cursor-pointer text-sm font-bold"
              >
                Hablemos
              </button>
            </div>
          )}

          {/* Desktop Start Project Button */}
          {!isFormActive && isHome && (
            <div className="hidden md:block">
              <button 
                onClick={() => window.openProjectForm?.()}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 font-bold text-sm transition-all hover:-translate-y-0.5 shadow-sm inline-block cursor-pointer"
              >
                Iniciar Proyecto
              </button>
            </div>
          )}

          {/* CTA with Close Button for form */}
          {isFormActive && (
            <button 
              onClick={onCloseForm}
              className="flex items-center gap-2 text-secondary-text hover:text-black transition-colors duration-300 font-bold text-sm md:text-base group cursor-pointer border-none outline-none bg-transparent"
            >
              <span>Cerrar</span>
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
