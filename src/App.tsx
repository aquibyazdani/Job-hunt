import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, NAV_ITEMS } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { QuickSearchBar } from './components/Search/QuickSearchBar';
import { Home } from './pages/Home';
import { RemoteWorldwide } from './pages/RemoteWorldwide';
import { RemoteIndia } from './pages/RemoteIndia';
import { VisaSponsorship } from './pages/VisaSponsorship';
import { FreelanceContract } from './pages/FreelanceContract';
import { ForeignCurrency } from './pages/ForeignCurrency';
import { PeopleHiring } from './pages/PeopleHiring';
import { GoogleXRay } from './pages/GoogleXRay';
import { Tracker } from './pages/Tracker';
import { Settings } from './pages/Settings';
import { Keywords } from './pages/Keywords';
import { RemoteCompanies } from './pages/RemoteCompanies';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AppSettings, Bookmark, CompanyApplication, SearchString, Stats, TrackerCard } from './types';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  defaultCountry: '',
  targetRole: 'Senior Frontend Engineer',
  targetCompensation: '',
};

const DEFAULT_STATS: Stats = {
  copyCount: 0,
  favoritesCount: 0,
  daysActive: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streak: 1,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  const [settings, setSettings] = useLocalStorage<AppSettings>('rh-settings', DEFAULT_SETTINGS);
  const [favorites, setFavorites] = useLocalStorage<string[]>('rh-favorites', []);
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('rh-notes', {});
  const [trackerCards, setTrackerCards] = useLocalStorage<TrackerCard[]>('rh-tracker', []);
  const [stats, setStats] = useLocalStorage<Stats>('rh-stats', DEFAULT_STATS);
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('rh-bookmarks', []);
  const [companyApplications, setCompanyApplications] = useLocalStorage<Record<string, CompanyApplication>>('rh-company-apps', {});

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.classList.toggle('light', settings.theme === 'light');
  }, [settings.theme]);

  // Update streak on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = stats.lastActiveDate === yesterday ? stats.streak + 1 : 1;
      setStats(s => ({ ...s, lastActiveDate: today, streak: newStreak, copyCount: 0 }));
    }
  }, []);

  // Global Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickSearchOpen(p => !p);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const bookmarkedIds = bookmarks.map(b => b.id);

  const handleBookmark = useCallback((item: SearchString) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.id === item.id);
      if (exists) return prev.filter(b => b.id !== item.id);
      const newBm: Bookmark = {
        id: item.id,
        text: item.text,
        note: notes[item.id] || '',
        platform: item.platform,
        tab: item.tab,
        source: item.category,
        filters: item.filters,
        tags: item.tags,
        dateAdded: new Date().toLocaleDateString(),
      };
      return [newBm, ...prev];
    });
  }, [notes]);

  const addBookmark = useCallback((b: Bookmark) => {
    setBookmarks(prev => [b, ...prev]);
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const updateBookmarkNote = useCallback((id: string, note: string) => {
    setBookmarks(prev => prev.map(b => b.id === id ? { ...b, note } : b));
  }, []);

  const changeNote = useCallback((id: string, note: string) => {
    setNotes(prev => ({ ...prev, [id]: note }));
  }, []);

  const handleCopy = useCallback(() => {
    setStats(s => ({ ...s, copyCount: s.copyCount + 1 }));
  }, []);

  const addTrackerCard = useCallback((card: TrackerCard) => {
    setTrackerCards(prev => [card, ...prev]);
  }, []);

  const deleteTrackerCard = useCallback((id: string) => {
    setTrackerCards(prev => prev.filter(c => c.id !== id));
  }, []);

  const updateTrackerCard = useCallback((id: string, updates: Partial<TrackerCard>) => {
    setTrackerCards(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const updateCompanyApplication = useCallback((name: string, data: CompanyApplication) => {
    setCompanyApplications(prev => ({ ...prev, [name]: data }));
  }, []);

  const removeCompanyApplication = useCallback((name: string) => {
    setCompanyApplications(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const clearAll = () => {
    setFavorites([]);
    setNotes({});
    setTrackerCards([]);
    setBookmarks([]);
    setCompanyApplications({});
    setStats(DEFAULT_STATS);
  };

  const currentNav = NAV_ITEMS.find(n => n.id === currentPage) || NAV_ITEMS[0];

  const sharedProps = {
    favorites,
    bookmarkedIds,
    notes,
    onToggleFavorite: toggleFavorite,
    onNoteChange: changeNote,
    onBookmark: handleBookmark,
    onCopy: handleCopy,
  };

  const pageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home stats={stats} trackerCards={trackerCards} favoritesCount={favorites.length} onNavigate={setCurrentPage} />;
      case 'remote-worldwide':
        return <RemoteWorldwide {...sharedProps} />;
      case 'remote-india':
        return <RemoteIndia {...sharedProps} />;
      case 'visa-sponsorship':
        return <VisaSponsorship {...sharedProps} />;
      case 'freelance-contract':
        return <FreelanceContract {...sharedProps} />;
      case 'foreign-currency':
        return <ForeignCurrency {...sharedProps} />;
      case 'people-hiring':
        return <PeopleHiring {...sharedProps} />;
      case 'google-xray':
        return <GoogleXRay {...sharedProps} />;
      case 'remote-companies':
        return (
          <RemoteCompanies
            applications={companyApplications}
            onUpdate={updateCompanyApplication}
            onRemove={removeCompanyApplication}
          />
        );
      case 'keywords':
        return (
          <Keywords
            bookmarks={bookmarks}
            onAdd={addBookmark}
            onDelete={deleteBookmark}
            onUpdateNote={updateBookmarkNote}
          />
        );
      case 'tracker':
        return (
          <Tracker
            cards={trackerCards}
            onAdd={addTrackerCard}
            onDelete={deleteTrackerCard}
            onUpdate={updateTrackerCard}
          />
        );
      case 'settings':
        return (
          <Settings
            settings={settings}
            onUpdate={u => setSettings(s => ({ ...s, ...u }))}
            trackerCards={trackerCards}
            onClearAll={clearAll}
          />
        );
      default:
        return <Home stats={stats} trackerCards={trackerCards} favoritesCount={favorites.length} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${settings.theme === 'dark' ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-900'}`}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={settings.theme}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header
          title={currentNav.label}
          emoji={currentNav.emoji}
          theme={settings.theme}
          onThemeToggle={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
          onMenuOpen={() => setSidebarOpen(true)}
          onSearchOpen={() => setQuickSearchOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="rh-content p-4 sm:p-6 max-w-6xl mx-auto w-full"
            >
              {pageContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <QuickSearchBar isOpen={quickSearchOpen} onClose={() => setQuickSearchOpen(false)} />
    </div>
  );
}
