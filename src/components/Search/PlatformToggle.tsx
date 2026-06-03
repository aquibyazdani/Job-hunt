import { Link2, Search, Globe } from 'lucide-react';
import type { Platform } from '../../types';

interface Props {
  value: Platform;
  onChange: (p: Platform) => void;
  showOther?: boolean;
}

const platforms: { id: Platform; label: string; icon: React.ReactNode }[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: <Link2 size={14} /> },
  { id: 'google', label: 'Google X-Ray', icon: <Search size={14} /> },
  { id: 'other', label: 'Other Platforms', icon: <Globe size={14} /> },
];

export function PlatformToggle({ value, onChange, showOther = true }: Props) {
  const items = showOther ? platforms : platforms.filter(p => p.id !== 'other');

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
      {items.map(p => (
        <button
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            value === p.id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/8'
          }`}
        >
          {p.icon}
          {p.label}
        </button>
      ))}
    </div>
  );
}
