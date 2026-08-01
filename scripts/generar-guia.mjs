#!/usr/bin/env node
// =================================================================
// GENERADOR DE CAPTURAS PARA LA GUÍA
//
// Recorre la página buscando los atributos `data-key` que marcan qué
// clave del JSON alimenta cada elemento, les dibuja encima un número,
// y guarda una captura por sección en docs/img/.
//
// Como los números salen del propio código, el diccionario de la guía
// no se puede desincronizar del sitio.
//
// USO (requiere el servidor de desarrollo corriendo y playwright):
//   npm run dev
//   node scripts/generar-guia.mjs
// =================================================================

import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const URL_BASE = process.env.URL_SITIO ?? 'http://localhost:4321/front-elinad-cuerdas';
const SALIDA = process.env.DIR_SALIDA ?? 'docs/img';

const SECCIONES = [
  { archivo: 'encabezado', titulo: 'Encabezado y menú', selector: '#site-header' },
  { archivo: 'portada', titulo: 'Portada', selector: '#inicio' },
  { archivo: 'cursos', titulo: 'Cursos y talleres', selector: '#cursos' },
  { archivo: 'horarios', titulo: 'Horarios', selector: '#horarios' },
  { archivo: 'sobre-mi', titulo: 'Sobre mí', selector: '#sobre-mi' },
  { archivo: 'testimonios', titulo: 'Testimonios', selector: '#testimonios' },
  { archivo: 'forma-de-ensenar', titulo: 'Mi forma de enseñar', selector: 'section[aria-label="Elinad en vivo"]' },
  { archivo: 'contacto', titulo: 'Hablemos', selector: '#contacto' },
  // `body > footer` y no `footer`: los testimonios llevan un <footer> interno.
  { archivo: 'pie-de-pagina', titulo: 'Pie de página', selector: 'body > footer' },
];

mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1280, height: 900 } });
await pagina.goto(URL_BASE, { waitUntil: 'networkidle' });

const indice = [];

for (const { archivo, titulo, selector } of SECCIONES) {
  const seccion = pagina.locator(selector).first();
  if ((await seccion.count()) === 0) {
    console.warn(`⚠️  No se encontró la sección "${titulo}" (${selector})`);
    continue;
  }

  const claves = await pagina.evaluate((sel) => {
    document.querySelectorAll('.marca-guia').forEach((n) => n.remove());

    const raiz = document.querySelector(sel);
    if (getComputedStyle(raiz).position === 'static') raiz.style.position = 'relative';
    const caja = raiz.getBoundingClientRect();
    const encontradas = [];

    raiz.querySelectorAll('[data-key]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;

      encontradas.push(el.dataset.key);
      const n = encontradas.length;

      // El número va a la IZQUIERDA del elemento para no taparlo, pero
      // sin salirse del recorte de la captura.
      const x = Math.max(16, r.left - caja.left - 16);
      const y = r.top - caja.top + 12;

      const marca = document.createElement('div');
      marca.className = 'marca-guia';
      marca.textContent = String(n);
      Object.assign(marca.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: '99999',
        background: '#e11d48',
        color: '#fff',
        font: '700 15px/26px system-ui, sans-serif',
        textAlign: 'center',
        width: '26px',
        height: '26px',
        borderRadius: '50%',
        boxShadow: '0 0 0 2px #fff, 0 2px 6px rgba(0,0,0,.5)',
        pointerEvents: 'none',
      });
      raiz.appendChild(marca);
    });

    return encontradas;
  }, selector);

  await seccion.scrollIntoViewIfNeeded();
  await pagina.waitForTimeout(200);
  await seccion.screenshot({ path: `${SALIDA}/${archivo}.png` });

  indice.push({ archivo, titulo, claves });
  console.log(`✓ ${titulo.padEnd(24)} ${claves.length} claves → ${SALIDA}/${archivo}.png`);
}

writeFileSync(`${SALIDA}/indice.json`, JSON.stringify(indice, null, 2));
console.log(`\n✓ Índice guardado en ${SALIDA}/indice.json`);

await navegador.close();
