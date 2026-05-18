"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { ProjectFormModal } from "@/components/ui/ProjectFormModal";

export default function Home() {
  const [isFormActive, setIsFormActive] = useState(false);

  // Register the global opener for CTA buttons across Hero and Contact sections
  useEffect(() => {
    window.openProjectForm = () => {
      setIsFormActive(true);
    };
    return () => {
      delete window.openProjectForm;
    };
  }, []);

  return (
    <>
      <Navbar 
        isFormActive={isFormActive} 
        onCloseForm={() => setIsFormActive(false)} 
      />
      {isFormActive ? (
        <ProjectFormModal onClose={() => setIsFormActive(false)} />
      ) : (
        <>
          <main className="flex-1 pt-20">
            <Hero />
            <Projects />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
