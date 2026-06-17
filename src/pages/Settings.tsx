import { Download, Trash2, Sun, Moon } from 'lucide-react';
import type { AppSettings, Theme, TrackerCard } from '../types';

interface Props {
  settings: AppSettings;
  onUpdate: (s: Partial<AppSettings>) => void;
  trackerCards: TrackerCard[];
  onClearAll: () => void;
}

const ROLE_OPTIONS = [
  'Senior Frontend Engineer',
  'Senior Full-Stack Engineer',
  'Frontend Architect',
  'Staff Frontend Engineer',
  'Engineering Lead',
];

export function Settings({ settings, onUpdate, trackerCards, onClearAll }: Props) {
  const exportData = () => {
    const data = JSON.stringify({ settings, tracker: trackerCards }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `remotehunt-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 max-w-xl relative">
      {/* Coming soon overlay */}
      <div className="absolute inset-0 z-10 rounded-xl flex items-start justify-center pt-16 cursor-not-allowed" />
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium select-none"
        style={{
          background: 'var(--rh-surface)',
          border: '1px solid var(--rh-border)',
          color: 'var(--rh-text-2)',
          boxShadow: 'var(--rh-shadow-card)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#d97706' }} />
        Settings coming soon
      </div>

      <div className="opacity-30 pointer-events-none select-none space-y-5">
        {/* Appearance */}
        <div className="rh-card p-5 space-y-4">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.28px' }}>
            Appearance
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-sm flex-1" style={{ color: 'var(--rh-text-2)' }}>Theme</span>
            <div className="flex gap-2">
              {(['dark', 'light'] as Theme[]).map(t => (
                <button
                  key={t}
                  onClick={() => onUpdate({ theme: t })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-sm transition-colors"
                  style={settings.theme === t
                    ? { background: 'var(--rh-accent)', color: 'var(--rh-accent-text)' }
                    : { background: 'var(--rh-surface-2)', color: 'var(--rh-text-2)', border: '1px solid var(--rh-border)' }
                  }
                >
                  {t === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
                  {t === 'dark' ? 'Dark' : 'Light'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rh-card p-5 space-y-4">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.28px' }}>
            Job Preferences
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--rh-text-2)' }}>
                Target Role
              </label>
              <div className="relative">
                <select
                  value={settings.targetRole}
                  onChange={e => onUpdate({ targetRole: e.target.value })}
                  className="rh-select w-full"
                >
                  {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--rh-text-2)' }}>
                Target Compensation
              </label>
              <input
                type="text"
                value={settings.targetCompensation}
                onChange={e => onUpdate({ targetCompensation: e.target.value })}
                placeholder="e.g. $100k–$150k USD / year"
                className="rh-input"
              />
            </div>

            <div>
              <label className="text-xs mb-1.5 block" style={{ color: 'var(--rh-text-2)' }}>
                Default Country
              </label>
              <input
                type="text"
                value={settings.defaultCountry}
                onChange={e => onUpdate({ defaultCountry: e.target.value })}
                placeholder="e.g. United States"
                className="rh-input"
              />
            </div>
          </div>
        </div>

        {/* Data */}
        <div className="rh-card p-5 space-y-4">
          <h3 className="font-semibold text-sm" style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.28px' }}>
            Data Management
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={exportData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] text-sm font-medium transition-colors w-fit border"
              style={{
                background: '#f0fdf4',
                borderColor: '#bbf7d0',
                color: '#15803d',
              }}
            >
              <Download size={14} />
              Export Tracker Data as JSON
            </button>
            <button
              onClick={() => {
                if (confirm('Clear all saved data? This cannot be undone.')) onClearAll();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] text-sm font-medium transition-colors w-fit border"
              style={{
                background: '#fef2f2',
                borderColor: '#fecaca',
                color: '#b91c1c',
              }}
            >
              <Trash2 size={14} />
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
