"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { ProjectFormModal } from "@/components/ui/ProjectFormModal";

export default function FormPage() {
  const router = useRouter();

  return (
    <>
      <Navbar 
        isFormActive={true} 
        onCloseForm={() => router.push("/")} 
      />
      <ProjectFormModal onClose={() => router.push("/")} />
    </>
  );
}
