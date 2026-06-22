export type ThemeId = 'warm' | 'dark' | 'light' | 'avant' | 'neon' | 'pro';

export interface Theme {
  id: ThemeId;
  label: string;
  emoji: string;
  description: string;
}

export const THEMES: Theme[] = [
  { id: 'warm',  label: 'Cálida',       emoji: '🎸', description: 'Madera & dorado' },
  { id: 'dark',  label: 'Elegante',     emoji: '🍷', description: 'Vino & negro' },
  { id: 'light', label: 'Fresca',       emoji: '☀️', description: 'Azul marino' },
  { id: 'avant', label: 'Vanguardista', emoji: '🔮', description: 'Púrpura & oro' },
  { id: 'neon',  label: 'Futurista',    emoji: '⚡', description: 'Neón & negro' },
  { id: 'pro',   label: 'Profesional',  emoji: '💼', description: 'Azul & dorado' },
];

export const DEFAULT_THEME: ThemeId = 'pro';
export const THEME_STORAGE_KEY = 'elinad-theme';
