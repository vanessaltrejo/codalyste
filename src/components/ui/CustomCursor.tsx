"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor globally on project cards
    const style = document.createElement("style");
    style.innerHTML = `
      .cursor-none-all, .cursor-none-all * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    
    // Store latest mouse coordinates in refs to avoid React state re-renders
    let mouseX = -100;
    let mouseY = -100;
    
    // Lerp variables for smooth trailing effect without visual lag
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleEnterProject = () => {
      setIsHoveringProject(true);
    };

    const handleLeaveProject = () => {
      setIsHoveringProject(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseenter-project", handleEnterProject);
    window.addEventListener("mouseleave-project", handleLeaveProject);

    let animationFrameId: number;

    // Use requestAnimationFrame for hardware-accelerated 60/120Hz rendering
    const updateCursor = () => {
      if (cursor) {
        // Smooth interpolation (lerp): current = current + (target - current) * ease
        currentX += (mouseX - currentX) * 0.25;
        currentY += (mouseY - currentY) * 0.25;
        
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      style.remove();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseenter-project", handleEnterProject);
      window.removeEventListener("mouseleave-project", handleLeaveProject);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`hidden md:flex fixed top-0 left-0 pointer-events-none z-[9999] rounded-full items-center justify-center transition-all duration-300 ease-out ${
        isHoveringProject
          ? "w-28 h-28 bg-primary text-white text-[11px] font-bold font-sans uppercase tracking-widest opacity-100 shadow-xl"
          : "w-3 h-3 bg-primary opacity-80"
      }`}
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        willChange: "transform",
        transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease-out, opacity 0.3s ease-out",
      }}
    >
      {isHoveringProject && (
        <span className="animate-[fadeIn_0.3s_ease-out] text-center px-3 select-none leading-tight">
          Ver Proyecto
        </span>
      )}
    </div>
  );
}
