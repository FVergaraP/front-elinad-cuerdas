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
    id: 'curso-guitarra-iniciacion',
    slug: 'iniciacion',
    title: 'Guitarra desde Cero',
    shortDescription: 'Aprende las bases de la guitarra acústica en un ambiente cercano y entretenido.',
    longDescription:
      'Ideal para quienes nunca han tocado un instrumento. Veremos postura, acordes básicos, rasgueos y tus primeras canciones favoritas. El proceso es gradual, divertido y adaptado a tu ritmo.',
    level: 'Principiante',
    modality: 'Presencial',
    duration: '8 semanas',
    sessions: '16 clases (2 por semana)',
    price: 60000,
    currency: 'CLP',
    imageAlt: 'Estudiante aprendiendo guitarra acústica con tutor',
    featured: true,
    tags: ['acústica', 'acordes', 'rasgueos', 'canciones'],
    whatsappMessage:
      'Hola Elinad 👋 Estoy interesado/a en el curso *Guitarra desde Cero*. ¿Podrías darme más información sobre horarios y disponibilidad?',
    paymentUrl: 'https://mpago.la/inicio-placeholder',
  },
  {
    id: 'curso-guitarra-intermedio',
    slug: 'intermedio',
    title: 'Guitarra Intermedia',
    shortDescription: 'Domina el mástil, técnica fingerpicking y teoría musical aplicada a la guitarra.',
    longDescription:
      'Para quienes ya conocen acordes básicos y quieren dar el siguiente paso. Trabajaremos técnica de dedos, escalas, armonía y repertorio variado entre pop, rock y música latinoamericana.',
    level: 'Intermedio',
    modality: 'Presencial',
    duration: '10 semanas',
    sessions: '20 clases (2 por semana)',
    price: 75000,
    currency: 'CLP',
    imageAlt: 'Guitarrista practicando técnica fingerpicking',
    featured: true,
    tags: ['fingerpicking', 'escalas', 'teoría', 'latinoamérica'],
    whatsappMessage:
      'Hola Elinad 👋 Me interesa el curso *Guitarra Intermedia*. ¿Puedes contarme más sobre el contenido y los horarios disponibles?',
    paymentUrl: 'https://mpago.la/intermedio-placeholder',
  },
  {
    id: 'taller-guitarra-electrica',
    slug: 'electrica',
    title: 'Taller Guitarra Eléctrica',
    shortDescription: 'Énfasis en rock, blues y técnica eléctrica: distorsión, efectos y solos.',
    longDescription:
      'Un taller intensivo enfocado en el universo de la guitarra eléctrica. Aprenderás a dominar el sonido, trabajarás técnicas de bending, vibrato y construcción de solos sobre backing tracks reales.',
    level: 'Intermedio',
    modality: 'Presencial',
    duration: '6 semanas',
    sessions: '12 clases (2 por semana)',
    price: 65000,
    currency: 'CLP',
    imageAlt: 'Guitarra eléctrica con amplificador y pedalera de efectos',
    featured: false,
    tags: ['eléctrica', 'rock', 'blues', 'solos', 'efectos'],
    whatsappMessage:
      'Hola Elinad 👋 Quiero saber más sobre el *Taller de Guitarra Eléctrica*. ¿Cuándo comienza la próxima edición?',
    paymentUrl: 'https://mpago.la/electrica-placeholder',
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
    imageAlt: 'Persona escribiendo letras de canciones con guitarra al lado',
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
    imageAlt: 'Profesor y alumno en clase individual de guitarra',
    featured: false,
    tags: ['individual', 'personalizado', 'flexible'],
    whatsappMessage:
      'Hola Elinad 👋 Estoy interesado/a en agendar una *Clase Individual*. ¿Cuál es tu disponibilidad esta semana?',
    paymentUrl: 'https://mpago.la/individual-placeholder',
  },
];

export const featuredCourses = courses.filter((c) => c.featured);
