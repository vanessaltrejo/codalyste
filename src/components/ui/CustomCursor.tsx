"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ocultar cursor por defecto en tarjetas de proyectos
    const style = document.createElement("style");
    style.innerHTML = `
      .cursor-none-all, .cursor-none-all * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    const textSpan = textRef.current;
    if (!cursor || !textSpan) return;
    
    // Almacenar coordenadas en variables simples (evita re-renderizados de React)
    let mouseX = -100;
    let mouseY = -100;
    
    // Variables para el suavizado (lerp)
    let currentX = -100;
    let currentY = -100;

    let isVisible = false;
    let isHoveringProject = false;
    let isHoveringButton = false;

    // Actualiza los estilos visuales directamente en el DOM
    const updateCursorVisuals = () => {
      // Limpiar clases de estados previos
      cursor.className = "hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] rounded-full items-center justify-center transition-all duration-300 ease-out";
      
      if (!isVisible) {
        cursor.classList.add("w-3", "h-3", "bg-primary", "opacity-0");
        textSpan.classList.add("hidden");
        return;
      }

      if (isHoveringProject) {
        cursor.classList.add(
          "w-28", "h-28", "bg-primary", "text-white", "text-[11px]",
          "font-bold", "font-sans", "uppercase", "tracking-widest",
          "opacity-100", "shadow-xl"
        );
        textSpan.classList.remove("hidden");
        textSpan.classList.add("animate-[fadeIn_0.3s_ease-out]");
      } else if (isHoveringButton) {
        cursor.classList.add(
          "w-12", "h-12", "bg-transparent", "border-[1.5px]",
          "border-primary", "opacity-100"
        );
        textSpan.classList.add("hidden");
      } else {
        cursor.classList.add("w-3", "h-3", "bg-primary", "opacity-80");
        textSpan.classList.add("hidden");
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        updateCursorVisuals();
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible = false;
      updateCursorVisuals();
    };

    const handleMouseEnterWindow = () => {
      isVisible = true;
      updateCursorVisuals();
    };

    const handleEnterProject = () => {
      isHoveringProject = true;
      updateCursorVisuals();
    };

    const handleLeaveProject = () => {
      isHoveringProject = false;
      updateCursorVisuals();
    };

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isProject = target.closest('.cursor-none-all');
      if (isProject) {
        if (isHoveringButton) {
          isHoveringButton = false;
          updateCursorVisuals();
        }
        return;
      }

      const isButton = target.closest('button, a, [role="button"], .cursor-pointer');
      const shouldHover = !!isButton;
      if (shouldHover !== isHoveringButton) {
        isHoveringButton = shouldHover;
        updateCursorVisuals();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseenter-project", handleEnterProject);
    window.addEventListener("mouseleave-project", handleLeaveProject);
    window.addEventListener("mouseover", handleGlobalMouseOver);

    // Estado inicial
    updateCursorVisuals();

    let animationFrameId: number;

    // Actualizador de posición acelerado por hardware
    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.28; // Suavizado ultra-rápido y responsivo
      currentY += (mouseY - currentY) * 0.28;
      
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      style.remove();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseenter-project", handleEnterProject);
      window.removeEventListener("mouseleave-project", handleLeaveProject);
      window.removeEventListener("mouseover", handleGlobalMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] rounded-full items-center justify-center transition-all duration-300 ease-out opacity-0"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        willChange: "transform, width, height, opacity, background-color, border-color",
        transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease-out, opacity 0.3s ease-out, border-color 0.3s ease-out",
      }}
    >
      <span ref={textRef} className="hidden text-center px-3 select-none leading-tight">
        Ver Proyecto
      </span>
    </div>
  );
}
