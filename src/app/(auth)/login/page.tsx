"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setShowError(false);

    // Credenciales de prueba
    setTimeout(() => {
      if (email.toLowerCase() === "admin@codalyste.com" && password === "admin123") {
        router.push("/admin/pedidos");
      } else {
        setIsLoading(false);
        setIsShaking(true);
        setShowError(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Navbar />

      <main 
        className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6 relative"
        style={{ minHeight: "calc(100vh - 148px)" }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
            20%, 40%, 60%, 80% { transform: translateX(6px); }
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}} />

        <div className="max-w-md mx-auto w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl text-foreground font-sans font-bold">
              Iniciar <span className="text-primary">Sesión</span>
            </h1>
            <p className="text-secondary-text text-sm md:text-base">
              Accede al panel administrativo para gestionar los pedidos y actualizar su avance en tiempo real.
            </p>
          </div>

          {/* Form Card */}
          <form 
            onSubmit={handleSubmit}
            className={`bg-surface-light border border-border-light p-8 md:p-10 space-y-6 transition-transform duration-300 ${isShaking ? "animate-shake" : ""}`}
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-text block">
                Correo Electrónico
              </label>
              <input 
                type="email"
                required
                placeholder="ejemplo@codalyste.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (showError) setShowError(false);
                }}
                className="bg-surface-2 border border-border focus:border-primary text-foreground text-base p-3.5 w-full outline-none placeholder:text-placeholder font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary-text block">
                Contraseña
              </label>
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (showError) setShowError(false);
                }}
                className="bg-surface-2 border border-border focus:border-primary text-foreground text-base p-3.5 w-full outline-none placeholder:text-placeholder font-sans"
              />
            </div>

            <AnimatePresence>
              {showError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50/80 border border-amber-200 p-4 text-left text-sm text-secondary-text space-y-1 overflow-hidden"
                >
                  <span className="block font-bold text-amber-800">Error de autenticación</span>
                  <p className="text-amber-700">El correo o la contraseña son incorrectos. Intenta con las credenciales de prueba.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold py-4 text-base transition-colors shadow-sm cursor-pointer border-none outline-none flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                "Acceder al Panel"
              )}
            </button>
          </form>

          {/* Tips / Info */}
          <div className="text-center space-y-2">
            <p className="text-hint text-xs">
              Credenciales de prueba: <strong className="text-secondary-text">admin@codalyste.com</strong> / <strong className="text-secondary-text">admin123</strong>
            </p>
            <p className="text-sm">
              <a 
                href="/track" 
                className="text-primary hover:underline font-bold text-sm"
              >
                Volver a Rastreo de Pedido
              </a>
            </p>
          </div>
        </div>
      </main>

      <div className="py-6 text-center shrink-0">
        <p className="text-secondary-text text-sm">
          © {new Date().getFullYear()} Codalyste. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
