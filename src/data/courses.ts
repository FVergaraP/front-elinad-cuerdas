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
  sessions: string;        // ej: "16 clases (2 por semana)"
  price: number;
  currency: 'CLP' | 'USD';
  imageAlt: string;
  featured: boolean;
  tags: string[];
  // CTAs
  whatsappMessage: string; // mensaje pre-rellenado para la API de WhatsApp
  paymentUrl: string;      // link directo de Mercado Pago u otro proveedor
}

// Número de WhatsApp del negocio (sin + ni espacios)
export const WHATSAPP_NUMBER = '56965017566';

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const courses: Course[] = [
  {
    id: 'taller-ukelele',
    slug: 'taller-ukelele',
    title: 'Taller de Ukelele',
    shortDescription:
      'Aprende en grupo, comparte con otros músicos y disfruta haciendo música desde las primeras clases. Un espacio participativo y orientado a la práctica musical en San Miguel, Casona El Llano.',
    longDescription:
      'Aprende en grupo, comparte con otros músicos y disfruta haciendo música desde las primeras clases. Un espacio participativo y orientado a la práctica musical en San Miguel, Casona El Llano.',
    level: 'Principiante',
    modality: 'Presencial',
    duration: '6 semanas',
    sessions: '12 clases (2 por semana)',
    price: 55000,
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
      'Aprende ukelele a tu ritmo con clases individuales adaptadas a tu nivel e intereses musicales. Ideal para principiantes y estudiantes que buscan un acompañamiento más personalizado.',
    longDescription:
      'Aprende ukelele a tu ritmo con clases individuales adaptadas a tu nivel e intereses musicales. Ideal para principiantes y estudiantes que buscan un acompañamiento más personalizado.',
    level: 'Todos los niveles',
    modality: 'Híbrido',
    duration: '60 min/clase',
    sessions: 'A elección del alumno',
    price: 20000,
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
      'Guitarra, teoría musical, lectura, entrenamiento auditivo, interpretación y otros contenidos adaptados a tus objetivos musicales.',
    longDescription:
      'Guitarra, teoría musical, lectura, entrenamiento auditivo, interpretación y otros contenidos adaptados a tus objetivos musicales.',
    level: 'Todos los niveles',
    modality: 'Híbrido',
    duration: '60 min/clase',
    sessions: 'A elección del alumno',
    price: 20000,
    currency: 'CLP',
    imageAlt: 'Clase personalizada de guitarra y teoría musical',
    featured: false,
    tags: ['guitarra', 'teoría', 'personalizado', 'online'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesan las *Clases de Música Personalizadas*. ¿Puedes contarme más sobre el contenido y horarios?',
    paymentUrl: 'https://mpago.la/musica-personalizada-placeholder',
  },
  {
    id: 'taller-composicion',
    slug: 'composicion',
    title: 'Composición y Songwriting',
    shortDescription:
      'Desarrolla tus propias canciones a través del trabajo con armonía, melodía, letras y estructura musical. Ideal para quienes desean expresar sus ideas mediante la música.',
    longDescription:
      'Desarrolla tus propias canciones a través del trabajo con armonía, melodía, letras y estructura musical. Ideal para quienes desean expresar sus ideas mediante la música.',
    level: 'Todos los niveles',
    modality: 'Online',
    duration: '8 semanas',
    sessions: '8 sesiones (1 por semana)',
    price: 50000,
    currency: 'CLP',
    imageAlt: 'Persona componiendo canciones con instrumento al lado',
    featured: false,
    tags: ['composición', 'songwriting', 'armonía', 'online'],
    whatsappMessage:
      'Hola Elinad 👋 Me llama mucho la atención el taller de *Composición y Songwriting*. ¿Podrías enviarme más detalles?',
    paymentUrl: 'https://mpago.la/composicion-placeholder',
  },
];

export const featuredCourses = courses.filter((c) => c.featured);
