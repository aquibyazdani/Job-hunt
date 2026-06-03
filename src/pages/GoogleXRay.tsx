import type { SearchString } from '../types';
import { ALL_GOOGLE_XRAY } from '../data/searchStrings';
import { SearchGrid } from '../components/Search/SearchGrid';

interface Props {
  favorites: string[];
  bookmarkedIds: string[];
  notes: Record<string, string>;
  onToggleFavorite: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
  onBookmark: (item: SearchString) => void;
  onCopy: () => void;
}

export function GoogleXRay({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-5">
        <h3 className="text-orange-300 font-semibold mb-2">What is Google X-Ray Search?</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Google X-Ray searches look inside LinkedIn content using Google's search engine. They handle complex Boolean operators perfectly, bypass LinkedIn's free account search limits, and surface results that LinkedIn's own search misses.
        </p>
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          Paste these strings directly into <strong className="text-slate-300">google.com</strong>, or click the "Search Google" button to open with the query pre-filled.
        </p>
      </div>

      {ALL_GOOGLE_XRAY.map(group => (
        <SearchGrid
          key={group.group}
          strings={group.strings}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title={group.group}
        />
      ))}
    </div>
  );
}
