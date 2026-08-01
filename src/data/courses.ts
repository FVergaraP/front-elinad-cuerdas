// =================================================================
// CONTRATO DE DATOS DE CURSOS
//
// Fase 1 (actual): los cursos se leen de `courses.json`, editable por
// el cliente desde Pages CMS.
//
// Fase 2 (futura): reemplazar el cuerpo de `getCursos()` por la
// llamada a la API. La FORMA del tipo `Curso` no debe cambiar entre
// fases — es la frontera que aísla la UI del origen de los datos.
// =================================================================

import { cursos } from './content';

export type { Curso, Nivel, Modalidad, Moneda } from './content';
export { NIVELES, MODALIDADES, MONEDAS } from './content';

export function getCursos() {
  return cursos;
}
