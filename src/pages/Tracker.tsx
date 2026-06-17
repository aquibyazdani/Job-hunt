import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { TrackerCard as TrackerCardType, TrackerStatus } from '../types';
import { TrackerCard } from '../components/Tracker/TrackerCard';

const COLUMNS: { id: TrackerStatus; label: string; emoji: string; accentLight: string; accentDark: string }[] = [
  { id: 'saved',       label: 'Saved',       emoji: '🔖', accentLight: '#e2e8f0', accentDark: 'rgba(100,116,139,0.3)' },
  { id: 'applied',     label: 'Applied',     emoji: '📤', accentLight: '#bfdbfe', accentDark: 'rgba(59,130,246,0.3)' },
  { id: 'in_progress', label: 'In Progress', emoji: '🔄', accentLight: '#fde68a', accentDark: 'rgba(234,179,8,0.3)' },
  { id: 'offer',       label: 'Offer',       emoji: '🎉', accentLight: '#bbf7d0', accentDark: 'rgba(34,197,94,0.3)' },
];

interface Props {
  cards: TrackerCardType[];
  onAdd: (card: TrackerCardType) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TrackerCardType>) => void;
}

export function Tracker({ cards, onAdd, onDelete, onUpdate }: Props) {
  const addCard = (status: TrackerStatus) => {
    const newCard: TrackerCardType = {
      id: `card-${Date.now()}`,
      company: '',
      role: '',
      source: 'Manual',
      status,
      notes: '',
      dateAdded: new Date().toLocaleDateString(),
    };
    onAdd(newCard);
  };

  const moveCard = (id: string, newStatus: TrackerStatus) => {
    onUpdate(id, { status: newStatus });
  };

  return (
    <div className="space-y-5">
      <p className="text-sm" style={{ color: 'var(--rh-text-2)' }}>
        Track your job applications through the pipeline.
      </p>

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colCards = cards.filter(c => c.status === col.id);
          return (
            <div
              key={col.id}
              className="rh-card flex flex-col min-h-[200px] overflow-hidden"
            >
              {/* Column header — accent left border */}
              <div
                className="flex items-center justify-between px-3 py-2.5 border-b"
                style={{
                  borderColor: 'var(--rh-border)',
                  borderLeft: `3px solid ${col.accentLight}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{col.emoji}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.28px' }}>
                    {col.label}
                  </span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--rh-surface-2)', color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    {colCards.length}
                  </span>
                </div>
                <button
                  onClick={() => addCard(col.id)}
                  className="p-1 rounded transition-colors"
                  style={{ color: 'var(--rh-text-3)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--rh-surface-2)'; e.currentTarget.style.color = 'var(--rh-text-1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--rh-text-3)'; }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto" style={{ background: 'var(--rh-surface-2)' }}>
                <AnimatePresence>
                  {colCards.map(card => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                    >
                      <TrackerCard card={card} onDelete={onDelete} onUpdate={onUpdate} />
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {COLUMNS.filter(c => c.id !== col.id).map(c => (
                          <button
                            key={c.id}
                            onClick={() => moveCard(card.id, c.id)}
                            className="text-xs px-2 py-0.5 rounded transition-colors"
                            style={{ color: 'var(--rh-text-3)', background: 'var(--rh-surface)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = 'var(--rh-text-1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--rh-text-3)'; }}
                          >
                            → {c.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colCards.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center py-8 text-xs text-center"
                    style={{ color: 'var(--rh-text-3)' }}
                  >
                    <p>No items yet</p>
                    <button
                      onClick={() => addCard(col.id)}
                      className="mt-2 underline"
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--rh-text-2)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--rh-text-3)')}
                    >
                      Add one
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
