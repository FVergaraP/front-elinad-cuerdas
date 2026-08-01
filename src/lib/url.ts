// =================================================================
// RUTAS — el sitio se publica bajo un subdirectorio en GitHub Pages
// (`base: '/front-elinad-cuerdas'`), así que toda ruta interna debe
// llevar ese prefijo. Estos helpers lo aplican en un solo lugar.
// =================================================================

// `import.meta.env.BASE_URL` puede venir con o sin slash final según
// la config de `trailingSlash`; normalizamos quitándolo.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ''); // '' cuando base === '/'

// http:, https:, mailto:, tel:, data:, //cdn.com, #ancla, ?query
const ES_EXTERNA = /^(?:[a-z][a-z0-9+.\-]*:|\/\/|#|\?)/i;

/** Prefija el `base` del sitio a una ruta interna. Idempotente. */
export function withBase(ruta: string): string {
  if (!ruta) return '';
  if (ES_EXTERNA.test(ruta)) return ruta;
  if (BASE && (ruta === BASE || ruta.startsWith(`${BASE}/`))) return ruta;
  return `${BASE}/${ruta.replace(/^\/+/, '')}`;
}

/** URL absoluta con dominio — para og:image, canonical y @id de schema.org. */
export function absoluteUrl(ruta: string, site: URL | undefined): string {
  return new URL(withBase(ruta), site).href;
}
