import { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeVariant = 'minimal' | 'dark' | 'gradient' | 'dashboard' | 'terminal';

interface ThemeContextType {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  themeConfig: ThemeConfig;
}

interface ThemeConfig {
  name: string;
  bg: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  accent: string;
  input: string;
  inputBorder: string;
  progressBg: string;
  progressFill: string;
  success: string;
  warning: string;
  error: string;
  tableBg: string;
  tableHeader: string;
  tableRow: string;
  tableRowAlt: string;
}

const themes: Record<ThemeVariant, ThemeConfig> = {
  minimal: {
    name: 'Clean Minimal',
    bg: 'bg-gray-50',
    card: 'bg-white',
    cardBorder: 'border border-gray-200',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    primary: 'bg-gray-900 text-white',
    primaryHover: 'hover:bg-gray-700',
    accent: 'text-blue-600',
    input: 'bg-white',
    inputBorder: 'border-gray-300 focus:border-gray-500 focus:ring-gray-500',
    progressBg: 'bg-gray-200',
    progressFill: 'bg-gray-900',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
    tableBg: 'bg-white',
    tableHeader: 'bg-gray-100',
    tableRow: 'bg-white',
    tableRowAlt: 'bg-gray-50',
  },
  dark: {
    name: 'Dark Tech',
    bg: 'bg-slate-950',
    card: 'bg-slate-900',
    cardBorder: 'border border-slate-700',
    text: 'text-white',
    textMuted: 'text-slate-400',
    primary: 'bg-cyan-500 text-slate-950',
    primaryHover: 'hover:bg-cyan-400',
    accent: 'text-cyan-400',
    input: 'bg-slate-800',
    inputBorder: 'border-slate-600 focus:border-cyan-500 focus:ring-cyan-500',
    progressBg: 'bg-slate-800',
    progressFill: 'bg-cyan-500',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
    tableBg: 'bg-slate-900',
    tableHeader: 'bg-slate-800',
    tableRow: 'bg-slate-900',
    tableRowAlt: 'bg-slate-800/50',
  },
  gradient: {
    name: 'Gradient Modern',
    bg: 'bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900',
    card: 'bg-white/10 backdrop-blur-lg',
    cardBorder: 'border border-white/20',
    text: 'text-white',
    textMuted: 'text-purple-200',
    primary: 'bg-gradient-to-r from-pink-500 to-violet-500 text-white',
    primaryHover: 'hover:from-pink-400 hover:to-violet-400',
    accent: 'text-pink-400',
    input: 'bg-white/10 backdrop-blur',
    inputBorder: 'border-white/30 focus:border-pink-400 focus:ring-pink-400',
    progressBg: 'bg-white/20',
    progressFill: 'bg-gradient-to-r from-pink-500 to-violet-500',
    success: 'text-emerald-300',
    warning: 'text-amber-300',
    error: 'text-red-300',
    tableBg: 'bg-white/5',
    tableHeader: 'bg-white/10',
    tableRow: 'bg-white/5',
    tableRowAlt: 'bg-white/10',
  },
  dashboard: {
    name: 'Dashboard Cards',
    bg: 'bg-blue-50',
    card: 'bg-white shadow-lg',
    cardBorder: 'border-0 rounded-2xl',
    text: 'text-slate-800',
    textMuted: 'text-slate-500',
    primary: 'bg-blue-600 text-white',
    primaryHover: 'hover:bg-blue-700',
    accent: 'text-blue-600',
    input: 'bg-blue-50',
    inputBorder: 'border-blue-200 focus:border-blue-500 focus:ring-blue-500',
    progressBg: 'bg-blue-100',
    progressFill: 'bg-blue-600',
    success: 'text-emerald-600',
    warning: 'text-orange-500',
    error: 'text-red-500',
    tableBg: 'bg-white',
    tableHeader: 'bg-blue-50',
    tableRow: 'bg-white',
    tableRowAlt: 'bg-blue-50/50',
  },
  terminal: {
    name: 'Terminal CLI',
    bg: 'bg-black',
    card: 'bg-gray-950',
    cardBorder: 'border border-green-500/30',
    text: 'text-green-400',
    textMuted: 'text-green-600',
    primary: 'bg-green-500 text-black',
    primaryHover: 'hover:bg-green-400',
    accent: 'text-green-300',
    input: 'bg-black',
    inputBorder: 'border-green-500/50 focus:border-green-400 focus:ring-green-400',
    progressBg: 'bg-green-950',
    progressFill: 'bg-green-500',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-500',
    tableBg: 'bg-gray-950',
    tableHeader: 'bg-green-950',
    tableRow: 'bg-gray-950',
    tableRowAlt: 'bg-green-950/30',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>('minimal');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export const themeList = Object.entries(themes).map(([key, value]) => ({
  id: key as ThemeVariant,
  name: value.name,
}));
