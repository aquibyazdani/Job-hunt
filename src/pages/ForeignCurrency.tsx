import { useState } from 'react';
import type { Platform, SearchString } from '../types';
import { FOREIGN_CURRENCY_LINKEDIN, FOREIGN_CURRENCY_GOOGLE } from '../data/searchStrings';
import { FOREIGN_CURRENCY_PLATFORMS } from '../data/platforms';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';
import { ExternalPlatformGrid } from '../components/Search/ExternalPlatformCard';

const INSTRUCTIONS = [
  { step: 1, text: 'Look for jobs with explicit USD/EUR/GBP mentions in the title or description' },
  { step: 2, text: 'Filter by Location: US, UK, or EU to get internationally-paying companies' },
  { step: 3, text: 'Use Levels.fyi to verify comp ranges before applying' },
  { step: 4, text: 'Wellfound and Otta show salary ranges upfront — great for benchmarking' },
];

interface Props {
  favorites: string[];
  bookmarkedIds: string[];
  notes: Record<string, string>;
  onToggleFavorite: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
  onBookmark: (item: SearchString) => void;
  onCopy: () => void;
}

export function ForeignCurrency({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Target remote roles that explicitly offer USD, EUR, or GBP compensation. Ideal for maximizing earnings as an India-based engineer.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />
      <PlatformToggle value={platform} onChange={setPlatform} />

      {platform === 'linkedin' && (
        <SearchGrid
          strings={FOREIGN_CURRENCY_LINKEDIN}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="LinkedIn — Foreign Currency Roles"
        />
      )}
      {platform === 'google' && (
        <SearchGrid
          strings={FOREIGN_CURRENCY_GOOGLE}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="Google X-Ray — USD/EUR/GBP Jobs"
        />
      )}
      {platform === 'other' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">Platforms known for transparent compensation and international pay.</p>
          <ExternalPlatformGrid platforms={FOREIGN_CURRENCY_PLATFORMS} />
        </div>
      )}
    </div>
  );
}
