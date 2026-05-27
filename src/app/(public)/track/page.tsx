"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

// Definición de estado basada en nuestro modelo de Kanban
type OrderStatus = 'lead' | 'desarrollo' | 'pruebas' | 'entregado';

interface TrackedOrder {
  id: string;
  projectName: string;
  status: OrderStatus;
  progress: number;
  updatedAt: string;
}

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [orderData, setOrderData] = useState<TrackedOrder | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    const queryId = trackingId.trim().toUpperCase();
    
    // MOCK DATA: Si ingresa "COD-123", mostramos el estado de éxito. De lo contrario, error.
    if (queryId === "COD-123") {
      setSearchedId(queryId);
      setShowError(false);
      setOrderData({
        id: "COD-123",
        projectName: "Plataforma E-commerce Premium",
        status: "desarrollo",
        progress: 60,
        updatedAt: new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      return;
    }

    // Caso de error
    setOrderData(null);
    setIsShaking(true);
    setSearchedId(queryId);
    setShowError(true);

    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  const getStatusIndex = (status: OrderStatus) => {
    const statuses: OrderStatus[] = ['lead', 'desarrollo', 'pruebas', 'entregado'];
    return statuses.indexOf(status);
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

        <div className="max-w-3xl mx-auto w-full space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl leading-[1.1] font-sans font-bold">
              Rastrea tu <span className="text-primary">Pedido</span>
            </h1>
            <p className="text-secondary-text text-lg max-w-xl mx-auto">
              Mantente al tanto del progreso de tu desarrollo tecnológico. Ingresa el ID que te proporcionamos al iniciar tu proyecto.
            </p>
          </div>

          {/* Search Box */}
          <form 
            onSubmit={handleSearch} 
            className={`relative group w-full mx-auto max-w-xl transition-transform duration-300 ${isShaking ? "animate-shake" : ""}`}
          >
            <div className="bg-surface-2 border border-border text-foreground flex items-center w-full transition-all duration-300 focus-within:border-primary group hover:border-border-hover">
              <button 
                type="submit" 
                className="pl-6 bg-transparent border-none outline-none cursor-pointer text-secondary-text group-focus-within:text-primary transition-colors flex items-center justify-center p-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input 
                type="text" 
                placeholder="Ejemplo: COD-123"
                value={trackingId}
                onChange={(e) => {
                  setTrackingId(e.target.value);
                  if (showError) setShowError(false);
                }}
                className="bg-transparent w-full py-5 px-5 outline-none text-lg font-sans placeholder:text-placeholder text-foreground"
              />
            </div>
            <p className="text-hint text-sm text-center mt-4">
              Tip: Intenta buscar "COD-123" para ver un ejemplo.
            </p>
          </form>

          {/* Dynamic Area: Error or Timeline */}
          <div className={(orderData || showError) ? "min-h-[300px]" : "h-0 overflow-hidden"}>
            <AnimatePresence mode="wait">
              
              {/* Error Alert */}
              {showError && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200 p-6 md:p-8 flex items-start gap-4 text-left w-full shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <div className="space-y-5 flex-1">
                      <div className="space-y-1">
                        <span className="block text-lg font-times italic text-foreground font-bold">Búsqueda de Seguimiento</span>
                        <p className="text-secondary-text text-base leading-relaxed">
                          ¡Ups! No encontramos el código <strong className="text-primary font-bold">{searchedId}</strong>. Verifica que incluya letras y números, o contáctanos por WhatsApp para ayudarte de inmediato.
                        </p>
                      </div>
                      <div className="flex justify-start">
                        <a
                          href={`https://wa.me/528126001588?text=${encodeURIComponent(`Hola, tengo dudas con mi código de rastreo ${searchedId}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-whatsapp hover:bg-whatsapp-hover text-white px-8 py-3.5 font-bold text-base transition-all hover:scale-[1.02] shadow-sm flex items-center gap-2.5 whitespace-nowrap shrink-0 border-none outline-none text-center justify-center w-full sm:w-auto"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.475 1.332 4.988l-1.34 4.902 5.016-1.316c1.466.8 3.115 1.22 4.808 1.22 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 17.925c-1.554 0-3.078-.419-4.41-1.21l-.317-.188-3.279.86.875-3.203-.207-.33c-.868-1.385-1.326-2.993-1.326-4.664 0-4.929 4.01-8.939 8.939-8.939 4.929 0 8.939 4.01 8.939 8.939 0 4.929-4.01 8.939-8.939 8.939zm4.909-6.721c-.269-.134-1.59-.785-1.837-.875-.246-.089-.426-.134-.606.134-.18.269-.696.875-.853 1.054-.157.18-.314.202-.583.067-.269-.134-1.137-.419-2.167-1.337-.802-.716-1.344-1.602-1.501-1.871-.157-.269-.017-.414.118-.548.121-.121.269-.314.404-.471.134-.157.18-.269.269-.449.089-.18.045-.336-.022-.471-.067-.134-.606-1.459-.83-1.998-.218-.527-.459-.454-.63-.463-.163-.008-.348-.01-.533-.01s-.488.067-.743.342c-.255.275-.975.953-.975 2.327 0 1.374 1 2.701 1.137 2.88.137.18 1.968 3.006 4.767 4.213.666.287 1.187.458 1.59.587.67.213 1.28.183 1.762.111.537-.08 1.59-.65 1.815-1.246.224-.595.224-1.105.157-1.212-.067-.107-.246-.18-.515-.314z"/>
                          </svg>
                          <span>Asistencia en Línea</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Success View (Timeline) */}
              {orderData && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-surface-light border border-border-light p-8 md:p-12 space-y-12"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-secondary-text text-sm uppercase tracking-wider font-bold mb-2">Pedido: {orderData.id}</p>
                      <h2 className="text-2xl md:text-3xl font-sans font-bold text-foreground">
                        {orderData.projectName}
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-hint">Última actualización</p>
                      <p className="text-base text-foreground font-medium">{orderData.updatedAt}</p>
                    </div>
                  </div>

                  {/* Simple Timeline implementation */}
                  <div className="relative pt-8">
                    {/* Background Line */}
                    <div className="absolute top-10 left-0 w-full h-1 bg-surface-2 -z-10"></div>
                    {/* Progress Line */}
                    <div 
                      className="absolute top-10 left-0 h-1 bg-primary transition-all duration-1000 ease-out -z-10" 
                      style={{ width: `${orderData.progress}%` }}
                    ></div>

                    <div className="flex justify-between w-full relative">
                      {[
                        { key: 'lead', label: 'Requerimientos' },
                        { key: 'desarrollo', label: 'En Desarrollo' },
                        { key: 'pruebas', label: 'Fase de Pruebas' },
                        { key: 'entregado', label: 'Entregado' }
                      ].map((step, idx) => {
                        const currentIndex = getStatusIndex(orderData.status);
                        const isPast = idx < currentIndex;
                        const isCurrent = idx === currentIndex;
                        const isFuture = idx > currentIndex;

                        return (
                          <div key={step.key} className="flex flex-col items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-4 transition-colors duration-500 bg-background ${
                              isPast ? 'border-primary' : 
                              isCurrent ? 'border-primary ring-4 ring-primary/20' : 
                              'border-border'
                            }`} />
                            <span className={`text-sm md:text-base font-medium transition-colors ${
                              isFuture ? 'text-hint' : 'text-foreground font-bold'
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-border-light text-center">
                     <p className="text-secondary-text text-lg">
                       Progreso general del proyecto: <strong className="text-foreground">{orderData.progress}%</strong>
                     </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
