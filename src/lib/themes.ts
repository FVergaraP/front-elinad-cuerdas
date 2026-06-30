export type ThemeId =
  | 'warm' | 'dark' | 'light' | 'avant' | 'neon' | 'pro'
  | 'calida-v1' | 'calida-v2' | 'calida-v3' | 'calida-v4'
  | 'calida-v5' | 'calida-v6' | 'calida-v7' | 'calida-v8'
  | 'pro-v1' | 'pro-v2' | 'pro-v3' | 'pro-v4'
  | 'pro-v5' | 'pro-v6' | 'pro-v7' | 'pro-v8';

export interface Theme {
  id: ThemeId;
  label: string;
  emoji: string;
  description: string;
  group: 'original' | 'calida' | 'profesional';
}

export const THEMES: Theme[] = [
  // --- Originales ---
  { id: 'warm',  label: 'Cálida',       emoji: '🎸', description: 'Madera & dorado',   group: 'original' },
  { id: 'dark',  label: 'Elegante',     emoji: '🍷', description: 'Vino & negro',       group: 'original' },
  { id: 'light', label: 'Fresca',       emoji: '☀️', description: 'Azul marino',        group: 'original' },
  { id: 'avant', label: 'Vanguardista', emoji: '🔮', description: 'Púrpura & oro',      group: 'original' },
  { id: 'neon',  label: 'Futurista',    emoji: '⚡', description: 'Neón & negro',       group: 'original' },
  { id: 'pro',   label: 'Profesional',  emoji: '💼', description: 'Azul & dorado',      group: 'original' },

  // --- Variantes Cálida ---
  { id: 'calida-v1', label: 'Cálida V1', emoji: '☕', description: 'Espresso dorado',   group: 'calida' },
  { id: 'calida-v2', label: 'Cálida V2', emoji: '🪵', description: 'Caoba & oro',       group: 'calida' },
  { id: 'calida-v3', label: 'Cálida V3', emoji: '🍯', description: 'Ámbar intenso',     group: 'calida' },
  { id: 'calida-v4', label: 'Cálida V4', emoji: '🌲', description: 'Cedro rojizo',      group: 'calida' },
  { id: 'calida-v5', label: 'Cálida V5', emoji: '🌿', description: 'Pino & oro',        group: 'calida' },
  { id: 'calida-v6', label: 'Cálida V6', emoji: '🪨', description: 'Nogal antiguo',     group: 'calida' },
  { id: 'calida-v7', label: 'Cálida V7', emoji: '✨', description: 'Miel dorada',       group: 'calida' },
  { id: 'calida-v8', label: 'Cálida V8', emoji: '🖤', description: 'Ébano & oro',       group: 'calida' },

  // --- Variantes Profesional ---
  { id: 'pro-v1', label: 'Profesional V1', emoji: '⚓', description: 'Marina clásica',  group: 'profesional' },
  { id: 'pro-v2', label: 'Profesional V2', emoji: '🌊', description: 'Noche de mar',    group: 'profesional' },
  { id: 'pro-v3', label: 'Profesional V3', emoji: '🔩', description: 'Azul acero',      group: 'profesional' },
  { id: 'pro-v4', label: 'Profesional V4', emoji: '💎', description: 'Zafiro & oro',    group: 'profesional' },
  { id: 'pro-v5', label: 'Profesional V5', emoji: '🫧', description: 'Porcelana',       group: 'profesional' },
  { id: 'pro-v6', label: 'Profesional V6', emoji: '🌙', description: 'Medianoche',      group: 'profesional' },
  { id: 'pro-v7', label: 'Profesional V7', emoji: '🌊', description: 'Atlántico',       group: 'profesional' },
  { id: 'pro-v8', label: 'Profesional V8', emoji: '🏛️', description: 'Slate dorado',    group: 'profesional' },
];

export const THEME_GROUPS = [
  { key: 'original',    label: 'Originales' },
  { key: 'calida',      label: 'Variantes Cálida' },
  { key: 'profesional', label: 'Variantes Profesional' },
] as const;

export const DEFAULT_THEME: ThemeId = 'pro-v2';
export const THEME_STORAGE_KEY = 'elinad-theme';
