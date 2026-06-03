import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Platform, SearchString } from '../types';
import { VISA_COUNTRIES } from '../data/countries';
import { VISA_LINKEDIN, VISA_GOOGLE } from '../data/searchStrings';
import { VISA_PLATFORMS } from '../data/platforms';
import { useSearchStrings } from '../hooks/useSearchStrings';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { CountrySelector } from '../components/Search/CountrySelector';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';
import { ExternalPlatformGrid } from '../components/Search/ExternalPlatformCard';

const INSTRUCTIONS = [
  { step: 1, text: 'Select target country — the visa type will be shown automatically' },
  { step: 2, text: 'Copy a search string and paste into LinkedIn Jobs tab' },
  { step: 3, text: 'Set filters: Location: [country], Experience: Mid-Senior, Date: Past week' },
  { step: 4, text: 'Open each job → Ctrl+F for "no visa" or "must be authorized" to exclude non-sponsors' },
  { step: 5, text: 'For Google X-Ray: the -"no visa" exclusion is already included in the strings' },
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

export function VisaSponsorship({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [country, setCountry] = useState('');

  const selectedCountry = VISA_COUNTRIES.find(c => c.code === country);
  const countryName = selectedCountry?.name || '';

  const linkedinStrings = useSearchStrings(VISA_LINKEDIN, country, countryName);
  const googleStrings = useSearchStrings(VISA_GOOGLE, country, countryName);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Find companies that actively sponsor work visas and relocation for senior frontend engineers. Each country shows its primary visa type.
        </p>
      </div>

      <div className="flex gap-3 p-4 bg-yellow-500/8 border border-yellow-500/20 rounded-xl">
        <AlertTriangle size={16} className="text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-yellow-300/80 text-sm leading-relaxed">
          Always open the full job description and <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Ctrl+F</kbd> for{' '}
          <span className="text-yellow-200">"no visa"</span> or{' '}
          <span className="text-yellow-200">"must be authorized"</span> — LinkedIn may still show non-sponsoring jobs in these results.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />

      <div className="flex flex-wrap gap-3 items-center">
        <PlatformToggle value={platform} onChange={setPlatform} />
        {(platform === 'linkedin' || platform === 'google') && (
          <CountrySelector countries={VISA_COUNTRIES} value={country} onChange={setCountry} showVisaType />
        )}
      </div>

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
          title="LinkedIn Visa Sponsorship Strings"
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
          title="Google X-Ray — Visa Sponsorship"
          description="Includes exclusions for non-sponsoring listings"
        />
      )}
      {platform === 'other' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">Specialized platforms focused on relocation and visa-sponsored roles.</p>
          <ExternalPlatformGrid platforms={VISA_PLATFORMS} />
        </div>
      )}
    </div>
  );
}
