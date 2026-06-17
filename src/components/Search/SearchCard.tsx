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

const QUALITY_LABELS = { high: '★ High', medium: '◆ Medium', low: '▷ Low' };
const QUALITY_COLORS = {
  high: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-[#888] bg-[#fafafa] border-[#ebebeb]',
};
const DIFF_COLORS = {
  easy: 'text-emerald-600',
  medium: 'text-yellow-600',
  hard: 'text-red-600',
};

export function SearchCard({ item, isFavorited, isBookmarked, note, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const { copy, copiedId } = useClipboard();
  const [showNote, setShowNote] = useState(false);
  const isCopied = copiedId === item.id;

  const handleCopy = async () => {
    await copy(item.text, item.id);
    onCopy?.();
  };

  const openGoogle = () =>
    window.open(`https://www.google.com/search?q=${encodeURIComponent(item.text)}`, '_blank');

  const openLinkedIn = () => {
    const base =
      item.tab === 'posts'   ? 'https://www.linkedin.com/search/results/content/?keywords='
      : item.tab === 'people' ? 'https://www.linkedin.com/search/results/people/?keywords='
      : 'https://www.linkedin.com/jobs/search/?keywords=';
    window.open(`${base}${encodeURIComponent(item.text)}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rh-card-hover p-4"
    >
      {/* Search string */}
      <div className="relative mb-3">
        <pre className="rh-code overflow-x-auto whitespace-pre-wrap break-all">
          {item.text}
        </pre>
      </div>

      {/* Filters hint */}
      {item.filters && (
        <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--rh-text-3)' }}>
          <span style={{ color: 'var(--rh-text-2)' }}>Filters: </span>{item.filters}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {item.tags?.map(tag => (
          <span key={tag} className="rh-badge">{tag}</span>
        ))}
        {item.quality && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${QUALITY_COLORS[item.quality]}`}>
            {QUALITY_LABELS[item.quality]}
          </span>
        )}
        {item.difficulty && (
          <span className={`text-xs px-2 py-0.5 rounded-full rh-badge ${DIFF_COLORS[item.difficulty]}`}>
            {item.difficulty}
          </span>
        )}
        {item.tab && (
          <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full border border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20">
            {item.tab === 'jobs' ? 'Jobs tab' : item.tab === 'posts' ? 'Posts tab' : 'People tab'}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-pill-sm font-medium transition-all duration-150 border ${
            isCopied
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
              : 'bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe] dark:bg-blue-600/20 dark:hover:bg-blue-600/30 dark:text-blue-400 dark:border-blue-500/30'
          }`}
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                <Check size={11} /> Copied!
              </motion.span>
            ) : (
              <motion.span key="copy" className="flex items-center gap-1.5">
                <Copy size={11} /> Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {item.platform === 'google' && (
          <button
            onClick={openGoogle}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-pill-sm bg-[#fff7ed] hover:bg-[#ffedd5] text-[#c2410c] border border-[#fed7aa] dark:bg-orange-500/10 dark:hover:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/20 transition-colors"
          >
            <ExternalLink size={11} /> Search Google
          </button>
        )}

        {(item.platform === 'linkedin' || item.tab) && (
          <button
            onClick={openLinkedIn}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-pill-sm bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe] dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/20 transition-colors"
          >
            <Link2 size={11} /> Open LinkedIn
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={() => setShowNote(p => !p)}
          className="p-1.5 rounded-[6px] transition-colors"
          style={{ color: showNote ? 'var(--rh-text-1)' : 'var(--rh-text-3)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--rh-surface-2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          title="Add note"
        >
          <StickyNote size={14} />
        </button>

        <button
          onClick={() => onBookmark(item)}
          className="p-1.5 rounded-[6px] transition-colors"
          style={{ color: isBookmarked ? '#0070f3' : 'var(--rh-text-3)' }}
          onMouseEnter={e => {
            if (!isBookmarked) e.currentTarget.style.background = 'var(--rh-surface-2)';
          }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          title={isBookmarked ? 'Remove from Keywords' : 'Save to Keywords'}
        >
          <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={() => onToggleFavorite(item.id)}
          className="p-1.5 rounded-[6px] transition-colors"
          style={{ color: isFavorited ? '#d97706' : 'var(--rh-text-3)' }}
          onMouseEnter={e => {
            if (!isFavorited) e.currentTarget.style.background = 'var(--rh-surface-2)';
          }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
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
              className="rh-textarea mt-3"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
