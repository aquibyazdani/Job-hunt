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
      className="p-1.5 rounded-[6px] transition-colors"
      style={{ color: isDark ? '#a3a3a3' : '#888888' }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f5';
        e.currentTarget.style.color = isDark ? '#ededed' : '#171717';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = isDark ? '#a3a3a3' : '#888888';
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
