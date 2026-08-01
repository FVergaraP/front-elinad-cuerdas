#!/usr/bin/env node
// =================================================================
// Revisa que los archivos de contenido sean JSON válido ANTES de
// construir el sitio.
//
// Si alguien edita el archivo a mano en github.com y se come una coma
// o una comilla, el error que da Node es en inglés y críptico. Este
// script lo traduce, muestra la línea exacta y explica cómo se arregla.
//
// Se ejecuta solo, antes de `npm run build` (ver "prebuild").
// =================================================================

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ARCHIVOS = [
  ['src/data/page_data.json', 'Contenido de la página'],
  ['src/data/courses.json', 'Cursos y talleres'],
];

const raya = '═'.repeat(58);

/** Saca línea y columna del mensaje de error de Node, que varía según versión. */
function ubicar(mensaje, texto) {
  const conLineaCol = mensaje.match(/line (\d+) column (\d+)/i);
  if (conLineaCol) return { linea: +conLineaCol[1], columna: +conLineaCol[2] };

  const conPos = mensaje.match(/position (\d+)/i);
  if (conPos) {
    const pos = +conPos[1];
    const previo = texto.slice(0, pos).split('\n');
    return { linea: previo.length, columna: previo[previo.length - 1].length + 1 };
  }
  return null;
}

const PISTAS = [
  [/expected .*','|after array element|after property value/i,
   'Probablemente falta una coma (,) al final de la línea anterior, o sobra una coma antes de un } o ]'],
  [/double-quoted property name|expected property name/i,
   'Los nombres de las claves van entre comillas dobles: "titulo": "..."'],
  [/unexpected end|unterminated/i,
   'Parece que falta cerrar una comilla ("), una llave (}) o un corchete (])'],
  [/unexpected token/i,
   'Hay un carácter de más o de menos. Revisa las comillas, comas y llaves de esa línea'],
];

let huboError = false;

for (const [ruta, etiqueta] of ARCHIVOS) {
  const completa = join(process.cwd(), ruta);
  let texto;
  try {
    texto = readFileSync(completa, 'utf8');
  } catch {
    console.error(`\n❌ No se encontró el archivo ${ruta}\n`);
    huboError = true;
    continue;
  }

  try {
    JSON.parse(texto);
  } catch (err) {
    huboError = true;
    const msg = String(err.message);
    const donde = ubicar(msg, texto);
    const pista = PISTAS.find(([re]) => re.test(msg))?.[1];

    console.error(`\n${raya}`);
    console.error(`  ❌ Hay un error de escritura en "${etiqueta}"`);
    console.error(`${raya}\n`);
    console.error(`  Archivo: ${ruta}`);

    if (donde) {
      console.error(`  Línea:   ${donde.linea}\n`);
      const lineas = texto.split('\n');
      for (let i = donde.linea - 2; i <= donde.linea; i++) {
        if (i >= 1 && i <= lineas.length) {
          const marca = i === donde.linea ? '>' : ' ';
          console.error(`  ${marca} ${String(i).padStart(4)} | ${lineas[i - 1]}`);
        }
      }
      console.error(`  ${' '.repeat(7)} | ${' '.repeat(Math.max(0, donde.columna - 1))}^`);
    }

    if (pista) console.error(`\n  💡 ${pista}`);

    console.error(`\n  ℹ️  La página publicada NO cambió: sigue online la última`);
    console.error(`      versión correcta. Corrige esa línea y guarda de nuevo.`);
    console.error(`\n${raya}\n`);
  }
}

if (huboError) process.exit(1);
console.log('✓ Los archivos de contenido están bien escritos');
