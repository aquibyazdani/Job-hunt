import { TrendingUp, Star, Clipboard, Flame } from 'lucide-react';
import type { Stats, TrackerCard } from '../types';

interface Props {
  stats: Stats;
  trackerCards: TrackerCard[];
  favoritesCount: number;
}

export function StatsDashboard({ stats, trackerCards, favoritesCount }: Props) {
  const applied = trackerCards.filter(c => c.status === 'applied').length;
  const inProgress = trackerCards.filter(c => c.status === 'in_progress').length;

  const statCards = [
    {
      label: 'Copies Today',
      value: stats.copyCount,
      icon: <TrendingUp size={16} />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Favorites',
      value: favoritesCount,
      icon: <Star size={16} />,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/20',
    },
    {
      label: 'Applications',
      value: applied + inProgress,
      icon: <Clipboard size={16} />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Day Streak',
      value: stats.streak,
      icon: <Flame size={16} />,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {statCards.map(s => (
        <div key={s.label} className={`${s.bg} border rounded-xl p-4 flex flex-col gap-2`}>
          <div className={`${s.color}`}>{s.icon}</div>
          <div className="text-2xl font-bold text-white">{s.value}</div>
          <div className="text-xs text-slate-500">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
