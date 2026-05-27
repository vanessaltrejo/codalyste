import { Monitor, Smartphone, Globe, Calendar, CreditCard, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  what: string;
  who: string;
  imagePath: string;
}

const presenceServices: Service[] = [
  {
    id: "landing",
    title: "Landing Page",
    icon: <Globe className="w-6 h-6 text-primary" />,
    what: "Página enfocada en conversión.",
    who: "Campañas de marketing, ventas.",
    imagePath: "/images/imagelandingpage.png",
  },
  {
    id: "onepage",
    title: "One-Page",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    what: "Tu negocio en una sola página.",
    who: "Portafolios, negocios locales.",
    imagePath: "/images/imageonepage.png",
  },
  {
    id: "multipage",
    title: "Multi-Page",
    icon: <Monitor className="w-6 h-6 text-primary" />,
    what: "Sitio web corporativo completo.",
    who: "Empresas con múltiples servicios.",
    imagePath: "/images/imagemultipage.png",
  },
];

const operationsServices: Service[] = [
  {
    id: "ordertracker",
    title: "Order Tracker",
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    what: "Sigue tus pedidos en tiempo real.",
    who: "E-commerce, restaurantes.",
    imagePath: "/images/imageordertracker.png",
  },
  {
    id: "expenses",
    title: "Control de Gastos",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    what: "Gestión de finanzas internas.",
    who: "Startups, pymes, agencias.",
    imagePath: "/images/imageexpenses.png",
  },
  {
    id: "booking",
    title: "Booking",
    icon: <Calendar className="w-6 h-6 text-primary" />,
    what: "Agenda de citas y reservas online.",
    who: "Clínicas, consultores, salones.",
    imagePath: "/images/imagebooking.png",
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col bg-surface-light/80 backdrop-blur-sm border border-border-light p-6 md:p-8 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full relative">
      {/* Icon & Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-white border border-border-light flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
          {service.icon}
        </div>
        <h3 className="text-lg md:text-xl font-sans font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
      </div>

      {/* Description Meta */}
      <div className="space-y-3 mb-8 flex-grow">
        <div className="flex gap-3 items-baseline">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[70px]">
            Qué es
          </span>
          <p className="text-secondary-text text-sm md:text-base leading-relaxed">
            {service.what}
          </p>
        </div>
        <div className="flex gap-3 items-baseline">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[70px]">
            Para quién
          </span>
          <p className="text-secondary-text text-sm md:text-base leading-relaxed">
            {service.who}
          </p>
        </div>
      </div>

      {/* Image Container */}
      <div className="w-full aspect-[4/3] bg-background border border-border-light overflow-hidden relative shrink-0">
        <Image
          src={service.imagePath}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="soluciones" className="py-24 px-6 bg-background bg-fixed bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:64px_64px] border-b border-border-light relative">
      <div className="max-w-7xl mx-auto space-y-40">
        {/* Presencia */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
                Aumenta tu <span className="text-primary">Presencia</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {presenceServices.map((service, idx) => (
              <ScrollReveal key={service.id} delay={idx * 100} duration={850}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Operaciones */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
                Optimiza tus <span className="text-primary">Operaciones</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {operationsServices.map((service, idx) => (
              <ScrollReveal key={service.id} delay={idx * 100} duration={850}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
