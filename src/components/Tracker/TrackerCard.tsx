import { useState } from 'react';
import { Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { TrackerCard as TrackerCardType, TrackerStatus } from '../../types';

const STATUS_STYLES: Record<TrackerStatus, { light: string; dark: string }> = {
  saved:       { light: 'bg-slate-50 text-slate-600 border-slate-200',       dark: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  applied:     { light: 'bg-blue-50 text-blue-700 border-blue-200',          dark: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  in_progress: { light: 'bg-yellow-50 text-yellow-700 border-yellow-200',    dark: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  offer:       { light: 'bg-emerald-50 text-emerald-700 border-emerald-200', dark: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
};

const STATUS_LABELS: Record<TrackerStatus, string> = {
  saved: 'Saved', applied: 'Applied', in_progress: 'In Progress', offer: 'Offer',
};

interface Props {
  card: TrackerCardType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TrackerCardType>) => void;
}

export function TrackerCard({ card, onDelete, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-[6px] p-3 transition-colors"
      style={{
        background: 'var(--rh-surface)',
        border: '1px solid var(--rh-border)',
        boxShadow: 'var(--rh-shadow-card)',
      }}
    >
      {/* Company & role */}
      <div className="space-y-0.5 mb-2">
        <input
          value={card.company}
          onChange={e => onUpdate(card.id, { company: e.target.value })}
          placeholder="Company name"
          className="w-full bg-transparent text-sm font-semibold focus:outline-none"
          style={{ color: 'var(--rh-text-1)' }}
        />
        <input
          value={card.role}
          onChange={e => onUpdate(card.id, { role: e.target.value })}
          placeholder="Role title"
          className="w-full bg-transparent text-xs focus:outline-none"
          style={{ color: 'var(--rh-text-2)' }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_STYLES[card.status].light} dark:${STATUS_STYLES[card.status].dark}`}>
          {STATUS_LABELS[card.status]}
        </span>
        {card.source && (
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ color: 'var(--rh-text-3)', background: 'var(--rh-surface-2)' }}
          >
            via {card.source}
          </span>
        )}
        <span className="text-xs ml-auto" style={{ color: 'var(--rh-text-3)' }}>
          {card.dateAdded}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        {card.url && (
          <a
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded transition-colors"
            style={{ color: 'var(--rh-text-3)' }}
          >
            <ExternalLink size={12} />
          </a>
        )}
        <button
          onClick={() => setExpanded(p => !p)}
          className="p-1 rounded transition-colors"
          style={{ color: 'var(--rh-text-3)' }}
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onDelete(card.id)}
          className="p-1 rounded transition-colors"
          style={{ color: 'var(--rh-text-3)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#b91c1c')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--rh-text-3)')}
        >
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
          className="rh-textarea mt-2 text-xs"
        />
      )}
    </div>
  );
}
