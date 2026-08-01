# Elinad Bass — Sitio Web

Landing page para clases y talleres de bajo eléctrico, ukelele y música. Construida con Astro y Tailwind CSS.

> 📝 **¿Vienes a cambiar textos, precios, horarios o fotos?**
> No necesitas este README. Lee la **[Guía de edición](GUIA-EDICION.md)**.

## Stack

- **Framework:** [Astro](https://astro.build) (SSG)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com) v4
- **Lenguaje:** TypeScript
- **Node:** 22
- **Hosting:** GitHub Pages (deploy automático al hacer push a `main`)

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:4321/front-elinad-cuerdas` (ojo con el subdirectorio: el `base` está configurado para GitHub Pages).

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build estático a `dist/`. Valida el contenido antes de construir |
| `npm run preview` | Preview del build en local |
| `npm run validar` | Revisa solo que los JSON de contenido estén bien escritos |
| `npm run optimizar-imagenes` | Revisa el peso de las fotos de `public/images/`. Con `-- --aplicar` las optimiza |

## Estructura

```
src/
├── components/
│   ├── sections/            # CoursesSection, ScheduleSection
│   └── ui/                  # CourseCard, WhatsappButton, SocialIcon, switchers
├── data/
│   ├── page_data.json       # ← TODO el contenido de la página (edita el cliente)
│   ├── courses.json         # ← Los cursos (edita el cliente)
│   ├── content.ts           # Carga, valida y tipa los dos JSON
│   ├── courses.ts           # Contrato de datos de cursos — frontera para la Fase 2
│   └── seo.ts               # Metadatos técnicos ocultos al cliente
├── layouts/
│   └── BaseLayout.astro     # SEO, JSON-LD, header, footer
├── lib/
│   ├── url.ts               # withBase() / absoluteUrl() — manejo del subdirectorio
│   ├── whatsapp.ts          # Construcción de enlaces wa.me
│   ├── seo.ts               # JSON-LD derivado del contenido
│   ├── themes.ts            # 22 paletas de color
│   └── fonts.ts             # 4 tipografías
├── pages/
│   └── index.astro
└── styles/
public/images/               # Todas las fotos (el cliente puede subir aquí)
scripts/
├── validar-json.mjs         # Prebuild: sintaxis JSON con errores en español
└── generar-guia.mjs         # Regenera las capturas anotadas de la guía
.pages.yml                   # Esquema de formularios del editor visual
```

## Arquitectura de contenido

Todo el contenido vive en **dos archivos JSON** que el cliente edita desde [Pages CMS](https://app.pagescms.org) o desde la web de GitHub. Ningún `.astro` importa esos JSON directamente: todo pasa por `src/data/content.ts`, que valida y tipa.

### Reglas al modificar el contenido

1. **Toda clave de `page_data.json` y `courses.json` debe estar declarada en `.pages.yml`.**
   Pages CMS reescribe el archivo completo al guardar y elimina las claves que no conoce. Lo que el cliente no debe tocar va en `src/data/seo.ts`.

2. **Campos multilínea → `type: text` en `.pages.yml`** (nunca `string`), o se pierden los saltos de línea de las descripciones de cursos.

3. **Los enums (`nivel`, `modalidad`) están acoplados a los mapas de color** de `CourseCard.astro`. Las clases de Tailwind deben escribirse literalmente en esos mapas, nunca construidas desde el JSON, o el JIT no las incluye.

### Validación

- `scripts/validar-json.mjs` (prebuild) detecta errores de **sintaxis** y señala la línea exacta en español.
- `src/data/content.ts` valida la **semántica**: campos obligatorios, precios numéricos, enums válidos, imágenes existentes. Acumula todos los errores y los reporta juntos.

Si algo falla, el build se detiene, el deploy no corre y **GitHub Pages conserva la última versión buena**. Además se abre un Issue avisando al cliente.

## Regenerar las capturas de la guía

Las imágenes de `docs/img/` se generan a partir de los atributos `data-key` del propio markup, así que no se desincronizan del sitio.

```bash
npm run dev                      # en otra terminal
npm i -D playwright              # si no lo tienes
node scripts/generar-guia.mjs
```

## Sistema de temas

22 paletas intercambiables definidas en `src/lib/themes.ts` y `src/styles/themes.css`. El tema por defecto es `pro-v2` (azul marino y dorado). Los selectores de tema y tipografía existen pero están **ocultos** en `BaseLayout.astro` — se usaron para elegir la paleta con el cliente.

## Roadmap

- **Fase 1 (actual):** Landing informativa, contenido editable por el cliente vía CMS.
- **Fase 2:** Backend con panel de administración. La migración se limita a cambiar el cuerpo de `getCursos()` en `src/data/courses.ts` y quitar la entrada de cursos de `.pages.yml`; `page_data.json` no se toca.
