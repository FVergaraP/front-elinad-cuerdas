export type FontId = 'inter' | 'montserrat' | 'poppins' | 'lato';

export interface Font {
  id: FontId;
  label: string;
  stack: string;   // valor para --font-sans en CSS
  google: string;  // parámetros para Google Fonts URL
}

export const FONTS: Font[] = [
  {
    id: 'inter',
    label: 'Inter',
    stack: 'Inter, system-ui, sans-serif',
    google: 'Inter:wght@400;500;600;700',
  },
  {
    id: 'montserrat',
    label: 'Montserrat',
    stack: 'Montserrat, system-ui, sans-serif',
    google: 'Montserrat:wght@400;500;600;700',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    stack: 'Poppins, system-ui, sans-serif',
    google: 'Poppins:wght@400;500;600;700',
  },
  {
    id: 'lato',
    label: 'Lato',
    stack: 'Lato, system-ui, sans-serif',
    google: 'Lato:wght@400;700',
  },
];

export const DEFAULT_FONT: FontId = 'inter';
export const FONT_STORAGE_KEY = 'elinad-font';
