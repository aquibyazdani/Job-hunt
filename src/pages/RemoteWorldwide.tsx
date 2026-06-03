import { useState } from 'react';
import type { Platform, SearchString } from '../types';
import { WORLDWIDE_COUNTRIES } from '../data/countries';
import {
  REMOTE_WORLDWIDE_LINKEDIN,
  REMOTE_WORLDWIDE_GOOGLE,
} from '../data/searchStrings';
import { useSearchStrings } from '../hooks/useSearchStrings';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { CountrySelector } from '../components/Search/CountrySelector';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';

const INSTRUCTIONS = [
  { step: 1, text: 'Select your target country from the dropdown above' },
  { step: 2, text: 'Copy any search string below' },
  { step: 3, text: 'Open LinkedIn → Jobs tab → paste in search bar' },
  { step: 4, text: 'Set filters: Remote ✓, Experience: Mid-Senior, Date: Past week' },
  { step: 5, text: 'Turn OFF Easy Apply (better quality listings)' },
  { step: 6, text: 'Open each job → Ctrl+F for "no visa" or "must be authorized" to verify' },
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

export function RemoteWorldwide({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [country, setCountry] = useState('');

  const selectedCountry = WORLDWIDE_COUNTRIES.find(c => c.code === country);
  const countryName = selectedCountry?.name || '';

  const linkedinStrings = useSearchStrings(REMOTE_WORLDWIDE_LINKEDIN, country, countryName);
  const googleStrings = useSearchStrings(REMOTE_WORLDWIDE_GOOGLE, country, countryName);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-slate-400 text-sm">
          Find senior frontend / React remote roles worldwide paying in USD, EUR, or GBP. These strings are optimized for LinkedIn Jobs search and Google X-Ray to surface the highest quality remote opportunities.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <PlatformToggle value={platform} onChange={setPlatform} showOther={false} />
        <CountrySelector countries={WORLDWIDE_COUNTRIES} value={country} onChange={setCountry} />
        {country && (
          <button onClick={() => setCountry('')} className="text-xs text-slate-500 hover:text-slate-300 underline">
            Clear
          </button>
        )}
      </div>

      {/* Strings */}
      {platform === 'linkedin' && (
        <SearchGrid
          strings={linkedinStrings}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="LinkedIn Search Strings"
          description="Paste into LinkedIn → Jobs tab"
        />
      )}
      {platform === 'google' && (
        <SearchGrid
          strings={googleStrings}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="Google X-Ray Strings"
          description="Paste into Google.com search"
        />
      )}
    </div>
  );
}
