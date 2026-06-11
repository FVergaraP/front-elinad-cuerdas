# Changelog

Todos los cambios notables de este proyecto se documentan aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).  
Versionado según [Semantic Versioning](https://semver.org/lang/es/).

---

## [0.5.0] — 2026-06-11

### Added

- Botón **Ko-fi** en la sección de contacto (CTA secundario bajo el botón de WhatsApp) con ícono oficial y color de marca `#FF5E5B`
- Ícono de Ko-fi en el **navbar desktop**, **menú mobile** y **footer**, al lado de TikTok — hover en rojo Ko-fi
- Links de Ko-fi marcados como `PENDIENTE` a la espera del usuario del cliente

### Changed

- Badge del hero: `Clases de Bajo y Ukelele · Santiago, Chile` → `Profesor de Música · Bajista Profesional · Santiago, Chile`
- Título principal: `Aprende bajo y ukelele con pasión` → `Aprende bajo, ukelele y más con Elinad Bass`
- Descripción del hero actualizada: énfasis en 10 años de experiencia y oferta ampliada (guitarra, teoría musical, composición)
- Subtítulo de la sección de cursos actualizado para reflejar modalidad principalmente online
- Cursos redefinidos: se eliminaron `Bajo desde Cero`, `Bajo Intermedio` y `Clases Individuales`; se reemplazaron por `Taller de Ukelele` (presencial grupal, San Miguel), `Clases de Ukelele Personalizadas`, `Clases de Música Personalizadas` y `Composición y Songwriting`
- Botón **Inscribirse** eliminado de las cards de cursos — queda solo el botón **Más información** (WhatsApp), ancho completo

---

## [0.4.0] — 2026-06-04

### Added

- Paleta de color **Profesional** (`pro`): fondo blanco, gris muy claro `#F8FAFC`, azul marino `#1E293B` y dorado suave `#D4A373`
- Sistema de **4 tipografías** intercambiables: Inter, Montserrat, Poppins, Lato — persistidas en `localStorage`
- Componente `FontSwitcher.astro` en el navbar, al lado del ThemeSwitcher
- `src/lib/fonts.ts` con definición tipada de las fuentes disponibles
- Carga de todas las fuentes en un solo request a Google Fonts (sin FOUT al cambiar)
- Script anti-flash que aplica tema Y fuente antes del primer paint

### Changed

- `deploy.yml` ahora ejecuta el build también en Pull Requests (`pull_request: branches: [main]`), pero solo despliega desde `main` — permite validar el build en PRs antes de mergear
- `concurrency.group` diferenciado por rama (`pages-${{ github.ref }}`) para que PRs no cancelen el deploy de main

---

## [0.3.0] — 2026-06-01

### Changed

- Migrado de `@astrojs/tailwind` + Tailwind CSS v3 a `@tailwindcss/vite` + Tailwind CSS v4, compatible con Astro 6
- `astro.config.mjs` actualizado para usar el plugin Vite en lugar de la integración de Astro
- `src/styles/global.css` reescrito con `@utility` (API de Tailwind v4) para mantener el sistema de 5 temas dinámicos via CSS custom properties
- Eliminado `tailwind.config.mjs` (reemplazado por `@theme` en el CSS)

### Fixed

- Error de CI en GitHub Actions: `npm ci` fallaba por incompatibilidad de peer deps entre `@astrojs/tailwind@6` y `astro@6`

---

## [0.2.0] — 2026-06-01

### Added

- GitHub Actions workflow `.github/workflows/deploy.yml` para deploy automático a GitHub Pages en cada push a `main`
- `base: '/front-elinad-cuerdas'` en `astro.config.mjs` para que los assets resuelvan correctamente bajo el subpath de GitHub Pages

### Changed

- `site` en `astro.config.mjs` actualizado a `https://fvergarap.github.io` (URL de GitHub Pages)

---

## [0.1.0] — 2026-06-01

### Added

- Proyecto Astro + Tailwind CSS inicializado desde cero
- Layout principal `BaseLayout.astro` con navbar sticky, menú mobile y footer
- Sistema de 5 temas de color intercambiables (`warm`, `dark`, `light`, `avant`, `neon`) con persistencia en `localStorage`
- Componente `ThemeSwitcher.astro` en el navbar
- Archivo de datos `src/data/courses.ts` con 5 cursos/talleres mockeados y tipado TypeScript (contrato de datos Fase 1 → Fase 2)
- Componente `CourseCard.astro` con badges de nivel/modalidad, precio formateado en CLP, y dos CTAs:
  - **Inscribirse** → link de pago (Mercado Pago)
  - **Más información** → WhatsApp con mensaje pre-rellenado por curso
- Sección `CoursesSection.astro` con grid responsive (1 → 2 → 3 columnas)
- Página `index.astro` con las secciones: Hero, Cursos & Talleres, Sobre mí, Testimonios, Contacto/CTA
- SEO básico: meta tags, Open Graph, Twitter Card y canonical URL
- Favicon SVG
- Corrección de especificidad CSS: se eliminó el bloque `:root` que impedía el cambio de tema

[0.5.0]: https://github.com/fjvergarap/front-elinad-cuerdas/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/fjvergarap/front-elinad-cuerdas/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/fjvergarap/front-elinad-cuerdas/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/fjvergarap/front-elinad-cuerdas/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/fjvergarap/front-elinad-cuerdas/releases/tag/v0.1.0
