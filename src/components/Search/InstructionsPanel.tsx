import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';

interface Step {
  step: number;
  text: string;
}

interface Props {
  steps: Step[];
  title?: string;
}

export function InstructionsPanel({ steps, title = 'How to use' }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-blue-500/8 transition-colors"
      >
        <BookOpen size={15} className="text-blue-400 flex-shrink-0" />
        <span className="text-blue-300 text-sm font-medium flex-1">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={15} className="text-blue-400" />
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
              {steps.map(s => (
                <div key={s.step} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                    {s.step}
                  </span>
                  <span className="text-slate-400 leading-relaxed pt-0.5">{s.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
