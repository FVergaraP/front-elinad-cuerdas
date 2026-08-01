#!/usr/bin/env node
// =================================================================
// OPTIMIZADOR DE IMÁGENES
//
// Reduce el peso de las fotos de public/images/ SIN pérdida visible,
// recortando solo los píxeles que el navegador nunca llega a usar.
//
// El criterio: una imagen solo necesita el DOBLE de ancho del que se
// muestra en pantalla (para verse nítida en pantallas retina). Todo lo
// que sobre de ahí es peso que el visitante descarga y nunca ve.
//
// USO:
//   node scripts/optimizar-imagenes.mjs                 # revisa y avisa
//   node scripts/optimizar-imagenes.mjs --aplicar       # optimiza
//
// Úsalo cada vez que se suban fotos nuevas al sitio.
// =================================================================

import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const DIR = join(process.cwd(), 'public', 'images');
const APLICAR = process.argv.includes('--aplicar');

// Ancho máximo útil por imagen = 2x el tamaño en que se muestra.
// Si subes una foto con otro nombre, cae en POR_DEFECTO.
const ANCHOS = {
  'hero-guitarra': 2560, // portada: se muestra a 1280 de ancho
  'en-vivo': 2560, // franja "Mi forma de enseñar": 1280
  'retrato3': 1200, // "Sobre mí": se muestra a 424
  'retrato': 1200,
  'retrato2': 1200,
  'kofi': 400, // tarjeta Ko-fi: se muestra a 80x80
  'kofi2': 400,
};
const POR_DEFECTO = 1600;
const CALIDAD = 75;

const kb = (n) => Math.round(n / 1024);
const archivos = readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

let totalAntes = 0;
let totalDespues = 0;
let cambios = 0;

console.log(APLICAR ? 'Optimizando imágenes…\n' : 'Revisando imágenes (nada se modifica)…\n');

for (const archivo of archivos) {
  const ruta = join(DIR, archivo);
  const nombre = basename(archivo, extname(archivo));
  const anchoMax = ANCHOS[nombre] ?? POR_DEFECTO;

  const pesoAntes = statSync(ruta).size;
  const meta = await sharp(ruta).metadata();

  const destino = join(DIR, `${nombre}.jpg`);
  const temporal = join(DIR, `.tmp-${nombre}.jpg`);

  const buffer = await sharp(ruta)
    .resize({ width: anchoMax, withoutEnlargement: true })
    .jpeg({ quality: CALIDAD, mozjpeg: true })
    .toBuffer();

  totalAntes += pesoAntes;

  // Solo se toca si el ahorro es relevante (>15%). Recomprimir un JPEG
  // por una ganancia mínima degrada la imagen sin beneficio real.
  if (buffer.length >= pesoAntes * 0.85) {
    totalDespues += pesoAntes;
    console.log(`  ○ ${archivo.padEnd(24)} ${String(kb(pesoAntes)).padStart(5)} KB  ya está optimizada`);
    continue;
  }

  totalDespues += buffer.length;
  cambios++;
  const anchoFinal = Math.min(meta.width, anchoMax);
  console.log(
    `  ${APLICAR ? '✓' : '→'} ${archivo.padEnd(24)} ${String(kb(pesoAntes)).padStart(5)} KB → ` +
      `${String(kb(buffer.length)).padStart(5)} KB   (${meta.width}px → ${anchoFinal}px de ancho)`
  );

  if (APLICAR) {
    await sharp(buffer).toFile(temporal);
    renameSync(temporal, destino);
    // Si venía en PNG, el original sobra: ahora existe la versión .jpg
    if (extname(archivo).toLowerCase() === '.png') {
      console.log(`     ⚠️  ${archivo} quedó reemplazada por ${nombre}.jpg — actualiza el nombre en el contenido`);
    }
  }
}

console.log(
  `\nTotal: ${kb(totalAntes)} KB → ${kb(totalDespues)} KB ` +
    `(${Math.round((1 - totalDespues / totalAntes) * 100)}% menos)`
);

if (!APLICAR && cambios > 0) {
  console.log(`\nPara aplicarlo:  node scripts/optimizar-imagenes.mjs --aplicar`);
}
