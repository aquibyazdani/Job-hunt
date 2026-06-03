import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { TrackerCard as TrackerCardType, TrackerStatus } from '../types';
import { TrackerCard } from '../components/Tracker/TrackerCard';

const COLUMNS: { id: TrackerStatus; label: string; emoji: string; color: string }[] = [
  { id: 'saved', label: 'Saved', emoji: '🔖', color: 'border-slate-500/30' },
  { id: 'applied', label: 'Applied', emoji: '📤', color: 'border-blue-500/30' },
  { id: 'in_progress', label: 'In Progress', emoji: '🔄', color: 'border-yellow-500/30' },
  { id: 'offer', label: 'Offer', emoji: '🎉', color: 'border-emerald-500/30' },
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
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Track your job applications through the pipeline. Drag cards between columns or use the move button.
        </p>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colCards = cards.filter(c => c.status === col.id);
          return (
            <div key={col.id} className={`bg-white/3 border ${col.color} rounded-xl flex flex-col min-h-[200px]`}>
              {/* Column header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <span>{col.emoji}</span>
                  <span className="text-white text-sm font-medium">{col.label}</span>
                  <span className="text-xs bg-white/10 text-slate-400 px-1.5 py-0.5 rounded-full">
                    {colCards.length}
                  </span>
                </div>
                <button
                  onClick={() => addCard(col.id)}
                  className="text-slate-500 hover:text-white hover:bg-white/10 p-1 rounded transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                <AnimatePresence>
                  {colCards.map(card => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <TrackerCard card={card} onDelete={onDelete} onUpdate={onUpdate} />

                      {/* Move buttons */}
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {COLUMNS.filter(c => c.id !== col.id).map(c => (
                          <button
                            key={c.id}
                            onClick={() => moveCard(card.id, c.id)}
                            className="text-xs text-slate-600 hover:text-slate-300 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            → {c.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colCards.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-slate-700 text-xs text-center">
                    <p>No items yet</p>
                    <button onClick={() => addCard(col.id)} className="mt-2 text-slate-600 hover:text-slate-400 underline">
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
