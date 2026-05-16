"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

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
    answer: "El tiempo de entrega depende de la complejidad. Una Landing Page típica toma de 1 a 2 semanas, mientras que proyectos más robustos de E-commerce o Sistemas Internos pueden llevar de 4 a 6 semanas.",
  },
  {
    question: "¿Cuáles son las etapas de diseño?",
    answer: "Nuestro proceso se divide en: Descubrimiento y Estrategia, Arquitectura de Información, Diseño Visual de Alta Fidelidad, Desarrollo Técnico y Optimización final antes del Lanzamiento.",
  },
  {
    question: "¿Puedo solicitar una cotización gratuita?",
    answer: "¡Por supuesto! Ofrecemos una primera consultoría de diagnóstico sin costo donde evaluamos tus objetivos y te entregamos una propuesta formal adaptada a tu presupuesto.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left focus:outline-none group"
      >
        <span className="text-lg font-times font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {question}
        </span>
        <span className="ml-4 flex-shrink-0 text-primary">
          {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      {isOpen && (
        <div className="overflow-hidden">
          <p className="pt-4 pb-2 text-base text-secondary-text leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="py-24 px-6 bg-surface border-y border-gray-100">
      <div className="max-w-4xl mx-auto space-y-24">

        {/* Contact CTA */}
        <div className="text-center space-y-16">
          <div className="space-y-3.5">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground uppercase tracking-wide">
              HABLEMOS
            </h2>
            <p className="text-secondary-text text-base font-sans italic opacity-70">
              Nos pondremos en contacto contigo lo más pronto posible
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-24">
            {/* Left side: Contact Info */}
            <div className="flex flex-col space-y-6 text-left">
              <a href="mailto:hola@codalyste.com" className="flex items-center gap-4 group">
                <svg className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="font-times italic text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">hola@codalyste.com</span>
              </a>
              <a href="https://wa.me/528119784678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <svg className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4a8 8 0 00-6.8 12.2l-1.2 3.6 3.8-1.2A8 8 0 1012 4z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 14.5c-.3.8-1.5 1.5-2.2 1.5s-2.1-.5-3.5-1.5c-1.5-1-2.5-2.5-2.5-3.5s.5-1.8 1.2-2.2c.4-.2.8-.2 1.2.3l1.2 1.6c.2.3.1.7-.2 1l-.5.5c-.2.2-.2.5 0 .8.8 1.2 2 2.2 3.2 2.5.3.1.6 0 .8-.2l.6-.6c.2-.3.6-.4.9-.2l1.8 1.2c.3.2.4.6.2.9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 8v2m1-1h-2"></path>
                </svg>
                <span className="font-times italic text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">+52 (81) 1978 4678</span>
              </a>
            </div>

            {/* Right side: Button */}
            <div className="flex flex-col items-center">
              <a href="mailto:hola@codalyste.com" className="bg-primary text-white text-lg md:text-xl font-medium px-12 py-4 hover:bg-blue-700 transition-colors duration-300 w-full md:w-auto text-center">
                Inicia tu proyecto
              </a>
              <p className="mt-4 text-secondary-text text-base">
                Asistencia en un par de clicks
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <div className="space-y-2 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
