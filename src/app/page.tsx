"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const router = useRouter();

  // Register the global opener for CTA buttons across Hero and Contact sections
  useEffect(() => {
    window.openProjectForm = () => {
      router.push("/form");
    };
    return () => {
      delete window.openProjectForm;
    };
  }, [router]);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <Hero />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
