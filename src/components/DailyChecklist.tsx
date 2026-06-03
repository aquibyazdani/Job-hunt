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

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <span className="text-base">✅</span>
        <div className="flex-1 text-left">
          <span className="text-white text-sm font-medium">Daily Checklist</span>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1.5">
            <div
              className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(count / total) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-slate-500">{count}/{total}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-slate-500" />
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
            <div className="px-4 pb-4 space-y-2">
              {DEFAULT_TASKS.map(task => {
                const done = completedToday.includes(task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => toggle(task.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    <span className={done ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}>
                      {done ? <CheckSquare size={16} /> : <Square size={16} />}
                    </span>
                    <span className={`text-sm transition-colors ${done ? 'text-slate-600 line-through' : 'text-slate-300 group-hover:text-white'}`}>
                      {task.text}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 mt-2 transition-colors"
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
