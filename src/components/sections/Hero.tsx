"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-32 px-6 flex flex-col items-start text-left overflow-hidden w-full min-h-[85vh] justify-center">
      <div className="max-w-7xl mx-auto flex flex-col items-start w-full relative z-10">

        {/* Título Principal (Reemplaza al logo) */}
        <ScrollReveal duration={800} direction="up" distance="30px">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 max-w-4xl leading-[1.1] font-serif font-normal">
            Creamos la tecnología que <span className="text-primary">acelera el crecimiento</span> de tu empresa.
          </h1>
        </ScrollReveal>

        {/* Cuerpo del texto */}
        <ScrollReveal delay={150} duration={850}>
          <div className="max-w-3xl text-lg md:text-xl text-foreground/80 leading-relaxed text-left space-y-6">
            <p>
              Con sede en Monterrey, desarrollamos software a la medida y plataformas web de alto impacto. Creamos soluciones premium diseñadas específicamente para tu empresa, enfocadas en automatizar procesos, aumentar ventas y darte control total de tu negocio con una inversión realmente rentable.
            </p>
          </div>
        </ScrollReveal>

        {/* Cita y Botón */}
        <ScrollReveal delay={300} duration={900}>
          <div className="mt-16 w-full max-w-4xl flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
            {/* Quote */}
            <div className="flex-1 text-left">
              <div className="flex items-center">
                <h2 className="text-[20px] sm:text-2xl md:text-3xl text-foreground leading-relaxed font-times italic">
                  <span className="text-primary font-serif font-bold text-4xl md:text-5xl inline-block translate-y-1 md:translate-y-2 mr-3 select-none">“</span>No solo diseñamos. Creamos negocio.<span className="text-primary font-serif font-bold text-4xl md:text-5xl inline-block translate-y-1 md:translate-y-2 ml-0.5 select-none">”</span>
                </h2>
              </div>
            </div>

            {/* Button */}
            <div className="shrink-0 w-full md:w-auto">
              <button
                onClick={() => window.openProjectForm?.()}
                className="relative overflow-hidden bg-primary text-white text-base md:text-lg font-bold px-10 py-4 hover:bg-blue-700 hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(11,83,250,0.2)] w-full md:w-auto text-center block cursor-pointer border-none outline-none group"
              >
                {/* Shimmer light effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                <span className="relative z-10">Inicia tu proyecto</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
