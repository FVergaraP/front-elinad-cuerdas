// =================================================================
// CONTRATO DE DATOS — Fase 1: datos mockeados
// Fase 2: reemplazar `courses` por llamada a API/DB.
// La forma de los tipos NO debe cambiar entre fases.
// =================================================================

export type CourseLevel = 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
export type CourseModality = 'Presencial' | 'Online' | 'Híbrido';

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  level: CourseLevel;
  modality: CourseModality;
  duration: string;        // ej: "8 semanas", "1 hora/clase"
  sessions: string;        // ej: "4 clases al mes"
  price: number;
  currency: 'CLP' | 'USD';
  imageAlt: string;
  featured: boolean;
  tags: string[];
  // CTAs
  whatsappMessage: string; // mensaje pre-rellenado (referencia interna)
  paymentUrl: string;      // link directo de Mercado Pago u otro proveedor
}

export const WHATSAPP_NUMBER = '56965017566';
export const WHATSAPP_BUSINESS_URL = 'https://wa.me/message/73YGTSCY67ZWP1';

export function buildWhatsappUrl(_message: string): string {
  return WHATSAPP_BUSINESS_URL;
}

export const courses: Course[] = [
  {
    id: 'clases-bajo-electrico',
    slug: 'bajo-electrico',
    title: 'Clases de Bajo Eléctrico',
    shortDescription:
      'Desde nivel inicial hasta avanzado. Desarrolla técnica, groove, lectura musical, escalas, arpegios, improvisación, slap, walking bass y comprensión armónica. Cada clase se adapta a tus objetivos, gustos musicales y nivel de experiencia.\n\nLas clases se realizan preferentemente en modalidad online. La modalidad presencial está sujeta a disponibilidad de horarios y contempla un cargo adicional por traslado y reserva exclusiva del horario.',
    longDescription:
      'Desde nivel inicial hasta avanzado. Desarrolla técnica, groove, lectura musical, escalas, arpegios, improvisación, slap, walking bass y comprensión armónica. Cada clase se adapta a tus objetivos, gustos musicales y nivel de experiencia.\n\nLas clases se realizan preferentemente en modalidad online. La modalidad presencial está sujeta a disponibilidad de horarios y contempla un cargo adicional por traslado y reserva exclusiva del horario.',
    level: 'Todos los niveles',
    modality: 'Online',
    duration: '45 min/clase',
    sessions: 'A elección del estudiante',
    price: 75000,
    currency: 'CLP',
    imageAlt: 'Elinad enseñando bajo eléctrico',
    featured: true,
    tags: ['bajo eléctrico', 'individual', 'personalizado'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesan las *Clases de Bajo Eléctrico*. ¿Cuál es tu disponibilidad?',
    paymentUrl: 'https://mpago.la/bajo-electrico-placeholder',
  },
  {
    id: 'taller-ukelele',
    slug: 'taller-ukelele',
    title: 'Taller de Ukelele',
    shortDescription:
      'Aprende a tocar ukelele en un ambiente cercano y entretenido. Un taller grupal para jóvenes y adultos, desde cero o con experiencia básica, donde desarrollarás acordes, ritmo y repertorio a través de canciones y actividades prácticas.\n\nDirección: Casona El Llano, San Miguel. A pasos del Metro El Llano.\n\nHorarios:\n• Miércoles 18:00 a 19:00 hrs.\n• Miércoles 20:15 a 21:15 hrs.',
    longDescription:
      'Aprende a tocar ukelele en un ambiente cercano y entretenido. Un taller grupal para jóvenes y adultos, desde cero o con experiencia básica, donde desarrollarás acordes, ritmo y repertorio a través de canciones y actividades prácticas.\n\nDirección: Casona El Llano, San Miguel. A pasos del Metro El Llano.\n\nHorarios:\n• Miércoles 18:00 a 19:00 hrs.\n• Miércoles 20:15 a 21:15 hrs.',
    level: 'Principiante',
    modality: 'Presencial',
    duration: '1 hora/clase',
    sessions: '4 clases al mes',
    price: 35000,
    currency: 'CLP',
    imageAlt: 'Grupo de personas tocando ukelele en taller musical',
    featured: true,
    tags: ['ukelele', 'grupal', 'presencial', 'San Miguel'],
    whatsappMessage:
      'Hola Elinad 👋 Quiero saber más sobre el *Taller de Ukelele*. ¿Cuándo comienza la próxima edición?',
    paymentUrl: 'https://mpago.la/ukelele-placeholder',
  },
  {
    id: 'clases-ukelele-personalizadas',
    slug: 'ukelele-personalizadas',
    title: 'Clases de Ukelele Personalizadas',
    shortDescription:
      'Aprende ukelele a tu ritmo con clases individuales adaptadas a tu nivel e intereses musicales. Ideal para principiantes y estudiantes que buscan un acompañamiento más personalizado.\n\nPreferentemente online. Modalidad presencial disponible según disponibilidad horaria, con recargo por traslado.',
    longDescription:
      'Aprende ukelele a tu ritmo con clases individuales adaptadas a tu nivel e intereses musicales. Ideal para principiantes y estudiantes que buscan un acompañamiento más personalizado.\n\nPreferentemente online. Modalidad presencial disponible según disponibilidad horaria, con recargo por traslado.',
    level: 'Todos los niveles',
    modality: 'Online',
    duration: '45 min/clase',
    sessions: 'A elección del estudiante',
    price: 75000,
    currency: 'CLP',
    imageAlt: 'Clase individual de ukelele personalizada',
    featured: false,
    tags: ['ukelele', 'individual', 'personalizado'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesan las *Clases de Ukelele Personalizadas*. ¿Cuál es tu disponibilidad?',
    paymentUrl: 'https://mpago.la/ukelele-individual-placeholder',
  },
  {
    id: 'clases-musica-personalizadas',
    slug: 'musica-personalizadas',
    title: 'Clases de Música Personalizadas',
    shortDescription:
      'Clases personalizadas orientadas a tus objetivos musicales. Puedes profundizar en áreas como guitarra, teoría musical, lectura, entrenamiento auditivo, composición, interpretación y otros contenidos, con un enfoque adaptado a tu nivel e intereses.\n\nPreferentemente online. Modalidad presencial disponible según disponibilidad horaria, con recargo por traslado.',
    longDescription:
      'Clases personalizadas orientadas a tus objetivos musicales. Puedes profundizar en áreas como guitarra, teoría musical, lectura, entrenamiento auditivo, composición, interpretación y otros contenidos, con un enfoque adaptado a tu nivel e intereses.\n\nPreferentemente online. Modalidad presencial disponible según disponibilidad horaria, con recargo por traslado.',
    level: 'Todos los niveles',
    modality: 'Online',
    duration: '45 min/clase',
    sessions: 'A elección del estudiante',
    price: 75000,
    currency: 'CLP',
    imageAlt: 'Clase personalizada de guitarra y teoría musical',
    featured: false,
    tags: ['guitarra', 'teoría', 'personalizado', 'online'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesan las *Clases de Música Personalizadas*. ¿Puedes contarme más sobre el contenido y horarios?',
    paymentUrl: 'https://mpago.la/musica-personalizada-placeholder',
  },
];

export const featuredCourses = courses.filter((c) => c.featured);
