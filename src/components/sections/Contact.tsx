"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Cuál es el costo?",
    answer: "Cada proyecto es único y se cotiza según sus necesidades específicas. Sin embargo, nuestras soluciones comienzan desde un rango accesible para asegurar un retorno de inversión real para tu negocio.",
  },
  {
    question: "¿Cuánto tardan en entregar?",
    answer: "Nuestros desarrollos se entregan listos en un promedio de 2 a 4 semanas, garantizando la máxima calidad técnica. Si tu negocio necesita salir al mercado antes, contamos con la opción de Entrega Prioritaria para acelerar el proceso asignando recursos dedicados a tu proyecto.",
  },
  {
    question: "¿Puedo solicitar una cotización gratuita?",
    answer: "¡Por supuesto! Ofrecemos una primera consultoría de diagnóstico sin costo donde evaluamos tus objetivos y te entregamos una propuesta formal adaptada a tu presupuesto.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none group cursor-pointer"
      >
        <span className="text-lg font-times font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-primary">
          <Plus className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`} />
        </span>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-2 text-base text-secondary-text leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="py-24 px-6 bg-surface-light border-y border-border-light">
      <div className="max-w-4xl mx-auto space-y-24">

        {/* Contact CTA */}
        <div className="text-center space-y-16">
          <ScrollReveal>
            <div className="space-y-3.5">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
                Hablemos
              </h2>
              <p className="text-secondary-text text-base font-sans italic opacity-70">
                Nos pondremos en contacto contigo lo más pronto posible
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-24">
              {/* Left side: Contact Info */}
              <div className="flex flex-col space-y-6 text-left">
                <a href="mailto:codalyste@gmail.com" className="flex items-center gap-4 group w-fit">
                  <svg className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="font-times italic text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors hover-underline w-fit py-0.5">codalyste@gmail.com</span>
                </a>
                <a href="https://wa.me/528126001588?text=Hola,%20me%20interesa%20conocer%20c%C3%B3mo%20las%20soluciones%20de%20Codalyste%20pueden%20optimizar%20mi%20negocio.%20%C2%BFMe%20podr%C3%ADan%20brindar%20m%C3%A1s%20informaci%C3%B3n%3F" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group w-fit">
                  <svg className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.475 1.332 4.988l-1.34 4.902 5.016-1.316c1.466.8 3.115 1.22 4.808 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 17.925c-1.554 0-3.078-.419-4.41-1.21l-.317-.188-3.279.86.875-3.203-.207-.33c-.868-1.385-1.326-2.993-1.326-4.664 0-4.929 4.01-8.939 8.939-8.939 4.929 0 8.939 4.01 8.939 8.939 0 4.929-4.01 8.939-8.939 8.939zm4.909-6.721c-.269-.134-1.59-.785-1.837-.875-.246-.089-.426-.134-.606.134-.18.269-.696.875-.853 1.054-.157.18-.314.202-.583.067-.269-.134-1.137-.419-2.167-1.337-.802-.716-1.344-1.602-1.501-1.871-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.18-.269.269-.449.089-.18.045-.336-.022-.471-.067-.134-.606-1.459-.83-1.998-.218-.527-.459-.454-.63-.463-.163-.008-.348-.01-.533-.01s-.488.067-.743.342c-.255.275-.975.953-.975 2.327 0 1.374 1 2.701 1.137 2.88.137.18 1.968 3.006 4.767 4.213.666.287 1.187.458 1.59.587.67.213 1.28.183 1.762.111.537-.08 1.59-.65 1.815-1.246.224-.595.224-1.105.157-1.212-.067-.107-.246-.18-.515-.314z"/>
                  </svg>
                  <span className="font-times italic text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors hover-underline w-fit py-0.5">+52 (81) 2600 1588</span>
                </a>
              </div>

              {/* Right side: Button */}
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => window.openProjectForm?.()}
                  className="bg-primary text-white text-lg md:text-xl font-bold px-12 py-4 hover:bg-primary-hover hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_20px_rgba(0,51,255,0.15)] w-full md:w-auto text-center cursor-pointer border-none outline-none"
                >
                  Inicia tu proyecto
                </button>
                <p className="mt-4 text-secondary-text text-base">
                  Asistencia en un par de clicks
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Section */}
        <ScrollReveal delay={300}>
          <div>
            <div className="space-y-2 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
