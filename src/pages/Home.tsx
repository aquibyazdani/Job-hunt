import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StatsDashboard } from '../components/StatsDashboard';
import { DailyChecklist } from '../components/DailyChecklist';
import type { Stats, TrackerCard } from '../types';

const CATEGORIES = [
  { id: 'remote-worldwide', label: 'Remote Worldwide', emoji: '🌍', desc: 'Senior React roles across US, EU, and more' },
  { id: 'remote-india', label: 'Remote India', emoji: '🇮🇳', desc: 'India/APAC remote with USD pay' },
  { id: 'visa-sponsorship', label: 'Visa Sponsorship', emoji: '✈️', desc: 'Companies that sponsor relocation' },
  { id: 'freelance-contract', label: 'Freelance & Contract', emoji: '💼', desc: 'Contract and fractional roles' },
  { id: 'foreign-currency', label: 'Foreign Currency', emoji: '💰', desc: 'USD/EUR/GBP paying remote jobs' },
  { id: 'people-hiring', label: 'People Hiring', emoji: '🎯', desc: 'Outbound: find CTOs and founders' },
  { id: 'google-xray', label: 'Google X-Ray', emoji: '🔍', desc: 'Master list of all X-Ray searches' },
];

interface Props {
  stats: Stats;
  trackerCards: TrackerCard[];
  favoritesCount: number;
  onNavigate: (page: string) => void;
}

export function Home({ stats, trackerCards, favoritesCount, onNavigate }: Props) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-300 text-xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Senior Frontend Engineer · India → Worldwide
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Your Job Search <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Command Center</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">
          100+ curated search strings for LinkedIn and Google X-Ray. Find remote, visa-sponsored, and freelance roles paying in USD/EUR/GBP.
        </p>
      </motion.div>

      {/* Stats */}
      <StatsDashboard stats={stats} trackerCards={trackerCards} favoritesCount={favoritesCount} />

      {/* Daily checklist */}
      <DailyChecklist />

      {/* Category grid */}
      <div>
        <h2 className="text-white font-semibold mb-4">Search Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onNavigate(cat.id)}
              className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-left group"
            >
              <span className="text-2xl mt-0.5">{cat.emoji}</span>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{cat.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{cat.desc}</div>
              </div>
              <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 mt-1 transition-colors" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
