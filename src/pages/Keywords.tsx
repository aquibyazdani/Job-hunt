import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Copy, Check, ExternalLink, Link2,
  Search, StickyNote, Bookmark,
} from 'lucide-react';
import type { Bookmark as BookmarkType } from '../types';
import { useClipboard } from '../hooks/useClipboard';

interface Props {
  bookmarks: BookmarkType[];
  onAdd: (b: BookmarkType) => void;
  onDelete: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
}

type FilterPlatform = 'all' | 'linkedin' | 'google';

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  google: 'Google X-Ray',
  other: 'Other',
};

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
  google: 'text-orange-300 bg-orange-500/10 border-orange-500/20',
  other: 'text-slate-300 bg-white/8 border-white/15',
};

const TAB_LABELS: Record<string, string> = {
  jobs: 'Jobs tab',
  posts: 'Posts tab',
  people: 'People tab',
};

export function Keywords({ bookmarks, onAdd, onDelete, onUpdateNote }: Props) {
  const { copy, copiedId } = useClipboard();
  const [filter, setFilter] = useState<FilterPlatform>('all');
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newPlatform, setNewPlatform] = useState<'linkedin' | 'google'>('linkedin');
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  const toggleNote = (id: string) => {
    setExpandedNotes(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    if (!newText.trim()) return;
    const bm: BookmarkType = {
      id: `bm-${Date.now()}`,
      text: newText.trim(),
      note: newNote.trim(),
      platform: newPlatform,
      source: 'Custom',
      dateAdded: new Date().toLocaleDateString(),
    };
    onAdd(bm);
    setNewText('');
    setNewNote('');
    setShowAddForm(false);
  };

  const openSearch = (bm: BookmarkType) => {
    if (bm.platform === 'google') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(bm.text)}`, '_blank');
    } else {
      const base = bm.tab === 'posts'
        ? 'https://www.linkedin.com/search/results/content/?keywords='
        : bm.tab === 'people'
          ? 'https://www.linkedin.com/search/results/people/?keywords='
          : 'https://www.linkedin.com/jobs/search/?keywords=';
      window.open(`${base}${encodeURIComponent(bm.text)}`, '_blank');
    }
  };

  const filtered = bookmarks.filter(b => {
    const matchesPlatform = filter === 'all' || b.platform === filter;
    const matchesSearch = !search.trim() ||
      b.text.toLowerCase().includes(search.toLowerCase()) ||
      b.note.toLowerCase().includes(search.toLowerCase()) ||
      b.source.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page description */}
      <div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Your saved search keywords and strings. Bookmark any search string from the category pages using the{' '}
          <Bookmark size={12} className="inline text-blue-400" fill="currentColor" />{' '}
          icon, or add a custom keyword below.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search filter */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter keywords..."
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Platform filter */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {(['all', 'linkedin', 'google'] as FilterPlatform[]).map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p === 'all' ? 'All' : p === 'linkedin' ? 'LinkedIn' : 'Google'}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Add button */}
        <button
          onClick={() => setShowAddForm(p => !p)}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus size={15} />
          Add Keyword
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-5 space-y-4">
              <h3 className="text-white font-semibold text-sm">Add Custom Keyword</h3>

              {/* Platform toggle */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs w-16">Platform</span>
                <div className="flex gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                  {(['linkedin', 'google'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setNewPlatform(p)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        newPlatform === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {p === 'linkedin' ? <Link2 size={11} /> : <ExternalLink size={11} />}
                      {p === 'linkedin' ? 'LinkedIn' : 'Google X-Ray'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword input */}
              <div>
                <label className="text-slate-400 text-xs block mb-1.5">Search string / keyword</label>
                <textarea
                  autoFocus
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAdd(); }}
                  placeholder={
                    newPlatform === 'google'
                      ? 'site:linkedin.com/jobs/view "senior frontend" "React" "remote"'
                      : '"senior frontend engineer" OR "senior react engineer"'
                  }
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 font-mono resize-none focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Note input */}
              <div>
                <label className="text-slate-400 text-xs block mb-1.5">Note (optional)</label>
                <input
                  type="text"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="e.g. Best for early morning searches, filter by past week"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!newText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Save Keyword
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewText(''); setNewNote(''); }}
                  className="px-4 py-2 bg-white/8 hover:bg-white/15 text-slate-300 text-sm rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <span className="text-slate-600 text-xs self-center ml-1 hidden sm:block">⌘↵ to save</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Count */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-xs">
          {filtered.length} keyword{filtered.length !== 1 ? 's' : ''}
          {filter !== 'all' || search ? ' matching filters' : ' saved'}
        </span>
        {bookmarks.length > 0 && (
          <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
            {bookmarks.length} total
          </span>
        )}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
            <Bookmark size={20} className="text-slate-600" />
          </div>
          <p className="text-slate-500 text-sm">
            {bookmarks.length === 0
              ? 'No keywords saved yet'
              : 'No keywords match your filters'}
          </p>
          <p className="text-slate-600 text-xs mt-1">
            {bookmarks.length === 0
              ? 'Click the bookmark icon on any search string, or add one above'
              : 'Try clearing the search or changing the platform filter'}
          </p>
          {bookmarks.length === 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Plus size={14} /> Add your first keyword
            </button>
          )}
        </div>
      )}

      {/* Bookmark cards */}
      <motion.div
        className="grid gap-3 xl:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
      >
        <AnimatePresence>
          {filtered.map(bm => (
            <motion.div
              key={bm.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 hover:bg-white/8 transition-all duration-200 group"
            >
              {/* Header row */}
              <div className="flex items-start gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <pre className="font-mono text-sm text-blue-300 bg-navy-950/60 rounded-lg px-3 py-2.5 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed border border-blue-500/10">
                    {bm.text}
                  </pre>
                </div>
              </div>

              {/* Meta tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PLATFORM_COLORS[bm.platform] || PLATFORM_COLORS.other}`}>
                  {PLATFORM_LABELS[bm.platform] || bm.platform}
                </span>
                {bm.tab && (
                  <span className="text-xs px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                    {TAB_LABELS[bm.tab] || bm.tab}
                  </span>
                )}
                {bm.source !== 'Custom' && (
                  <span className="text-xs px-2 py-0.5 bg-white/5 text-slate-500 rounded-full">
                    {bm.source}
                  </span>
                )}
                {bm.source === 'Custom' && (
                  <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    Custom
                  </span>
                )}
                {bm.tags?.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-white/5 text-slate-500 rounded-full">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-slate-700 ml-auto self-center">{bm.dateAdded}</span>
              </div>

              {/* Note preview */}
              {bm.note && !expandedNotes.has(bm.id) && (
                <p className="text-xs text-slate-500 italic mb-3 truncate">"{bm.note}"</p>
              )}

              {/* Expanded note edit */}
              <AnimatePresence>
                {expandedNotes.has(bm.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-3"
                  >
                    <textarea
                      value={bm.note}
                      onChange={e => onUpdateNote(bm.id, e.target.value)}
                      placeholder="Add a note about this keyword..."
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500 font-sans"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Copy */}
                <button
                  onClick={() => copy(bm.text, bm.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                    copiedId === bm.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {copiedId === bm.id ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
                </button>

                {/* Open */}
                <button
                  onClick={() => openSearch(bm)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                    bm.platform === 'google'
                      ? 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/20'
                      : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border-blue-500/20'
                  }`}
                >
                  {bm.platform === 'google'
                    ? <><ExternalLink size={11} /> Search Google</>
                    : <><Link2 size={11} /> Open LinkedIn</>
                  }
                </button>

                <div className="flex-1" />

                {/* Note toggle */}
                <button
                  onClick={() => toggleNote(bm.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    expandedNotes.has(bm.id) || bm.note
                      ? 'text-yellow-400 hover:text-yellow-300'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-white/8'
                  }`}
                  title="Edit note"
                >
                  <StickyNote size={14} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDelete(bm.id)}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove bookmark"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
