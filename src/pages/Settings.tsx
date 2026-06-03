import { Download, Trash2, Sun, Moon } from 'lucide-react';
import type { AppSettings, Theme, TrackerCard } from '../types';

interface Props {
  settings: AppSettings;
  onUpdate: (s: Partial<AppSettings>) => void;
  trackerCards: TrackerCard[];
  onClearAll: () => void;
}

const ROLE_OPTIONS = ['Senior Frontend Engineer', 'Senior Full-Stack Engineer', 'Frontend Architect', 'Staff Frontend Engineer', 'Engineering Lead'];

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
    <div className="space-y-6 max-w-xl relative">
      {/* Coming soon overlay */}
      <div className="absolute inset-0 z-10 rounded-xl flex items-start justify-center pt-16 cursor-not-allowed" />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-800 border border-white/10 rounded-full px-4 py-1.5 text-slate-400 text-xs font-medium select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
        Settings coming soon
      </div>
      <div className="opacity-30 pointer-events-none select-none">
      {/* Theme */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Appearance</h3>
        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-sm flex-1">Theme</span>
          <div className="flex gap-2">
            {(['dark', 'light'] as Theme[]).map(t => (
              <button
                key={t}
                onClick={() => onUpdate({ theme: t })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  settings.theme === t
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/8 text-slate-400 hover:text-white'
                }`}
              >
                {t === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
                {t === 'dark' ? 'Dark' : 'Light'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Job Preferences</h3>

        <div className="space-y-3">
          <div>
            <label className="text-slate-400 text-xs mb-1 block">Target Role</label>
            <select
              value={settings.targetRole}
              onChange={e => onUpdate({ targetRole: e.target.value })}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              {ROLE_OPTIONS.map(r => <option key={r} value={r} className="bg-slate-800 text-slate-100">{r}</option>)}
            </select>
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1 block">Target Compensation (e.g. $120k USD)</label>
            <input
              type="text"
              value={settings.targetCompensation}
              onChange={e => onUpdate({ targetCompensation: e.target.value })}
              placeholder="e.g. $100k–$150k USD / year"
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs mb-1 block">Default Country</label>
            <input
              type="text"
              value={settings.defaultCountry}
              onChange={e => onUpdate({ defaultCountry: e.target.value })}
              placeholder="e.g. United States"
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-white font-semibold text-sm">Data Management</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm transition-colors w-fit"
          >
            <Download size={15} />
            Export Tracker Data as JSON
          </button>
          <button
            onClick={() => {
              if (confirm('Clear all saved data? This cannot be undone.')) {
                onClearAll();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-sm transition-colors w-fit"
          >
            <Trash2 size={15} />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
