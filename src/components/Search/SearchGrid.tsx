import { motion } from 'framer-motion';
import { SearchCard } from './SearchCard';
import type { SearchString } from '../../types';

interface Props {
  strings: SearchString[];
  favorites: string[];
  bookmarkedIds: string[];
  notes: Record<string, string>;
  onToggleFavorite: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
  onBookmark: (item: SearchString) => void;
  onCopy?: () => void;
  title?: string;
  description?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export function SearchGrid({ strings, favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy, title, description }: Props) {
  if (!strings.length) return null;

  return (
    <div className="space-y-4">
      {(title || description) && (
        <div className="mb-2">
          {title && <h3 className="text-white font-semibold text-sm">{title}</h3>}
          {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
        </div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-3 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2"
      >
        {strings.map(item => (
          <SearchCard
            key={item.id}
            item={item}
            isFavorited={favorites.includes(item.id)}
            isBookmarked={bookmarkedIds.includes(item.id)}
            note={notes[item.id] || ''}
            onToggleFavorite={onToggleFavorite}
            onNoteChange={onNoteChange}
            onBookmark={onBookmark}
            onCopy={onCopy}
          />
        ))}
      </motion.div>
    </div>
  );
}
