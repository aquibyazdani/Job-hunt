import { Menu, Search } from 'lucide-react';
import type { Theme } from '../../types';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  title: string;
  emoji: string;
  theme: Theme;
  onThemeToggle: () => void;
  onMenuOpen: () => void;
  onSearchOpen: () => void;
}

export function Header({ title, emoji, theme, onThemeToggle, onMenuOpen, onSearchOpen }: Props) {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 backdrop-blur-sm border-b transition-colors ${
      isDark
        ? 'bg-navy-900/80 border-white/10'
        : 'bg-white/90 border-slate-200'
    }`}>
      <button
        onClick={onMenuOpen}
        className={`lg:hidden p-2 rounded-lg transition-colors ${
          isDark ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
        }`}
      >
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-xl">{emoji}</span>
        <h1 className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h1>
      </div>

      <button
        onClick={onSearchOpen}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-slate-200'
            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-500 hover:text-slate-900'
        }`}
      >
        <Search size={14} />
        <span className="hidden sm:inline">Quick Search</span>
        <kbd className={`hidden sm:inline text-xs px-1.5 py-0.5 rounded font-mono ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>⌘K</kbd>
      </button>

      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </header>
  );
}
