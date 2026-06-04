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
    id: 'curso-bajo-iniciacion',
    slug: 'iniciacion',
    title: 'Bajo desde Cero',
    shortDescription: 'Aprende las bases del bajo eléctrico en un ambiente cercano y entretenido.',
    longDescription:
      'Ideal para quienes nunca han tocado un instrumento. Veremos postura, técnica de mano derecha e izquierda, patrones rítmicos y tus primeras líneas de bajo favoritas. El proceso es gradual, divertido y adaptado a tu ritmo.',
    level: 'Principiante',
    modality: 'Presencial',
    duration: '8 semanas',
    sessions: '16 clases (2 por semana)',
    price: 60000,
    currency: 'CLP',
    imageAlt: 'Estudiante aprendiendo bajo eléctrico con tutor',
    featured: true,
    tags: ['bajo', 'eléctrico', 'ritmo', 'canciones'],
    whatsappMessage:
      'Hola Elinad 👋 Estoy interesado/a en el curso *Bajo desde Cero*. ¿Podrías darme más información sobre horarios y disponibilidad?',
    paymentUrl: 'https://mpago.la/inicio-placeholder',
  },
  {
    id: 'curso-bajo-intermedio',
    slug: 'intermedio',
    title: 'Bajo Intermedio',
    shortDescription: 'Domina el mástil, técnica slap & pop y teoría musical aplicada al bajo.',
    longDescription:
      'Para quienes ya conocen lo básico y quieren dar el siguiente paso. Trabajaremos técnica slap, escalas, armonía y repertorio variado entre pop, rock, funk y música latinoamericana.',
    level: 'Intermedio',
    modality: 'Presencial',
    duration: '10 semanas',
    sessions: '20 clases (2 por semana)',
    price: 75000,
    currency: 'CLP',
    imageAlt: 'Bajista practicando técnica slap en bajo eléctrico',
    featured: true,
    tags: ['slap', 'escalas', 'teoría', 'funk', 'latinoamérica'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesa el curso *Bajo Intermedio*. ¿Puedes contarme más sobre el contenido y los horarios disponibles?',
    paymentUrl: 'https://mpago.la/intermedio-placeholder',
  },
  {
    id: 'taller-ukelele',
    slug: 'ukelele',
    title: 'Taller de Ukelele',
    shortDescription: 'Aprende ukelele desde cero: acordes, strumming y canciones populares.',
    longDescription:
      'Un taller práctico y entretenido para conocer el ukelele. Aprenderás los acordes esenciales, patrones de rasgueo y cómo tocar canciones que te gustan. Perfecto para todas las edades y sin experiencia previa.',
    level: 'Principiante',
    modality: 'Presencial',
    duration: '6 semanas',
    sessions: '12 clases (2 por semana)',
    price: 55000,
    currency: 'CLP',
    imageAlt: 'Persona tocando ukelele con acordes y canciones populares',
    featured: false,
    tags: ['ukelele', 'acordes', 'strumming', 'canciones'],
    whatsappMessage:
      'Hola Elinad 👋 Quiero saber más sobre el *Taller de Ukelele*. ¿Cuándo comienza la próxima edición?',
    paymentUrl: 'https://mpago.la/ukelele-placeholder',
  },
  {
    id: 'taller-composicion',
    slug: 'composicion',
    title: 'Composición & Songwriting',
    shortDescription: 'Crea tus propias canciones: letras, acordes y estructura musical.',
    longDescription:
      'Aprende a expresar tus ideas musicales de forma auténtica. Exploraremos estructura de canciones, progresiones de acordes, escritura de letras y grabación casera básica para que puedas compartir tu música.',
    level: 'Todos los niveles',
    modality: 'Online',
    duration: '8 semanas',
    sessions: '8 sesiones (1 por semana)',
    price: 50000,
    currency: 'CLP',
    imageAlt: 'Persona escribiendo letras de canciones con bajo al lado',
    featured: false,
    tags: ['composición', 'songwriting', 'letras', 'online'],
    whatsappMessage:
      'Hola Elinad 👋 Me llama mucho la atención el taller de *Composición & Songwriting*. ¿Podrías enviarme más detalles?',
    paymentUrl: 'https://mpago.la/composicion-placeholder',
  },
  {
    id: 'clase-individual',
    slug: 'clases-individuales',
    title: 'Clases Individuales',
    shortDescription: 'Clase personalizada de 60 minutos, enfocada en tus metas específicas.',
    longDescription:
      'Si prefieres un enfoque 100% personalizado, las clases individuales se adaptan exactamente a lo que necesitas: técnica puntual, preparación para una audición, repertorio específico o cualquier objetivo que tengas.',
    level: 'Todos los niveles',
    modality: 'Híbrido',
    duration: '60 min/clase',
    sessions: 'A elección del alumno',
    price: 20000,
    currency: 'CLP',
    imageAlt: 'Profesor y alumno en clase individual de bajo o ukelele',
    featured: false,
    tags: ['individual', 'personalizado', 'flexible'],
    whatsappMessage:
      'Hola Elinad 👋 Estoy interesado/a en agendar una *Clase Individual*. ¿Cuál es tu disponibilidad esta semana?',
    paymentUrl: 'https://mpago.la/individual-placeholder',
  },
];

export const featuredCourses = courses.filter((c) => c.featured);
