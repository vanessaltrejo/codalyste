import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-surface/80 backdrop-blur-md z-50 border-b border-gray-100 flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Logo Placeholder */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/images/codalystelogo.png" 
            alt="Codalyste Logo" 
            width={180} 
            height={40} 
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-secondary-text">
          <Link href="#hero" className="hover:text-primary transition-colors">Home</Link>
          <Link href="#proyectos" className="hover:text-primary transition-colors">Proyectos</Link>
          <Link href="#soluciones" className="hover:text-primary transition-colors">Soluciones</Link>
        </div>

        {/* CTA */}
        <Link href="#contacto" className="bg-primary text-white px-6 py-2.5 rounded-none font-bold text-sm hover:bg-blue-700 transition-colors">
          Contacto
        </Link>
      </div>
    </nav>
  );
}
