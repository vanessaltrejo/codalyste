"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-32 px-6 flex flex-col items-center text-center overflow-hidden w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
        <ScrollReveal duration={800}>
          <div className="mb-12">
            <img 
              src="/images/codalystelogo.png" 
              alt="Codalyste" 
              className="w-full max-w-[480px]"
              style={{ height: 'auto' }}
            />
          </div>
        </ScrollReveal>




        <ScrollReveal delay={150} duration={850}>
          <div className="mt-0 max-w-4xl text-base md:text-lg text-foreground leading-relaxed text-justify space-y-6 mx-auto px-4">
            <p>
              Nos posicionamos como una aceleradora digital a la medida con sede en Monterrey. Impulsamos la identidad digital de tu empresa y optimizamos sus operaciones con herramientas de alta eficiencia.
            </p>
            <p>
              Con un modelo de soluciones que crece al ritmo de tus necesidades, transformamos la tecnología en una inversión rentable y estratégica. Aseguramos que cada proceso digital se convierta en una verdadera herramienta de ventas y control.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} duration={900}>
          <div className="mt-20 w-full max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12">
            {/* Quote - Left aligned */}
            <div className="flex-1 text-left">
              <div className="relative inline-block px-12">
                <span className="text-7xl text-primary absolute left-0 top-1/2 -translate-y-1/2 opacity-100 font-serif font-bold leading-none select-none">
                  “
                </span>
                <h2 className="text-2xl md:text-3xl text-foreground leading-relaxed font-times italic">
                  No solo diseñamos. Creamos negocio.
                </h2>
                <span className="text-7xl text-primary absolute right-0 top-1/2 -translate-y-1/2 opacity-100 font-serif font-bold leading-none select-none">
                  ”
                </span>
              </div>
            </div>

            {/* Button - Right aligned */}
            <div className="shrink-0 w-full md:w-auto">
              <button 
                onClick={() => window.openProjectForm?.()}
                className="bg-primary text-white text-base md:text-lg font-bold px-10 py-3.5 hover:bg-blue-700 hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(11,83,250,0.15)] w-full md:w-auto text-center block cursor-pointer border-none outline-none"
              >
                Inicia tu proyecto
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
