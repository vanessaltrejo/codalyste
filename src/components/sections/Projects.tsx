interface Project {
  id: string;
  name: string;
  description: string;
}

const projects: Project[] = [
  {
    id: "comedor",
    name: "Comedor de los Pobres",
    description: "Plataforma de donaciones y voluntariado.",
  },
  {
    id: "apnl",
    name: "APNL",
    description: "Sitio corporativo para organización civil.",
  },
  {
    id: "cll",
    name: "CLL Ingeniería",
    description: "Portafolio industrial y de servicios.",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="py-24 px-6 bg-surface border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3.5">
          <h2 className="text-4xl md:text-5xl text-foreground">
            <span className="font-times font-normal">Proyectos</span> <span className="font-serif text-primary uppercase tracking-wide">DESTACADOS</span>
          </h2>
          <p className="text-secondary-text text-base font-sans italic opacity-70">
            Gracias por confiar en nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {/* Column 1 */}
          <div className="space-y-24">
            {projects.filter((_, i) => i % 2 === 0).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Column 2 - Shifted even further down */}
          <div className="space-y-24 md:mt-80">
            {projects.filter((_, i) => i % 2 !== 0).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col group">
      <div className="w-full aspect-[4/3] bg-white border border-gray-100 overflow-hidden transition-transform duration-500 group-hover:shadow-xl relative">
        {/* Placeholder for Project Image */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif text-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">
          {project.name}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-end gap-4">
        <div>
          <h3 className="text-xl font-bold font-sans text-foreground">{project.name}</h3>
          <p className="text-secondary-text text-base font-sans mt-1">{project.description}</p>
        </div>
        <button className="px-6 py-2.5 bg-transparent border border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 rounded-none uppercase tracking-wider whitespace-nowrap mb-0.5">
          Visitar Demo
        </button>
      </div>
    </div>
  );
}
