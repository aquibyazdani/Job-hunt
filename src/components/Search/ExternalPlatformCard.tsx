import { ExternalLink } from 'lucide-react';
import type { ExternalPlatform } from '../../types';

interface Props {
  platforms: ExternalPlatform[];
}

export function ExternalPlatformGrid({ platforms }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {platforms.map(p => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-1.5 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xl">{p.emoji}</span>
            <ExternalLink size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          </div>
          <span className="text-white text-sm font-medium">{p.name}</span>
          <span className="text-slate-500 text-xs">{p.description}</span>
        </a>
      ))}
    </div>
  );
}
