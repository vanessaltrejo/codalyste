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
    what: "Todo tu negocio en una sola página.",
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
    who: "E-commerce, restaurantes, logística.",
    imagePath: "/images/imageordertracker.png",
  },
  {
    id: "expenses",
    title: "Control de Gastos",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    what: "Gestión de gastos y finanzas internas.",
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
    <div className="flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 scale-90">
          {service.icon}
        </div>
        <h3 className="text-lg font-serif text-foreground">{service.title}</h3>
      </div>

      <div className="space-y-1.5 mb-12">
        <div className="flex gap-2 items-baseline">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[65px]">Qué es</span>
          <p className="text-secondary-text text-base leading-tight">{service.what}</p>
        </div>
        <div className="flex gap-2 items-baseline">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[65px]">Para quién</span>
          <p className="text-secondary-text text-base leading-tight">{service.who}</p>
        </div>
      </div>

      <div className="w-full aspect-[3/4] bg-white border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-xl relative">
        <Image
          src={service.imagePath}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="soluciones" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-40">
        {/* Presencia */}
        <div>
          <ScrollReveal>
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-4xl md:text-5xl">
                <span className="font-times font-normal">Aumenta tu</span> <span className="font-serif text-primary uppercase tracking-wide">PRESENCIA</span>
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
              <h2 className="text-4xl md:text-5xl">
                <span className="font-times font-normal">Optimiza tus</span> <span className="font-serif text-primary uppercase tracking-wide">OPERACIONES</span>
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
