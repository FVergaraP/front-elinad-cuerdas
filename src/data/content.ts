// =================================================================
// CARGA Y VALIDACIÓN DEL CONTENIDO
//
// Único módulo que importa los .json. Ningún .astro debe importarlos
// directamente.
//
// Si el cliente deja un campo vacío, escribe un precio con puntos o
// borra una imagen, el build FALLA con un mensaje en español que dice
// exactamente qué arreglar. Y como el deploy depende del build, la
// página publicada no se rompe: sigue online la última versión buena.
// =================================================================

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import datos from './page_data.json';
import cursosRaw from './courses.json';

// Este módulo se empaqueta, así que `import.meta.url` no sirve para
// ubicar `public/`. Tanto `astro dev` como `astro build` corren desde
// la raíz del proyecto, así que partimos de ahí.
const DIR_PUBLIC = join(process.cwd(), 'public');
const PUEDE_VERIFICAR_ARCHIVOS = existsSync(DIR_PUBLIC);

const errores: string[] = [];
const anotar = (ruta: string, mensaje: string) => errores.push(`${ruta} → ${mensaje}`);

const leer = (obj: unknown, ruta: string): unknown =>
  ruta.split('.').reduce<any>((o, k) => o?.[k], obj);

// ---------- validadores ----------

function texto(obj: unknown, ruta: string, etiqueta = ruta): string {
  const v = leer(obj, ruta);
  if (v === undefined || v === null) {
    anotar(etiqueta, 'falta esta información. Agrégala y vuelve a guardar.');
    return '';
  }
  if (typeof v !== 'string') {
    anotar(etiqueta, `debe ser texto, pero llegó un ${typeof v}.`);
    return '';
  }
  if (v.trim() === '') {
    anotar(etiqueta, 'está vacío. Escribe algo o avisa a quien mantiene el sitio.');
    return '';
  }
  return v;
}

function numero(obj: unknown, ruta: string, etiqueta = ruta): number {
  const v = leer(obj, ruta);
  if (typeof v !== 'number' || Number.isNaN(v)) {
    anotar(
      etiqueta,
      `debe ser un número sin puntos, comas ni símbolos. Ejemplo correcto: 35000. ` +
        `Valor recibido: ${JSON.stringify(v)}`
    );
    return 0;
  }
  return v;
}

function booleano(obj: unknown, ruta: string, etiqueta = ruta): boolean {
  const v = leer(obj, ruta);
  if (typeof v !== 'boolean') {
    anotar(etiqueta, `debe ser verdadero o falso (true / false). Valor recibido: ${JSON.stringify(v)}`);
    return false;
  }
  return v;
}

function opcion<T extends string>(obj: unknown, ruta: string, permitidos: readonly T[], etiqueta = ruta): T {
  const v = leer(obj, ruta);
  if (typeof v !== 'string' || !permitidos.includes(v as T)) {
    anotar(
      etiqueta,
      `solo acepta uno de estos valores exactos: ${permitidos.map((p) => `"${p}"`).join(', ')}. ` +
        `Valor recibido: ${JSON.stringify(v)}`
    );
    return permitidos[0];
  }
  return v as T;
}

function lista<T>(obj: unknown, ruta: string, fn: (item: unknown, i: number) => T, etiqueta = ruta): T[] {
  const v = leer(obj, ruta);
  if (!Array.isArray(v)) {
    anotar(etiqueta, `debe ser una lista. Valor recibido: ${JSON.stringify(v)}`);
    return [];
  }
  if (v.length === 0) anotar(etiqueta, 'la lista está vacía. Agrega al menos un elemento.');
  return v.map(fn);
}

function listaDeTextos(obj: unknown, ruta: string, etiqueta = ruta): string[] {
  return lista(obj, ruta, (item, i) => texto({ x: item }, 'x', `${etiqueta}[${i + 1}]`), etiqueta);
}

/** Valida una ruta de imagen: formato, caracteres seguros y existencia real del archivo. */
function imagen(obj: unknown, ruta: string, etiqueta = ruta): string {
  const v = texto(obj, ruta, etiqueta);
  if (!v) return '';
  if (!v.startsWith('/images/')) {
    anotar(
      etiqueta,
      `la ruta debe empezar con "/images/". Valor recibido: "${v}". ` +
        `Vuelve a elegir la imagen desde el editor.`
    );
  } else if (/[\s]/.test(v)) {
    anotar(
      etiqueta,
      `el nombre del archivo "${v}" tiene espacios. Renómbralo (ej: "foto-elinad.jpg") y súbelo de nuevo.`
    );
  } else if (PUEDE_VERIFICAR_ARCHIVOS && !existsSync(join(DIR_PUBLIC, v))) {
    anotar(
      etiqueta,
      `la imagen "${v}" no existe en el repositorio. ¿La borraste o le cambiaste el nombre?`
    );
  }
  return v;
}

function urlValida(obj: unknown, ruta: string, etiqueta = ruta): string {
  const v = texto(obj, ruta, etiqueta);
  if (v && !/^https?:\/\//.test(v)) {
    anotar(etiqueta, `debe ser un enlace completo que empiece con https:// . Valor recibido: "${v}"`);
  }
  return v;
}

// ---------- tipos ----------

export const NIVELES = ['Principiante', 'Intermedio', 'Avanzado', 'Todos los niveles'] as const;
export const MODALIDADES = ['Presencial', 'Online', 'Híbrido'] as const;
export const MONEDAS = ['CLP', 'USD'] as const;

export type Nivel = (typeof NIVELES)[number];
export type Modalidad = (typeof MODALIDADES)[number];
export type Moneda = (typeof MONEDAS)[number];

export interface Curso {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: Nivel;
  modalidad: Modalidad;
  duracion: string;
  frecuencia: string;
  precio: number;
  moneda: Moneda;
  sufijoPrecio: string;
  destacado: boolean;
  etiquetas: string[];
  mensajeWhatsapp: string;
}

// ---------- construcción validada ----------

export const cursos: Curso[] = lista(
  { c: cursosRaw },
  'c',
  (item, i) => {
    const n = `cursos[${i + 1}]`;
    return {
      id: texto(item, 'id', `${n}.id`),
      titulo: texto(item, 'titulo', `${n}.titulo`),
      descripcion: texto(item, 'descripcion', `${n}.descripcion`),
      nivel: opcion(item, 'nivel', NIVELES, `${n}.nivel`),
      modalidad: opcion(item, 'modalidad', MODALIDADES, `${n}.modalidad`),
      duracion: texto(item, 'duracion', `${n}.duracion`),
      frecuencia: texto(item, 'frecuencia', `${n}.frecuencia`),
      precio: numero(item, 'precio', `${n}.precio`),
      moneda: opcion(item, 'moneda', MONEDAS, `${n}.moneda`),
      sufijoPrecio: texto(item, 'sufijo_precio', `${n}.sufijo_precio`),
      destacado: booleano(item, 'destacado', `${n}.destacado`),
      etiquetas: listaDeTextos(item, 'etiquetas', `${n}.etiquetas`),
      mensajeWhatsapp: texto(item, 'mensaje_whatsapp', `${n}.mensaje_whatsapp`),
    };
  },
  'cursos'
);

// Los id deben ser únicos: si el cliente duplica un curso, se repiten.
const idsVistos = new Set<string>();
for (const c of cursos) {
  if (c.id && idsVistos.has(c.id)) {
    anotar(
      `cursos → id "${c.id}"`,
      'está repetido en dos cursos. Cada curso necesita un identificador distinto.'
    );
  }
  idsVistos.add(c.id);
}

const seccion = (ruta: string) => ({
  preTitulo: texto(datos, `${ruta}.pre_titulo`),
  titulo: texto(datos, `${ruta}.titulo`),
});

export const contenido = {
  negocio: {
    nombre: texto(datos, 'negocio.nombre'),
    emojiLogo: texto(datos, 'negocio.emoji_logo'),
    ciudad: texto(datos, 'negocio.ciudad'),
    descripcionPieDePagina: texto(datos, 'negocio.descripcion_pie_de_pagina'),
  },
  seo: {
    tituloPestana: texto(datos, 'seo.titulo_pestana'),
    descripcionBuscadores: texto(datos, 'seo.descripcion_buscadores'),
    descripcionNegocio: texto(datos, 'seo.descripcion_negocio'),
    profesion: texto(datos, 'seo.profesion'),
    imagenAlCompartir: imagen(datos, 'seo.imagen_al_compartir'),
  },
  contacto: {
    whatsappNumero: texto(datos, 'contacto.whatsapp_numero'),
    whatsappLinkPerfil: urlValida(datos, 'contacto.whatsapp_link_perfil'),
    botonMenu: texto(datos, 'contacto.boton_menu'),
  },
  redes: lista(
    datos,
    'redes',
    (item, i) => ({
      nombre: texto(item, 'nombre', `redes[${i + 1}].nombre`),
      url: urlValida(item, 'url', `redes[${i + 1}].url`),
      icono: opcion(item, 'icono', ['instagram', 'tiktok', 'kofi'] as const, `redes[${i + 1}].icono`),
    }),
    'redes'
  ),
  menu: lista(
    datos,
    'menu',
    (item, i) => ({
      texto: texto(item, 'texto', `menu[${i + 1}].texto`),
      ancla: texto(item, 'ancla', `menu[${i + 1}].ancla`),
    }),
    'menu'
  ),
  portada: {
    ...seccion('portada'),
    descripcion: texto(datos, 'portada.descripcion'),
    botonVerCursos: texto(datos, 'portada.boton_ver_cursos'),
    botonWhatsapp: texto(datos, 'portada.boton_whatsapp'),
    mensajeWhatsapp: texto(datos, 'portada.mensaje_whatsapp'),
    imagenFondo: imagen(datos, 'portada.imagen_fondo'),
    estadisticas: lista(
      datos,
      'portada.estadisticas',
      (item, i) => ({
        numero: texto(item, 'numero', `portada.estadisticas[${i + 1}].numero`),
        etiqueta: texto(item, 'etiqueta', `portada.estadisticas[${i + 1}].etiqueta`),
      }),
      'portada.estadisticas'
    ),
  },
  cursosSeccion: {
    ...seccion('cursos_seccion'),
    bajada: texto(datos, 'cursos_seccion.bajada'),
    tarjetaKofi: {
      titulo: texto(datos, 'cursos_seccion.tarjeta_kofi.titulo'),
      texto: texto(datos, 'cursos_seccion.tarjeta_kofi.texto'),
      imagen: imagen(datos, 'cursos_seccion.tarjeta_kofi.imagen'),
      imagenDescripcion: texto(datos, 'cursos_seccion.tarjeta_kofi.imagen_descripcion'),
      boton: texto(datos, 'cursos_seccion.tarjeta_kofi.boton'),
    },
    textoFinal: texto(datos, 'cursos_seccion.texto_final'),
    botonFinal: texto(datos, 'cursos_seccion.boton_final'),
  },
  horarios: {
    ...seccion('horarios'),
    bajada: texto(datos, 'horarios.bajada'),
    botonWhatsapp: texto(datos, 'horarios.boton_whatsapp'),
    mensajeWhatsapp: texto(datos, 'horarios.mensaje_whatsapp'),
    dias: lista(
      datos,
      'horarios.dias',
      (item, i) => ({
        dia: texto(item, 'dia', `horarios.dias[${i + 1}].dia`),
        horas: listaDeTextos(item, 'horas', `horarios.dias[${i + 1}].horas`),
        disponible: booleano(item, 'disponible', `horarios.dias[${i + 1}].disponible`),
      }),
      'horarios.dias'
    ),
  },
  sobreMi: {
    ...seccion('sobre_mi'),
    parrafos: listaDeTextos(datos, 'sobre_mi.parrafos'),
    boton: texto(datos, 'sobre_mi.boton'),
    mensajeWhatsapp: texto(datos, 'sobre_mi.mensaje_whatsapp'),
    imagen: imagen(datos, 'sobre_mi.imagen'),
    imagenDescripcion: texto(datos, 'sobre_mi.imagen_descripcion'),
  },
  testimonios: {
    ...seccion('testimonios'),
    listado: lista(
      datos,
      'testimonios.listado',
      (item, i) => ({
        nombre: texto(item, 'nombre', `testimonios.listado[${i + 1}].nombre`),
        rol: texto(item, 'rol', `testimonios.listado[${i + 1}].rol`),
        comentario: texto(item, 'comentario', `testimonios.listado[${i + 1}].comentario`),
      }),
      'testimonios.listado'
    ),
  },
  formaDeEnsenar: {
    ...seccion('forma_de_ensenar'),
    parrafos: listaDeTextos(datos, 'forma_de_ensenar.parrafos'),
    boton: texto(datos, 'forma_de_ensenar.boton'),
    imagen: imagen(datos, 'forma_de_ensenar.imagen'),
    imagenDescripcion: texto(datos, 'forma_de_ensenar.imagen_descripcion'),
  },
  contactoFinal: {
    ...seccion('contacto_final'),
    descripcion: texto(datos, 'contacto_final.descripcion'),
    botonWhatsapp: texto(datos, 'contacto_final.boton_whatsapp'),
    mensajeWhatsapp: texto(datos, 'contacto_final.mensaje_whatsapp'),
    nota: texto(datos, 'contacto_final.nota'),
    cajaKofi: {
      texto: texto(datos, 'contacto_final.caja_kofi.texto'),
      boton: texto(datos, 'contacto_final.caja_kofi.boton'),
    },
  },
};

// ---------- informe final ----------

if (errores.length > 0) {
  throw new Error(
    '\n\n' +
      '══════════════════════════════════════════════════════════\n' +
      `  ❌ Hay ${errores.length} problema(s) en el contenido del sitio\n` +
      '══════════════════════════════════════════════════════════\n\n' +
      errores.map((e, i) => `  ${i + 1}. ${e}`).join('\n\n') +
      '\n\n' +
      '  ℹ️  La página publicada NO cambió: sigue online la última\n' +
      '      versión correcta. Corrige estos puntos y guarda de nuevo.\n\n' +
      '══════════════════════════════════════════════════════════\n'
  );
}
