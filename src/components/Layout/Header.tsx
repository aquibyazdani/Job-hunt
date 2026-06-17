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
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b backdrop-blur-sm transition-colors"
      style={{
        background: isDark ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.92)',
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#ebebeb',
      }}
    >
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-1.5 rounded-[6px] transition-colors"
        style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#888888' }}
        onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : '#f5f5f5')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-lg leading-none">{emoji}</span>
        <h1
          className="font-semibold text-base truncate"
          style={{
            color: isDark ? '#ededed' : '#171717',
            letterSpacing: '-0.4px',
          }}
        >
          {title}
        </h1>
      </div>

      <button
        onClick={onSearchOpen}
        className="flex items-center gap-2 px-3 py-1.5 border rounded-[6px] text-sm transition-colors"
        style={{
          background: isDark ? 'rgba(255,255,255,0.04)' : '#f5f5f5',
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#ebebeb',
          color: isDark ? '#a3a3a3' : '#888888',
        }}
      >
        <Search size={13} />
        <span className="hidden sm:inline">Search</span>
        <kbd
          className="hidden sm:inline text-xs px-1.5 py-0.5 rounded font-mono"
          style={{
            background: isDark ? 'rgba(255,255,255,0.08)' : '#ebebeb',
            color: isDark ? '#737373' : '#888888',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          ⌘K
        </kbd>
      </button>

      <ThemeToggle theme={theme} onToggle={onThemeToggle} />
    </header>
  );
}
