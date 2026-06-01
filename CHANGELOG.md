# Changelog

Todos los cambios notables de este proyecto se documentan aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).  
Versionado según [Semantic Versioning](https://semver.org/lang/es/).

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

[0.1.0]: https://github.com/fjvergarap/front-elinad-cuerdas/releases/tag/v0.1.0
