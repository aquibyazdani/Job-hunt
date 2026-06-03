import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ExternalLink, CheckCircle2, Circle, X,
  ChevronDown, ChevronUp, Globe, Building2
} from 'lucide-react';
import type { CompanyApplication } from '../types';
import { REMOTE_COMPANIES } from '../data/remoteCompanies';

const NOTICE_OPTIONS = [
  'Immediate',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
  '90 days',
  'Other',
];

interface ApplyModal {
  companyName: string;
  ctc: string;
  noticePeriod: string;
  notes: string;
}

interface Props {
  applications: Record<string, CompanyApplication>;
  onUpdate: (name: string, data: CompanyApplication) => void;
  onRemove: (name: string) => void;
}

type SortKey = 'name' | 'region' | 'appliedDate';

export function RemoteCompanies({ applications, onUpdate, onRemove }: Props) {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [modal, setModal] = useState<ApplyModal | null>(null);

  const appliedCount = Object.values(applications).filter(a => a.applied).length;

  const filtered = useMemo(() => {
    let list = REMOTE_COMPANIES.filter(c => {
      const q = search.toLowerCase();
      const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q);
      const matchesRegion = !regionFilter || c.region.toLowerCase().includes(regionFilter.toLowerCase());
      const matchesApplied = !showAppliedOnly || applications[c.name]?.applied;
      return matchesSearch && matchesRegion && matchesApplied;
    });

    list = [...list].sort((a, b) => {
      if (sortKey === 'name') return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortKey === 'region') return sortAsc ? a.region.localeCompare(b.region) : b.region.localeCompare(a.region);
      if (sortKey === 'appliedDate') {
        const da = applications[a.name]?.appliedDate || '';
        const db = applications[b.name]?.appliedDate || '';
        return sortAsc ? da.localeCompare(db) : db.localeCompare(da);
      }
      return 0;
    });

    return list;
  }, [search, regionFilter, showAppliedOnly, sortKey, sortAsc, applications]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortAsc ? <ChevronUp size={12} className="inline ml-0.5" /> : <ChevronDown size={12} className="inline ml-0.5" />
      : null;

  const openApplyModal = (name: string) => {
    const existing = applications[name];
    setModal({
      companyName: name,
      ctc: existing?.ctc || '',
      noticePeriod: existing?.noticePeriod || '30 days',
      notes: existing?.notes || '',
    });
  };

  const saveApplication = () => {
    if (!modal) return;
    onUpdate(modal.companyName, {
      applied: true,
      ctc: modal.ctc,
      noticePeriod: modal.noticePeriod,
      notes: modal.notes,
      appliedDate: applications[modal.companyName]?.appliedDate || new Date().toLocaleDateString(),
    });
    setModal(null);
  };

  const unapply = (name: string) => {
    if (confirm(`Remove application record for ${name}?`)) onRemove(name);
  };

  const regionOptions = useMemo(() => {
    const regions = new Set<string>();
    REMOTE_COMPANIES.forEach(c => {
      c.region.split(',').forEach(r => regions.add(r.trim()));
    });
    return Array.from(regions).sort();
  }, []);

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
          <CheckCircle2 size={15} className="text-emerald-400" />
          <span className="text-emerald-400 font-semibold text-sm">{appliedCount}</span>
          <span className="text-emerald-600 text-xs">applied</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <Building2 size={15} className="text-slate-400" />
          <span className="text-white font-semibold text-sm">{REMOTE_COMPANIES.length}</span>
          <span className="text-slate-500 text-xs">total companies</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <Globe size={15} className="text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">{filtered.length}</span>
          <span className="text-slate-500 text-xs">showing</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company or region..."
            className="w-full pl-8 pr-3 py-2 bg-slate-800 border border-slate-600 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Region filter */}
        <div className="relative">
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="appearance-none bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-xl pl-3 pr-7 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="">All regions</option>
            {regionOptions.map(r => <option key={r} value={r} className="bg-slate-800">{r}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Applied only toggle */}
        <button
          onClick={() => setShowAppliedOnly(p => !p)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm border transition-colors ${
            showAppliedOnly
              ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckCircle2 size={13} />
          Applied only
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="text-left px-4 py-3 w-10">
                <span className="text-slate-500 text-xs font-medium">✓</span>
              </th>
              <th
                className="text-left px-4 py-3 text-slate-400 font-medium text-xs cursor-pointer hover:text-slate-200 select-none"
                onClick={() => toggleSort('name')}
              >
                Company <SortIcon k="name" />
              </th>
              <th
                className="text-left px-4 py-3 text-slate-400 font-medium text-xs cursor-pointer hover:text-slate-200 select-none hidden md:table-cell"
                onClick={() => toggleSort('region')}
              >
                Region <SortIcon k="region" />
              </th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium text-xs hidden lg:table-cell">
                CTC
              </th>
              <th className="text-left px-4 py-3 text-slate-400 font-medium text-xs hidden lg:table-cell">
                Notice Period
              </th>
              <th
                className="text-left px-4 py-3 text-slate-400 font-medium text-xs cursor-pointer hover:text-slate-200 select-none hidden xl:table-cell"
                onClick={() => toggleSort('appliedDate')}
              >
                Applied On <SortIcon k="appliedDate" />
              </th>
              <th className="text-right px-4 py-3 text-slate-400 font-medium text-xs">Links</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((company, i) => {
                const app = applications[company.name];
                const isApplied = app?.applied;

                return (
                  <motion.tr
                    key={company.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: Math.min(i * 0.01, 0.3) }}
                    className={`border-b border-white/5 transition-colors hover:bg-white/3 ${
                      isApplied ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => isApplied ? unapply(company.name) : openApplyModal(company.name)}
                        className={`transition-colors ${
                          isApplied
                            ? 'text-emerald-400 hover:text-red-400'
                            : 'text-slate-600 hover:text-emerald-400'
                        }`}
                        title={isApplied ? 'Click to remove' : 'Mark as applied'}
                      >
                        {isApplied
                          ? <CheckCircle2 size={18} />
                          : <Circle size={18} />
                        }
                      </button>
                    </td>

                    {/* Company name */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className={`font-medium ${isApplied ? 'text-emerald-300' : 'text-white'}`}>
                          {company.name}
                        </span>
                        {/* Region shown inline on mobile */}
                        <span className="text-slate-500 text-xs md:hidden">{company.region}</span>
                        {/* CTC + Notice on mobile */}
                        {isApplied && (
                          <div className="flex flex-wrap gap-1 mt-1 lg:hidden">
                            {app.ctc && (
                              <span className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 px-1.5 py-0.5 rounded-full">
                                {app.ctc}
                              </span>
                            )}
                            {app.noticePeriod && (
                              <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-1.5 py-0.5 rounded-full">
                                {app.noticePeriod}
                              </span>
                            )}
                          </div>
                        )}
                        {isApplied && app.notes && (
                          <span className="text-xs text-slate-600 italic truncate max-w-[200px]">"{app.notes}"</span>
                        )}
                      </div>
                    </td>

                    {/* Region */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-slate-400 text-xs">{company.region}</span>
                    </td>

                    {/* CTC */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {isApplied && app.ctc ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-blue-300 text-xs bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg hover:bg-blue-500/20 transition-colors"
                        >
                          {app.ctc}
                        </button>
                      ) : isApplied ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-slate-600 text-xs hover:text-slate-400 transition-colors"
                        >
                          + Add
                        </button>
                      ) : (
                        <span className="text-slate-700 text-xs">—</span>
                      )}
                    </td>

                    {/* Notice Period */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {isApplied && app.noticePeriod ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-purple-300 text-xs bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-lg hover:bg-purple-500/20 transition-colors"
                        >
                          {app.noticePeriod}
                        </button>
                      ) : isApplied ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-slate-600 text-xs hover:text-slate-400 transition-colors"
                        >
                          + Add
                        </button>
                      ) : (
                        <span className="text-slate-700 text-xs">—</span>
                      )}
                    </td>

                    {/* Applied date */}
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <span className="text-slate-500 text-xs">
                        {isApplied && app.appliedDate ? app.appliedDate : '—'}
                      </span>
                    </td>

                    {/* Links */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 justify-end">
                        <a
                          href={company.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 rounded-lg transition-colors flex items-center gap-1"
                          title="View jobs on LinkedIn"
                        >
                          <ExternalLink size={10} />
                          <span className="hidden sm:inline">Jobs</span>
                        </a>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
                          title="Visit website"
                        >
                          <Globe size={13} />
                        </a>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-500 text-sm">
            No companies match your filters.
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-md mx-4 z-50"
            >
              <div className="bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                  <div>
                    <h3 className="text-white font-semibold">Mark as Applied</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{modal.companyName}</p>
                  </div>
                  <button onClick={() => setModal(null)} className="text-slate-500 hover:text-slate-300 p-1 rounded">
                    <X size={18} />
                  </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">
                  {/* CTC */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1.5">
                      CTC / Compensation Offered
                      <span className="text-slate-500 font-normal ml-1">(optional)</span>
                    </label>
                    <input
                      autoFocus
                      type="text"
                      value={modal.ctc}
                      onChange={e => setModal(m => m ? { ...m, ctc: e.target.value } : m)}
                      placeholder="e.g. $120k/yr, ₹40 LPA, €80k"
                      className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                    />
                  </div>

                  {/* Notice period */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1.5">
                      Your Notice Period
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {NOTICE_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setModal(m => m ? { ...m, noticePeriod: opt } : m)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                            modal.noticePeriod === opt
                              ? 'bg-purple-600 border-purple-500 text-white'
                              : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {modal.noticePeriod === 'Other' && (
                      <input
                        type="text"
                        placeholder="e.g. 3 months"
                        className="w-full mt-2 bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                        onChange={e => setModal(m => m ? { ...m, noticePeriod: e.target.value } : m)}
                      />
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-slate-300 text-xs font-medium block mb-1.5">
                      Notes
                      <span className="text-slate-500 font-normal ml-1">(optional)</span>
                    </label>
                    <textarea
                      value={modal.notes}
                      onChange={e => setModal(m => m ? { ...m, notes: e.target.value } : m)}
                      placeholder="e.g. Reached out via LinkedIn, waiting for reply..."
                      rows={2}
                      className="w-full bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500 resize-none font-sans"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={saveApplication}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                      <CheckCircle2 size={15} />
                      Save Application
                    </button>
                    <button
                      onClick={() => setModal(null)}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-xl border border-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
