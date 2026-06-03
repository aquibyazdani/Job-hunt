import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../../types';

interface Props {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition-colors ${
        isDark
          ? 'hover:bg-white/10 text-slate-400 hover:text-slate-200'
          : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
