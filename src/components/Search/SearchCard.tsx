import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, Star, StickyNote, Link2, Bookmark } from 'lucide-react';
import type { SearchString } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';

interface Props {
  item: SearchString;
  isFavorited: boolean;
  isBookmarked: boolean;
  note: string;
  onToggleFavorite: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
  onBookmark: (item: SearchString) => void;
  onCopy?: () => void;
}

const QUALITY_COLORS = {
  high: 'text-emerald-400 bg-emerald-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  low: 'text-slate-400 bg-slate-400/10',
};

const DIFF_COLORS = {
  easy: 'text-emerald-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
};

export function SearchCard({ item, isFavorited, isBookmarked, note, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const { copy, copiedId } = useClipboard();
  const [showNote, setShowNote] = useState(false);
  const isCopied = copiedId === item.id;

  const handleCopy = async () => {
    await copy(item.text, item.id);
    onCopy?.();
  };

  const openGoogle = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(item.text)}`, '_blank');
  };

  const openLinkedIn = () => {
    const base = item.tab === 'posts'
      ? 'https://www.linkedin.com/search/results/content/?keywords='
      : item.tab === 'people'
        ? 'https://www.linkedin.com/search/results/people/?keywords='
        : 'https://www.linkedin.com/jobs/search/?keywords=';
    window.open(`${base}${encodeURIComponent(item.text)}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-white/8 transition-all duration-200"
    >
      {/* Search string */}
      <div className="relative mb-3">
        <pre className="font-mono text-sm text-blue-300 bg-navy-950/60 rounded-lg px-4 py-3 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed border border-blue-500/10">
          {item.text}
        </pre>
      </div>

      {/* Filters hint */}
      {item.filters && (
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">
          <span className="text-slate-600">Filters: </span>{item.filters}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.tags?.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-white/8 text-slate-400 rounded-full border border-white/8">
            {tag}
          </span>
        ))}
        {item.quality && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${QUALITY_COLORS[item.quality]}`}>
            {item.quality === 'high' ? '★ High quality' : item.quality === 'medium' ? '◆ Medium' : '▷ Low'}
          </span>
        )}
        {item.difficulty && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${DIFF_COLORS[item.difficulty]}`}>
            {item.difficulty}
          </span>
        )}
        {item.tab && (
          <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
            {item.tab === 'jobs' ? 'Jobs tab' : item.tab === 'posts' ? 'Posts tab' : 'People tab'}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
            isCopied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30'
          }`}
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1.5"
              >
                <Check size={12} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" className="flex items-center gap-1.5">
                <Copy size={12} /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {item.platform === 'google' && (
          <button onClick={openGoogle} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 transition-colors">
            <ExternalLink size={12} /> Search Google
          </button>
        )}

        {(item.platform === 'linkedin' || item.tab) && (
          <button onClick={openLinkedIn} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 transition-colors">
            <Link2 size={12} /> Open LinkedIn
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={() => setShowNote(p => !p)}
          className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/8 transition-colors"
          title="Add note"
        >
          <StickyNote size={14} />
        </button>

        <button
          onClick={() => onBookmark(item)}
          className={`p-1.5 rounded-lg transition-colors ${
            isBookmarked
              ? 'text-blue-400 hover:text-blue-300'
              : 'text-slate-500 hover:text-blue-400 hover:bg-white/8'
          }`}
          title={isBookmarked ? 'Remove from Keywords' : 'Save to Keywords'}
        >
          <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={() => onToggleFavorite(item.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            isFavorited
              ? 'text-yellow-400 hover:text-yellow-300'
              : 'text-slate-500 hover:text-yellow-400 hover:bg-white/8'
          }`}
          title={isFavorited ? 'Remove from favorites' : 'Star'}
        >
          <Star size={14} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Note field */}
      <AnimatePresence>
        {showNote && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <textarea
              value={note}
              onChange={e => onNoteChange(item.id, e.target.value)}
              placeholder="Add your notes here..."
              rows={2}
              className="w-full mt-3 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 font-sans"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
