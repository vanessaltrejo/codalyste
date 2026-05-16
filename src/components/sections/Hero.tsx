import Image from "next/image";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-32 px-6 flex flex-col items-center text-center overflow-hidden w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
        <div className="mb-12">
          <Image 
            src="/images/codalystelogo.png" 
            alt="Codalyste" 
            width={480} 
            height={120} 
            className="w-full max-w-[480px] h-auto"
            priority
          />
        </div>
        <div className="mt-0 max-w-4xl text-base md:text-lg text-foreground leading-relaxed text-justify space-y-6 mx-auto px-4">
          <p>
            Nos especializamos en diseño web a medida, ecosistemas de Google Ads y estrategia digital. Fundados en Aguascalientes, operamos bajo una filosofía de calidad sobre cantidad:
          </p>
          <p>
            nos alejamos del modelo de maquila para entregar soluciones técnicas impecables, entendiendo que la tecnología debe ser una inversión rentable, no un gasto estético.
          </p>
        </div>

        <div className="mt-16 max-w-4xl text-center relative px-12">
          <span className="text-7xl text-primary absolute -top-10 -left-4 opacity-100 font-serif font-bold">
            “
          </span>
          <h2 className="text-2xl md:text-4xl text-foreground leading-relaxed font-times italic">
            No solo diseñamos. Creamos negocio.
          </h2>
          <span className="text-7xl text-primary absolute -bottom-16 -right-4 opacity-100 font-serif font-bold">
            ”
          </span>
        </div>
      </div>
    </section>
  );
}
