import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codalyste",
  description: "Soluciones web a la medida. Presencia y operaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSerifDisplay.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-sans relative">
        {/* Mesh Grid de Fondo Global para evitar espacio blanco en overscroll */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-[-1]" />
        
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
