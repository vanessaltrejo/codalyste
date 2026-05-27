"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Registers a global `window.openProjectForm` function that navigates
 * to the /form route. This is a thin client-only wrapper so that the
 * main page can remain a Server Component for SSR / SEO benefits.
 */
export function FormOpener() {
  const router = useRouter();

  useEffect(() => {
    window.openProjectForm = () => {
      router.push("/form");
    };
    return () => {
      delete window.openProjectForm;
    };
  }, [router]);

  return null;
}
