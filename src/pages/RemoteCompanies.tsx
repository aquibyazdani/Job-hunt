import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ExternalLink, CheckCircle2, Circle, X,
  ChevronDown, ChevronUp, Globe, Building2
} from 'lucide-react';
import type { CompanyApplication } from '../types';
import { REMOTE_COMPANIES } from '../data/remoteCompanies';

const NOTICE_OPTIONS = ['Immediate', '15 days', '30 days', '45 days', '60 days', '90 days', 'Other'];

interface ApplyModal { companyName: string; ctc: string; noticePeriod: string; notes: string; }
interface Props {
  applications: Record<string, CompanyApplication>;
  onUpdate: (name: string, data: CompanyApplication) => void;
  onRemove: (name: string) => void;
}
type SortKey = 'name' | 'region' | 'appliedDate';

export function RemoteCompanies({ applications, onUpdate, onRemove }: Props) {
  const [search, setSearch]               = useState('');
  const [regionFilter, setRegionFilter]   = useState('');
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);
  const [sortKey, setSortKey]             = useState<SortKey>('name');
  const [sortAsc, setSortAsc]             = useState(true);
  const [modal, setModal]                 = useState<ApplyModal | null>(null);

  const appliedCount = Object.values(applications).filter(a => a.applied).length;

  const filtered = useMemo(() => {
    let list = REMOTE_COMPANIES.filter(c => {
      const q = search.toLowerCase();
      return (
        (!q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q)) &&
        (!regionFilter || c.region.toLowerCase().includes(regionFilter.toLowerCase())) &&
        (!showAppliedOnly || applications[c.name]?.applied)
      );
    });
    return [...list].sort((a, b) => {
      if (sortKey === 'name')   return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortKey === 'region') return sortAsc ? a.region.localeCompare(b.region) : b.region.localeCompare(a.region);
      if (sortKey === 'appliedDate') {
        const da = applications[a.name]?.appliedDate || '';
        const db = applications[b.name]?.appliedDate || '';
        return sortAsc ? da.localeCompare(db) : db.localeCompare(da);
      }
      return 0;
    });
  }, [search, regionFilter, showAppliedOnly, sortKey, sortAsc, applications]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(p => !p);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortAsc ? <ChevronUp size={11} className="inline ml-0.5" /> : <ChevronDown size={11} className="inline ml-0.5" />
      : null;

  const openApplyModal = (name: string) => {
    const existing = applications[name];
    setModal({ companyName: name, ctc: existing?.ctc || '', noticePeriod: existing?.noticePeriod || '30 days', notes: existing?.notes || '' });
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
    REMOTE_COMPANIES.forEach(c => c.region.split(',').forEach(r => regions.add(r.trim())));
    return Array.from(regions).sort();
  }, []);

  return (
    <div className="space-y-5">
      {/* Stats row */}
      <div className="flex flex-wrap gap-2.5 items-center">
        {[
          { icon: <CheckCircle2 size={14} />, value: appliedCount, label: 'applied', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
          { icon: <Building2 size={14} />, value: REMOTE_COMPANIES.length, label: 'total companies', color: 'var(--rh-text-2)', bg: 'var(--rh-surface)', border: 'var(--rh-border)' },
          { icon: <Globe size={14} />, value: filtered.length, label: 'showing', color: '#0070f3', bg: '#eff6ff', border: '#bfdbfe' },
        ].map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-sm border"
            style={{ background: s.bg, borderColor: s.border, color: s.color }}
          >
            {s.icon}
            <span className="font-semibold">{s.value}</span>
            <span className="text-xs opacity-75">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--rh-text-3)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company or region..."
            className="rh-input pl-8 pr-8"
            style={{ height: '36px' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--rh-text-3)' }}>
              <X size={12} />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="rh-select"
            style={{ height: '36px', paddingTop: '0', paddingBottom: '0' }}
          >
            <option value="">All regions</option>
            {regionOptions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--rh-text-3)' }} />
        </div>

        <button
          onClick={() => setShowAppliedOnly(p => !p)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-sm border transition-colors"
          style={showAppliedOnly
            ? { background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }
            : { background: 'var(--rh-surface)', borderColor: 'var(--rh-border)', color: 'var(--rh-text-2)' }
          }
        >
          <CheckCircle2 size={13} />
          Applied only
        </button>
      </div>

      {/* Table */}
      <div
        className="overflow-x-auto rounded-[8px] border"
        style={{ borderColor: 'var(--rh-border)' }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--rh-surface-2)', borderBottom: '1px solid var(--rh-border)' }}>
              <th className="text-left px-4 py-2.5 w-10">
                <span className="text-xs font-medium" style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}>✓</span>
              </th>
              {[
                { label: 'Company', key: 'name' as SortKey, cls: '' },
                { label: 'Region',  key: 'region' as SortKey, cls: 'hidden md:table-cell' },
              ].map(col => (
                <th
                  key={col.key}
                  className={`text-left px-4 py-2.5 font-medium text-xs cursor-pointer select-none ${col.cls}`}
                  style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label} <SortIcon k={col.key} />
                </th>
              ))}
              <th className="text-left px-4 py-2.5 font-medium text-xs hidden lg:table-cell" style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}>CTC</th>
              <th className="text-left px-4 py-2.5 font-medium text-xs hidden lg:table-cell" style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}>Notice</th>
              <th
                className="text-left px-4 py-2.5 font-medium text-xs hidden xl:table-cell cursor-pointer select-none"
                style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}
                onClick={() => toggleSort('appliedDate')}
              >
                Applied On <SortIcon k="appliedDate" />
              </th>
              <th className="text-right px-4 py-2.5 font-medium text-xs" style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}>Links</th>
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
                    transition={{ delay: Math.min(i * 0.008, 0.25) }}
                    className="transition-colors"
                    style={{
                      borderBottom: '1px solid var(--rh-border)',
                      background: isApplied ? 'rgba(21,128,61,0.04)' : 'var(--rh-surface)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = isApplied ? 'rgba(21,128,61,0.07)' : 'var(--rh-surface-2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = isApplied ? 'rgba(21,128,61,0.04)' : 'var(--rh-surface)')}
                  >
                    <td className="px-4 py-2.5">
                      <button
                        onClick={() => isApplied ? unapply(company.name) : openApplyModal(company.name)}
                        className="transition-colors"
                        style={{ color: isApplied ? '#15803d' : 'var(--rh-border-strong)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = isApplied ? '#b91c1c' : '#15803d')}
                        onMouseLeave={e => (e.currentTarget.style.color = isApplied ? '#15803d' : 'var(--rh-border-strong)')}
                        title={isApplied ? 'Click to remove' : 'Mark as applied'}
                      >
                        {isApplied ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                      </button>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="font-medium text-sm"
                          style={{ color: isApplied ? '#15803d' : 'var(--rh-text-1)', letterSpacing: '-0.28px' }}
                        >
                          {company.name}
                        </span>
                        <span className="text-xs md:hidden" style={{ color: 'var(--rh-text-3)' }}>
                          {company.region}
                        </span>
                        {isApplied && (
                          <div className="flex flex-wrap gap-1 mt-0.5 lg:hidden">
                            {app.ctc && (
                              <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-full dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20">
                                {app.ctc}
                              </span>
                            )}
                            {app.noticePeriod && (
                              <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-full dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20">
                                {app.noticePeriod}
                              </span>
                            )}
                          </div>
                        )}
                        {isApplied && app.notes && (
                          <span className="text-xs italic truncate max-w-[200px]" style={{ color: 'var(--rh-text-3)' }}>
                            "{app.notes}"
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2.5 hidden md:table-cell">
                      <span className="text-xs" style={{ color: 'var(--rh-text-3)' }}>{company.region}</span>
                    </td>

                    <td className="px-4 py-2.5 hidden lg:table-cell">
                      {isApplied && app.ctc ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-xs px-2 py-0.5 rounded-full border transition-colors"
                          style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                        >
                          {app.ctc}
                        </button>
                      ) : isApplied ? (
                        <button onClick={() => openApplyModal(company.name)} className="text-xs" style={{ color: 'var(--rh-text-3)' }}>
                          + Add
                        </button>
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--rh-border-strong)' }}>—</span>
                      )}
                    </td>

                    <td className="px-4 py-2.5 hidden lg:table-cell">
                      {isApplied && app.noticePeriod ? (
                        <button
                          onClick={() => openApplyModal(company.name)}
                          className="text-xs px-2 py-0.5 rounded-full border transition-colors"
                          style={{ background: '#faf5ff', color: '#7c3aed', borderColor: '#e9d5ff' }}
                        >
                          {app.noticePeriod}
                        </button>
                      ) : isApplied ? (
                        <button onClick={() => openApplyModal(company.name)} className="text-xs" style={{ color: 'var(--rh-text-3)' }}>
                          + Add
                        </button>
                      ) : (
                        <span className="text-xs" style={{ color: 'var(--rh-border-strong)' }}>—</span>
                      )}
                    </td>

                    <td className="px-4 py-2.5 hidden xl:table-cell">
                      <span className="text-xs" style={{ color: 'var(--rh-text-3)' }}>
                        {isApplied && app.appliedDate ? app.appliedDate : '—'}
                      </span>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5 justify-end">
                        <a
                          href={company.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-0.5 rounded-[6px] border transition-colors flex items-center gap-1"
                          style={{ background: '#eff6ff', color: '#1d4ed8', borderColor: '#bfdbfe' }}
                        >
                          <ExternalLink size={10} />
                          <span className="hidden sm:inline">Jobs</span>
                        </a>
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded transition-colors"
                          style={{ color: 'var(--rh-text-3)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--rh-text-1)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--rh-text-3)')}
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
          <div className="py-12 text-center text-sm" style={{ color: 'var(--rh-text-3)' }}>
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
              className="fixed inset-0 bg-black/40 z-50"
              onClick={() => setModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed top-[18%] left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50"
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'var(--rh-surface)',
                  border: '1px solid var(--rh-border)',
                  boxShadow: 'var(--rh-shadow-modal)',
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--rh-border)' }}>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.4px' }}>
                      Mark as Applied
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--rh-text-3)' }}>{modal.companyName}</p>
                  </div>
                  <button
                    onClick={() => setModal(null)}
                    className="p-1 rounded transition-colors"
                    style={{ color: 'var(--rh-text-3)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--rh-text-1)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--rh-text-3)')}
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--rh-text-2)' }}>
                      CTC / Compensation <span style={{ color: 'var(--rh-text-3)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input
                      autoFocus
                      type="text"
                      value={modal.ctc}
                      onChange={e => setModal(m => m ? { ...m, ctc: e.target.value } : m)}
                      placeholder="e.g. $120k/yr, ₹40 LPA, €80k"
                      className="rh-input"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--rh-text-2)' }}>
                      Notice Period
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {NOTICE_OPTIONS.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setModal(m => m ? { ...m, noticePeriod: opt } : m)}
                          className="px-3 py-1 rounded-pill-sm text-xs font-medium border transition-colors"
                          style={modal.noticePeriod === opt
                            ? { background: '#171717', color: '#ffffff', borderColor: '#171717' }
                            : { background: 'var(--rh-surface-2)', color: 'var(--rh-text-2)', borderColor: 'var(--rh-border)' }
                          }
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {modal.noticePeriod === 'Other' && (
                      <input
                        type="text"
                        placeholder="e.g. 3 months"
                        className="rh-input mt-2"
                        onChange={e => setModal(m => m ? { ...m, noticePeriod: e.target.value } : m)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: 'var(--rh-text-2)' }}>
                      Notes <span style={{ color: 'var(--rh-text-3)', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      value={modal.notes}
                      onChange={e => setModal(m => m ? { ...m, notes: e.target.value } : m)}
                      placeholder="e.g. Reached out via LinkedIn..."
                      rows={2}
                      className="rh-textarea"
                    />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={saveApplication}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[6px] text-sm font-medium transition-colors"
                      style={{ background: '#171717', color: '#ffffff' }}
                    >
                      <CheckCircle2 size={14} />
                      Save Application
                    </button>
                    <button
                      onClick={() => setModal(null)}
                      className="px-4 py-2.5 rounded-[6px] text-sm border transition-colors"
                      style={{ background: 'var(--rh-surface-2)', color: 'var(--rh-text-2)', borderColor: 'var(--rh-border)' }}
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
