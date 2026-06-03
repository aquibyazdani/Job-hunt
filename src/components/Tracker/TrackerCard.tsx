import { useState } from 'react';
import { Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { TrackerCard as TrackerCardType, TrackerStatus } from '../../types';

const STATUS_COLORS: Record<TrackerStatus, string> = {
  saved: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  applied: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  offer: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
};

const STATUS_LABELS: Record<TrackerStatus, string> = {
  saved: 'Saved',
  applied: 'Applied',
  in_progress: 'In Progress',
  offer: 'Offer',
};

interface Props {
  card: TrackerCardType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TrackerCardType>) => void;
}

export function TrackerCard({ card, onDelete, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-white/20 transition-all duration-200">
      {/* Company & role */}
      <div className="space-y-1 mb-2">
        <input
          value={card.company}
          onChange={e => onUpdate(card.id, { company: e.target.value })}
          placeholder="Company name"
          className="w-full bg-transparent text-white text-sm font-semibold focus:outline-none placeholder-slate-600"
        />
        <input
          value={card.role}
          onChange={e => onUpdate(card.id, { role: e.target.value })}
          placeholder="Role title"
          className="w-full bg-transparent text-slate-400 text-xs focus:outline-none placeholder-slate-700"
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[card.status]}`}>
          {STATUS_LABELS[card.status]}
        </span>
        {card.source && (
          <span className="text-xs text-slate-600 bg-white/5 px-1.5 py-0.5 rounded">
            via {card.source}
          </span>
        )}
        <span className="text-xs text-slate-700 ml-auto">{card.dateAdded}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {card.url && (
          <a href={card.url} target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-400 p-1 rounded transition-colors">
            <ExternalLink size={12} />
          </a>
        )}
        <button onClick={() => setExpanded(p => !p)} className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors">
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <div className="flex-1" />
        <button onClick={() => onDelete(card.id)} className="text-slate-600 hover:text-red-400 p-1 rounded transition-colors">
          <Trash2 size={12} />
        </button>
      </div>

      {/* Notes */}
      {expanded && (
        <textarea
          value={card.notes}
          onChange={e => onUpdate(card.id, { notes: e.target.value })}
          placeholder="Add notes..."
          rows={2}
          className="w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-xs text-slate-300 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 font-sans"
        />
      )}
    </div>
  );
}
