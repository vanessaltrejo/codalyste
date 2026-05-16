# Plan de Implementación: Codalyst (One-Page Site)

¡Hola Vanessa! Bienvenida al proyecto. Como tu mentor y desarrollador senior, he preparado este plan de trabajo para asegurarnos de que el código sea limpio, escalable y cumpla con todas las mejores prácticas de la industria.

Crearemos una aplicación web moderna que sea elegante y minimalista, utilizando tecnologías de vanguardia para asegurar un gran rendimiento y facilidad de mantenimiento.

## Preguntas Abiertas (User Review Required)

> [!IMPORTANT]
> **Necesito tu ayuda con lo siguiente antes de empezar a codificar:**
> 1. **Imágenes y Diseño:** Mencionaste que aún no tengo las fotos del diseño de Canva. Por favor, sube las capturas de pantalla de tu diseño en Canva para que pueda replicar exactamente la estructura, márgenes y distribución. También puedes subir los assets (la imagen de la compu, las de los proyectos destacados, etc.) cuando los tengas.
> 2. **Fuente Codec Pro:** "Codec Pro" es una fuente comercial (no está en Google Fonts). ¿Tienes los archivos de la fuente (`.woff2` o `.ttf`) para agregarlos al proyecto localmente? Si no, ¿te gustaría que usemos una alternativa gratuita y moderna como *Outfit*, *Plus Jakarta Sans* o *Montserrat* temporalmente?
> 3. **Textos Reales:** ¿Tienes el texto (copy) que llevará la página web o prefieres que utilice textos de relleno (Lorem Ipsum) por el momento?

## Stack Tecnológico Elegido

- **Framework:** Next.js (App Router) - El estándar actual de la industria para React, excelente para SEO y rendimiento.
- **Lenguaje:** TypeScript - Nos dará seguridad, autocompletado y evitará errores en tiempo de desarrollo. Sin usar `any`.
- **Estilos:** Tailwind CSS - Perfecto para mantener el diseño consistente, minimalista y escalar sin crear archivos CSS masivos.
- **Animaciones:** Framer Motion - Para lograr exactamente esa animación que mencionas (un "reveal" o deslizamiento hacia arriba, donde el texto aparece recortado desde abajo hacia arriba sin que se vea un *fade* tradicional, utilizando `overflow: hidden`).

## Arquitectura Limpia Propuesta

La estructura del proyecto estará preparada para escalar y conectar una base de datos a futuro.

```text
src/
├── app/                  # Rutas de Next.js (App Router)
│   ├── layout.tsx        # Estructura principal, fuentes y metadata
│   └── page.tsx          # La One-Page que contendrá todas las secciones
├── components/           # Componentes reutilizables (PascalCase)
│   ├── ui/               # Componentes pequeños: Button, Typography, Card
│   ├── layout/           # Header, Footer, Navigation
│   └── sections/         # Hero, About, Projects, Contact (Bloques de la página)
├── data/                 # Dummy data (mockups para futura BD)
│   └── mockData.ts       # Datos de proyectos y configuración
├── types/                # Interfaces y tipos de TypeScript
│   └── index.ts          # Para asegurar que todo esté fuertemente tipado
└── utils/                # Funciones de ayuda
```

## Cambios Propuestos y Flujo de Trabajo

### Paso 1: Inicialización del Proyecto
Ejecutaré el comando de Next.js para crear la base del proyecto en tu directorio local (`codalyste`).
- Configuración estricta de TypeScript.
- Configuración de Tailwind CSS y variables de diseño (colores, fuentes).
- Configuración de fuentes: *DM Serif Display*, *Times New Roman* y *Codec Pro* (o su alternativa).

### Paso 2: Creación de "Design Tokens" (Tailwind Config)
Configuraremos el archivo `tailwind.config.ts` para que incluya tus colores específicos, configuraciones tipográficas y utilidades de animación personalizadas.

### Paso 3: Componentes y Estructura Base
Crearé los componentes fundamentales reutilizables (UI) y configuraré el layout global.
- Crear componente para el texto animado (Reveal Text).
- Crear las secciones vacías en `page.tsx`.

### Paso 4: Implementación de Secciones (One-Page)
Iremos construyendo cada sección de la página basada en el diseño de Canva.
- **Hero Section:** Con el mensaje claro y elegante, título en DM Serif Display y la imagen de la computadora.
- **Proyectos Destacados:** Listado de los proyectos simulando datos que a futuro vendrán de una base de datos.
- **Animaciones:** Integrar Framer Motion para asegurar esas entradas sutiles y elegantes a medida que se hace scroll.

## Plan de Verificación

### Verificación Automatizada
- Comprobaré que el proyecto compile correctamente (`npm run build`).
- Revisaré que TypeScript no lance ninguna advertencia de tipado o `any` implícitos.

### Verificación Manual
- Te pediré que inicies el servidor de desarrollo (`npm run dev`) para que veas el resultado en tu navegador (`localhost:3000`).
- Validaremos juntas que los colores, fuentes y sobre todo las animaciones ("reveal") se comporten exactamente como lo imaginaste.

---

**¿Estás de acuerdo con este enfoque? Por favor, responde a las preguntas abiertas para poder empezar con la configuración inicial de tu proyecto.**
