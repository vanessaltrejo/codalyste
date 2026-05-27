"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface Project {
  id: string;
  name: string;
  description: string;
  demoUrl?: string;
  imagePath: string;
  buttonText?: string;
}

const projects: Project[] = [
  {
    id: "comedor",
    name: "Comedor de los Pobres",
    description: "Plataforma de donaciones y voluntariado.",
    demoUrl: "https://comedor--comedor-4e98e.us-east4.hosted.app/index.html",
    imagePath: "/images/comedorimage.png",
  },
  {
    id: "apnl",
    name: "APNL",
    description: "Sitio corporativo para organización civil.",
    demoUrl: "https://apnl--apnl-69fd3.us-east4.hosted.app/",
    imagePath: "/images/apnlimage.png",
  },
  {
    id: "cll",
    name: "CLL Ingeniería",
    description: "Portafolio industrial y de servicios.",
    demoUrl: "https://cllingenieria--cllingenieria.us-east4.hosted.app/",
    imagePath: "/images/cllingenieriaimage.png",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="py-24 px-6 bg-surface-light border-y border-border-light">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-3.5">
            <h2 className="text-4xl md:text-5xl text-foreground font-sans font-bold">
              Proyectos <span className="text-primary">Destacados</span>
            </h2>
            <p className="text-secondary-text text-base font-sans italic opacity-70">
              Gracias por confiar en nosotros.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {/* Column 1 */}
          <div className="space-y-24">
            {projects.filter((_, i) => i % 2 === 0).map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 150} duration={950}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>

          {/* Column 2 - Shifted even further down */}
          <div className="space-y-24 md:mt-80">
            {projects.filter((_, i) => i % 2 !== 0).map((project, idx) => (
              <ScrollReveal key={project.id} delay={idx * 150 + 150} duration={950}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const triggerMouseEnter = () => {
    window.dispatchEvent(new CustomEvent("mouseenter-project"));
  };

  const triggerMouseLeave = () => {
    window.dispatchEvent(new CustomEvent("mouseleave-project"));
  };

  return (
    <div className="flex flex-col group">
      <div 
        onMouseEnter={triggerMouseEnter}
        onMouseLeave={triggerMouseLeave}
        className="w-full aspect-[16/10] bg-background border border-border-light overflow-hidden transition-transform duration-500 group-hover:shadow-xl relative cursor-none-all"
      >
        {project.demoUrl ? (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full h-full relative cursor-none-all"
          >
            <Image 
              src={project.imagePath} 
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover cursor-none-all"
            />
          </a>
        ) : (
          <Image 
            src={project.imagePath} 
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover cursor-none-all"
          />
        )}
      </div>
      <div className="mt-6 flex justify-between items-end gap-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-foreground">{project.name}</h3>
          <p className="text-secondary-text text-base font-sans mt-1">{project.description}</p>
        </div>
        {project.demoUrl ? (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-transparent border border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 rounded-none uppercase tracking-wider whitespace-nowrap mb-0.5 block text-center cursor-pointer"
          >
            {project.buttonText || "Visitar Demo"}
          </a>
        ) : (
          <span 
            className="px-6 py-2.5 bg-transparent border border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 rounded-none uppercase tracking-wider whitespace-nowrap mb-0.5 block text-center select-none cursor-default"
          >
            {project.buttonText || "Visitar Demo"}
          </span>
        )}
      </div>
    </div>
  );
}
