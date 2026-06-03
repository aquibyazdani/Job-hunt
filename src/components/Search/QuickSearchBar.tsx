import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Copy, Check, ExternalLink } from 'lucide-react';
import { generateCustomStrings } from '../../hooks/useSearchStrings';
import { useClipboard } from '../../hooks/useClipboard';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchBar({ isOpen, onClose }: Props) {
  const [keyword, setKeyword] = useState('');
  const { copy, copiedId } = useClipboard();
  const strings = generateCustomStrings(keyword);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) return;
      }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 z-50"
          >
            <div className="bg-navy-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={18} className="text-slate-400" />
                <input
                  autoFocus
                  type="text"
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
                  placeholder="Type any keyword (e.g. 'React', 'TypeScript', 'Next.js')..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-base font-sans"
                />
                <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded">
                  <X size={18} />
                </button>
              </div>

              {/* Generated strings */}
              {keyword.trim() && (
                <div className="p-4 space-y-3">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Generated Search Strings</p>

                  {/* LinkedIn */}
                  <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-blue-400 font-medium">LinkedIn Jobs</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copy(strings.linkedin, 'li')}
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 px-2 py-1 bg-blue-500/10 rounded-lg"
                        >
                          {copiedId === 'li' ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                        </button>
                        <button
                          onClick={() => window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(strings.linkedin)}`, '_blank')}
                          className="flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 px-2 py-1 bg-blue-500/10 rounded-lg"
                        >
                          <ExternalLink size={10} /> Open
                        </button>
                      </div>
                    </div>
                    <code className="font-mono text-sm text-blue-200">{strings.linkedin}</code>
                  </div>

                  {/* Google */}
                  <div className="bg-orange-500/8 border border-orange-500/20 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-orange-400 font-medium">Google X-Ray</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copy(strings.google, 'g')}
                          className="flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 px-2 py-1 bg-orange-500/10 rounded-lg"
                        >
                          {copiedId === 'g' ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                        </button>
                        <button
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(strings.google)}`, '_blank')}
                          className="flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 px-2 py-1 bg-orange-500/10 rounded-lg"
                        >
                          <ExternalLink size={10} /> Search
                        </button>
                      </div>
                    </div>
                    <code className="font-mono text-sm text-orange-200">{strings.google}</code>
                  </div>
                </div>
              )}

              {!keyword.trim() && (
                <div className="p-6 text-center">
                  <p className="text-slate-500 text-sm">Start typing to generate custom search strings</p>
                  <p className="text-slate-600 text-xs mt-1">Press Esc to close</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
