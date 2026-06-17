import { TrendingUp, Star, Clipboard, Flame } from 'lucide-react';
import type { Stats, TrackerCard } from '../types';

interface Props {
  stats: Stats;
  trackerCards: TrackerCard[];
  favoritesCount: number;
}

const STAT_CONFIG = [
  {
    label: 'Copies Today',
    icon: TrendingUp,
    key: 'copyCount' as const,
    accent: '#0070f3',
    lightBg: '#eff6ff',
    darkBg: 'rgba(0,112,243,0.12)',
  },
  {
    label: 'Favorites',
    icon: Star,
    key: 'favorites' as const,
    accent: '#d97706',
    lightBg: '#fffbeb',
    darkBg: 'rgba(217,119,6,0.12)',
  },
  {
    label: 'Applications',
    icon: Clipboard,
    key: 'applications' as const,
    accent: '#15803d',
    lightBg: '#f0fdf4',
    darkBg: 'rgba(21,128,61,0.12)',
  },
  {
    label: 'Day Streak',
    icon: Flame,
    key: 'streak' as const,
    accent: '#c2410c',
    lightBg: '#fff7ed',
    darkBg: 'rgba(194,65,12,0.12)',
  },
];

export function StatsDashboard({ stats, trackerCards, favoritesCount }: Props) {
  const applied     = trackerCards.filter(c => c.status === 'applied').length;
  const inProgress  = trackerCards.filter(c => c.status === 'in_progress').length;

  const values: Record<string, number> = {
    copyCount:    stats.copyCount,
    favorites:    favoritesCount,
    applications: applied + inProgress,
    streak:       stats.streak,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {STAT_CONFIG.map(s => {
        const Icon = s.icon;
        const value = values[s.key];
        return (
          <div
            key={s.label}
            className="rh-card p-4 flex flex-col gap-2"
          >
            <div
              className="w-7 h-7 rounded-[6px] flex items-center justify-center"
              style={{ background: `var(--stat-bg, ${s.lightBg})`, color: s.accent }}
            >
              <style>{`.dark [data-stat="${s.key}"] { --stat-bg: ${s.darkBg}; }`}</style>
              <span data-stat={s.key}>
                <Icon size={15} style={{ color: s.accent }} />
              </span>
            </div>
            <div
              className="text-2xl font-semibold"
              style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.96px' }}
            >
              {value}
            </div>
            <div
              className="text-xs"
              style={{ color: 'var(--rh-text-3)' }}
            >
              {s.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
