import { useState } from 'react';
import type { Platform, SearchString } from '../types';
import {
  PEOPLE_POSTS_LINKEDIN,
  PEOPLE_DECISION_MAKERS,
  PEOPLE_GOOGLE,
} from '../data/searchStrings';
import { SearchGrid } from '../components/Search/SearchGrid';
import { PlatformToggle } from '../components/Search/PlatformToggle';
import { InstructionsPanel } from '../components/Search/InstructionsPanel';

const INSTRUCTIONS = [
  { step: 1, text: 'Posts tab strings: paste into LinkedIn → Posts tab → Date: Past week' },
  { step: 2, text: 'People tab strings: find CTOs, founders, and EMs who might need freelancers' },
  { step: 3, text: 'Comment on their content before reaching out (warm connection strategy)' },
  { step: 4, text: 'Google X-Ray profiles: finds decision makers mentioning remote-first or distributed teams' },
  { step: 5, text: "DM with a short pitch: \"I'm a Senior React engineer open to contract work...\"" },
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

export function PeopleHiring({ favorites, bookmarkedIds, notes, onToggleFavorite, onNoteChange, onBookmark, onCopy }: Props) {
  const [platform, setPlatform] = useState<Platform>('linkedin');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-400 text-sm">
          Find founders, CTOs, and engineering managers actively looking for freelance React engineers. These outbound searches bypass formal job postings entirely.
        </p>
      </div>

      <InstructionsPanel steps={INSTRUCTIONS} />
      <PlatformToggle value={platform} onChange={setPlatform} showOther={false} />

      {platform === 'linkedin' && (
        <div className="space-y-6">
          <SearchGrid
            strings={PEOPLE_POSTS_LINKEDIN}
            favorites={favorites}
            bookmarkedIds={bookmarkedIds}
            notes={notes}
            onToggleFavorite={onToggleFavorite}
            onNoteChange={onNoteChange}
            onBookmark={onBookmark}
            onCopy={onCopy}
            title="Posts Tab — People Actively Hiring"
            description="Use LinkedIn → Posts tab, Date: Past week"
          />
          <SearchGrid
            strings={PEOPLE_DECISION_MAKERS}
            favorites={favorites}
            bookmarkedIds={bookmarkedIds}
            notes={notes}
            onToggleFavorite={onToggleFavorite}
            onNoteChange={onNoteChange}
            onBookmark={onBookmark}
            onCopy={onCopy}
            title="People Tab — Decision Makers"
            description="Find CTOs, Founders, Engineering Managers via LinkedIn People tab"
          />
        </div>
      )}
      {platform === 'google' && (
        <SearchGrid
          strings={PEOPLE_GOOGLE}
          favorites={favorites}
          bookmarkedIds={bookmarkedIds}
          notes={notes}
          onToggleFavorite={onToggleFavorite}
          onNoteChange={onNoteChange}
          onBookmark={onBookmark}
          onCopy={onCopy}
          title="Google X-Ray — Posts & Profiles"
          description="Find hiring posts and decision maker profiles via Google"
        />
      )}
    </div>
  );
}
