"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, ShoppingBag } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-light bg-surface-light flex flex-col shrink-0">
        {/* Logo area */}
        <div className="h-20 border-b border-border-light flex items-center px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/images/codalystelogo.png" 
              alt="Codalyste Logo" 
              width={120}
              height={36}
              priority
              style={{ height: '36px', width: '120px' }}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          <Link
            href="/admin/pedidos"
            className={`flex items-center gap-3 px-4 py-3 font-bold text-sm transition-colors ${
              pathname === "/admin/pedidos"
                ? "bg-primary text-white"
                : "text-secondary-text hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos (Kanban)</span>
          </Link>
        </nav>

        {/* Footer Area / Logout */}
        <div className="p-6 border-t border-border-light">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-border text-secondary-text hover:text-primary hover:border-primary px-4 py-3 font-bold text-sm bg-transparent cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-border-light flex items-center justify-between px-8 bg-surface/30 backdrop-blur-sm shrink-0">
          <div>
            <span className="text-xs font-bold text-hint uppercase tracking-wider">Panel Administrativo</span>
            <h2 className="text-lg font-bold text-foreground font-sans">Hola, Administrador</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-secondary-text">Conexión Segura</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
