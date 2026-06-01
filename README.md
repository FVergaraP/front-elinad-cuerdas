# Elinad Cuerdas — Sitio Web

Landing page para clases y talleres de guitarra. Construida con Astro y Tailwind CSS.

## Stack

- **Framework:** [Astro](https://astro.build) (SSG)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com)
- **Lenguaje:** TypeScript
- **Node:** ≥ 18

## Desarrollo local

```bash
npm install
npm run dev
```

El servidor de desarrollo queda en `http://localhost:4321`.

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build estático a `dist/` |
| `npm run preview` | Preview del build en local |
| `npm run check` | Type-check con `astro check` |

## Estructura del proyecto

```
src/
├── components/
│   ├── sections/        # Secciones de página (CoursesSection, etc.)
│   └── ui/              # Componentes reutilizables (CourseCard, ThemeSwitcher)
├── data/
│   └── courses.ts       # Datos de cursos — reemplazar por API en Fase 2
├── layouts/
│   └── BaseLayout.astro # Layout principal (SEO, header, footer)
├── lib/
│   └── themes.ts        # Definición de los 5 temas de color
├── pages/
│   └── index.astro      # Página principal
└── styles/
    ├── global.css        # Estilos globales y utilidades Tailwind
    └── themes.css        # Paletas de color vía CSS custom properties
```

## Sistema de temas

El sitio incluye 5 paletas de color intercambiables, seleccionables desde el navbar. La preferencia persiste en `localStorage`.

| ID | Nombre | Estilo |
|---|---|---|
| `warm` | Cálida | Madera de guitarra, dorados |
| `dark` | Elegante | Vino y negro |
| `light` | Fresca | Azul marino y blanco |
| `avant` | Vanguardista | Púrpura y dorado |
| `neon` | Futurista | Neón y negro |

## Datos y contenido

Los cursos se definen en [src/data/courses.ts](src/data/courses.ts). Cada curso tiene:

- Título, descripción, nivel y modalidad
- Precio en CLP
- `whatsappMessage` — mensaje pre-rellenado para el botón "Más información"
- `paymentUrl` — link directo al proveedor de pago (Mercado Pago)

Para actualizar cursos o precios en Fase 1: editar ese archivo directamente.  
Para Fase 2 (backend): reemplazar el array `courses` por una llamada a API sin cambiar los tipos.

## Variables a actualizar antes de publicar

| Archivo | Variable | Descripción |
|---|---|---|
| `src/data/courses.ts` | `WHATSAPP_NUMBER` | Número de WhatsApp real |
| `src/data/courses.ts` | `paymentUrl` por curso | Links de Mercado Pago reales |
| `src/layouts/BaseLayout.astro` | `site` en `astro.config.mjs` | Dominio de producción |
| `public/` | `og-image.jpg` | Imagen Open Graph |

## Roadmap

- **Fase 1 (actual):** Landing informativa con CTAs a WhatsApp y links de pago
- **Fase 2:** Backend con panel de administración — CRUD de cursos, disponibilidad y registro de alumnos
