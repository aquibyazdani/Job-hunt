import { useState } from 'react';
import type { Platform, SearchString } from '../types';
import {
  FREELANCE_JOBS_LINKEDIN,
  FREELANCE_POSTS_LINKEDIN,
  FREELANCE_GOOGLE,
} from '../data/searchStrings';
import { FREELANCE_PLATFORMS } from '../data/platforms';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';
import { ExternalPlatformGrid } from '../components/Search/ExternalPlatformCard';

const INSTRUCTIONS = [
  { step: 1, text: 'Jobs tab strings: paste into LinkedIn → Jobs → filter Job type: Contract' },
  { step: 2, text: 'Posts tab strings: paste into LinkedIn → Posts tab → Date: Past week' },
  { step: 3, text: 'Google X-Ray scans LinkedIn posts to find people actively looking for contractors' },
  { step: 4, text: 'Also check Other Platforms like Upwork, Gun.io, and Braintrust for ongoing contracts' },
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

export function FreelanceContract({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Find contract, freelance, fractional, and part-time remote roles. Includes both formal job listings and LinkedIn posts from people actively looking for contractors.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />
      <PlatformToggle value={platform} onChange={setPlatform} />

      {platform === 'linkedin' && (
        <div className="space-y-6">
          <SearchGrid
            strings={FREELANCE_JOBS_LINKEDIN}
            favorites={favorites}
            bookmarkedIds={bookmarkedIds}
            notes={notes}
            onToggleFavorite={onToggleFavorite}
            onNoteChange={onNoteChange}
            onBookmark={onBookmark}
            onCopy={onCopy}
            title="Jobs Tab — Formal Listings"
            description="Set Job type: Contract, Remote ✓"
          />
          <SearchGrid
            strings={FREELANCE_POSTS_LINKEDIN}
            favorites={favorites}
            bookmarkedIds={bookmarkedIds}
            notes={notes}
            onToggleFavorite={onToggleFavorite}
            onNoteChange={onNoteChange}
            onBookmark={onBookmark}
            onCopy={onCopy}
            title="Posts Tab — People Hiring"
            description="Switch to Posts tab on LinkedIn, Date: Past week"
          />
        </div>
      )}
      {platform === 'google' && (
        <SearchGrid
          strings={FREELANCE_GOOGLE}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="Google X-Ray — Freelance & Contract"
        />
      )}
      {platform === 'other' && (
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">Top freelance and contract platforms for senior React engineers.</p>
          <ExternalPlatformGrid platforms={FREELANCE_PLATFORMS} />
        </div>
      )}
    </div>
  );
}
