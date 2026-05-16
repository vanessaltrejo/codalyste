import { Monitor, Smartphone, Globe, Calendar, CreditCard, LayoutDashboard } from "lucide-react";

interface Service {
  id: string;
  title: string;
  icon: React.ReactNode;
  what: string;
  who: string;
}

const presenceServices: Service[] = [
  {
    id: "landing",
    title: "Landing Page",
    icon: <Globe className="w-6 h-6 text-primary" />,
    what: "Página enfocada en conversión.",
    who: "Campañas de marketing, ventas.",
  },
  {
    id: "onepage",
    title: "One-Page",
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    what: "Todo tu negocio en una sola página.",
    who: "Portafolios, negocios locales.",
  },
  {
    id: "multipage",
    title: "Multi-Page",
    icon: <Monitor className="w-6 h-6 text-primary" />,
    what: "Sitio web corporativo completo.",
    who: "Empresas con múltiples servicios.",
  },
];

const operationsServices: Service[] = [
  {
    id: "ordertracker",
    title: "Order Tracker",
    icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
    what: "Sigue tus pedidos en tiempo real.",
    who: "E-commerce, restaurantes, logística.",
  },
  {
    id: "expenses",
    title: "Expenses",
    icon: <CreditCard className="w-6 h-6 text-primary" />,
    what: "Gestión de gastos y finanzas internas.",
    who: "Startups, pymes, agencias.",
  },
  {
    id: "booking",
    title: "Booking",
    icon: <Calendar className="w-6 h-6 text-primary" />,
    what: "Agenda de citas y reservas online.",
    who: "Clínicas, consultores, salones.",
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col group">
      {/* Elegant Placeholder */}
      <div className="w-full aspect-[4/5] bg-surface mb-6 overflow-hidden transition-transform duration-500 group-hover:shadow-lg relative">
        {/* Placeholder text for image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs font-sans px-4 text-center">
          Mockup Placeholder
        </div>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0 scale-90">
          {service.icon}
        </div>
        <h3 className="text-lg font-serif text-foreground">{service.title}</h3>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[65px]">Qué es</span>
          <p className="text-secondary-text text-base leading-tight">{service.what}</p>
        </div>
        <div className="flex gap-2 items-baseline">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider shrink-0 min-w-[65px]">Para quién</span>
          <p className="text-secondary-text text-base leading-tight">{service.who}</p>
        </div>
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
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-4xl md:text-5xl">
              <span className="font-times font-normal">Aumenta tu</span> <span className="font-serif text-primary uppercase tracking-wide">PRESENCIA</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {presenceServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Operaciones */}
        <div>
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-4xl md:text-5xl">
              <span className="font-times font-normal">Optimiza tus</span> <span className="font-serif text-primary uppercase tracking-wide">OPERACIONES</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {operationsServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
