import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, ChevronDown, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DEFAULT_TASKS = [
  { id: 't1', text: 'Comment on 3 posts by senior people' },
  { id: 't2', text: 'Send 5 connection requests' },
  { id: 't3', text: 'Reply to new connections' },
  { id: 't4', text: 'Apply to 2 jobs from search results' },
  { id: 't5', text: 'Run 3 new X-Ray searches' },
  { id: 't6', text: 'Update tracker with new applications' },
];

interface StoredChecklist {
  date: string;
  completed: string[];
}

export function DailyChecklist() {
  const [isOpen, setIsOpen] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  const [data, setData] = useLocalStorage<StoredChecklist>('daily-checklist', {
    date: today,
    completed: [],
  });

  const completedToday = data.date === today ? data.completed : [];
  const toggle = (id: string) => {
    const newCompleted = completedToday.includes(id)
      ? completedToday.filter(i => i !== id)
      : [...completedToday, id];
    setData({ date: today, completed: newCompleted });
  };
  const reset = () => setData({ date: today, completed: [] });

  const count = completedToday.length;
  const total = DEFAULT_TASKS.length;
  const progress = (count / total) * 100;

  return (
    <div className="rh-card overflow-hidden">
      <button
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors"
        style={{ color: 'var(--rh-text-1)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--rh-surface-2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        <span className="text-base">✅</span>
        <div className="flex-1 text-left">
          <span className="text-sm font-medium">Daily Checklist</span>
          <div
            className="w-full rounded-full h-1 mt-1.5"
            style={{ background: 'var(--rh-border)' }}
          >
            <div
              className="h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: '#15803d' }}
            />
          </div>
        </div>
        <span className="text-xs" style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}>
          {count}/{total}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} style={{ color: 'var(--rh-text-3)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 space-y-1.5 border-t"
              style={{ borderColor: 'var(--rh-border)' }}
            >
              <div className="pt-3 space-y-1">
                {DEFAULT_TASKS.map(task => {
                  const done = completedToday.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggle(task.id)}
                      className="w-full flex items-center gap-3 text-left py-1.5 rounded-[6px] px-2 transition-colors group"
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--rh-surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ color: done ? '#15803d' : 'var(--rh-text-3)' }}>
                        {done ? <CheckSquare size={15} /> : <Square size={15} />}
                      </span>
                      <span
                        className={`text-sm transition-colors ${done ? 'line-through' : ''}`}
                        style={{ color: done ? 'var(--rh-text-3)' : 'var(--rh-text-2)' }}
                      >
                        {task.text}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs mt-2 transition-colors"
                style={{ color: 'var(--rh-text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--rh-text-2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--rh-text-3)')}
              >
                <RotateCcw size={11} /> Reset for today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
