import { useState } from 'react';
import type { Platform, SearchString } from '../types';
import { REMOTE_INDIA_LINKEDIN, REMOTE_INDIA_GOOGLE } from '../data/searchStrings';
import { INDIA_PLATFORMS } from '../data/platforms';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';
import { ExternalPlatformGrid } from '../components/Search/ExternalPlatformCard';

const INSTRUCTIONS = [
  { step: 1, text: 'Use LinkedIn search with "India" or "APAC" filters for remote roles' },
  { step: 2, text: 'Copy a string and paste into LinkedIn Jobs or Posts tab' },
  { step: 3, text: 'Set Location: India, Remote ✓, Experience: Mid-Senior' },
  { step: 4, text: 'For Google X-Ray: paste strings directly into google.com' },
  { step: 5, text: 'Apply to Turing/Arc/Toptal via the "Other Platforms" tab for USD pay' },
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

export function RemoteIndia({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Remote opportunities that explicitly hire from India or APAC timezone. Includes USD-paying platforms like Turing, Arc.dev, and Toptal.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />
      <PlatformToggle value={platform} onChange={setPlatform} />

      {platform === 'linkedin' && (
        <SearchGrid
          strings={REMOTE_INDIA_LINKEDIN}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="LinkedIn Search Strings"
          description="Jobs & Posts tabs for India-remote roles"
        />
      )}
      {platform === 'google' && (
        <SearchGrid
          strings={REMOTE_INDIA_GOOGLE}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="Google X-Ray Strings"
          description="Deep-search LinkedIn and platform sites from India"
        />
      )}
      {platform === 'other' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">
            These platforms actively hire senior developers from India and pay in USD or competitive rates.
          </p>
          <ExternalPlatformGrid platforms={INDIA_PLATFORMS} />
        </div>
      )}
    </div>
  );
}
