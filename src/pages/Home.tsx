import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { StatsDashboard } from '../components/StatsDashboard';
import { DailyChecklist } from '../components/DailyChecklist';
import type { Stats, TrackerCard } from '../types';

const CATEGORIES = [
  { id: 'remote-worldwide',  label: 'Remote Worldwide',     emoji: '🌍', desc: 'Senior React roles across US, EU & more' },
  { id: 'remote-india',      label: 'Remote India',         emoji: '🇮🇳', desc: 'India/APAC remote with USD pay' },
  { id: 'visa-sponsorship',  label: 'Visa Sponsorship',     emoji: '✈️', desc: 'Companies that sponsor relocation' },
  { id: 'freelance-contract',label: 'Freelance & Contract', emoji: '💼', desc: 'Contract and fractional roles' },
  { id: 'foreign-currency',  label: 'Foreign Currency',     emoji: '💰', desc: 'USD/EUR/GBP paying remote jobs' },
  { id: 'people-hiring',     label: 'People Hiring',        emoji: '🎯', desc: 'Outbound: find CTOs and founders' },
  { id: 'google-xray',       label: 'Google X-Ray',         emoji: '🔍', desc: 'Master list of all X-Ray searches' },
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
        className="relative rounded-xl overflow-hidden px-6 py-10 text-center"
        style={{ background: 'var(--rh-surface)' }}
      >
        {/* Mesh gradient backdrop (Vercel brand decoration) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(0,124,240,0.13) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 15%, rgba(121,40,202,0.10) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 70%, rgba(255,0,128,0.08) 0%, transparent 45%),
              radial-gradient(ellipse at 15% 75%, rgba(0,223,216,0.09) 0%, transparent 50%),
              radial-gradient(ellipse at 55% 85%, rgba(249,203,40,0.07) 0%, transparent 45%)
            `,
          }}
        />

        {/* Badge */}
        <div
          className="relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-5"
          style={{
            background: 'var(--rh-surface-2)',
            border: '1px solid var(--rh-border)',
            color: 'var(--rh-text-2)',
            fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Senior Frontend Engineer · India → Worldwide
        </div>

        <h1
          className="relative text-3xl sm:text-4xl font-semibold mb-3"
          style={{
            color: 'var(--rh-text-1)',
            letterSpacing: '-1.28px',
            lineHeight: '40px',
          }}
        >
          Your Job Search{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #007cf0, #7928ca, #ff0080)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Command Center.
          </span>
        </h1>

        <p
          className="relative text-sm max-w-md mx-auto"
          style={{ color: 'var(--rh-text-2)', lineHeight: '22px' }}
        >
          100+ curated search strings for LinkedIn and Google X-Ray. Find remote, visa-sponsored, and freelance roles paying in USD/EUR/GBP.
        </p>
      </motion.div>

      {/* Stats */}
      <StatsDashboard stats={stats} trackerCards={trackerCards} favoritesCount={favoritesCount} />

      {/* Daily checklist */}
      <DailyChecklist />

      {/* Category grid */}
      <div>
        <h2
          className="font-semibold mb-4 text-sm uppercase tracking-widest"
          style={{ color: 'var(--rh-text-3)', fontFamily: '"JetBrains Mono", monospace' }}
        >
          Search Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onNavigate(cat.id)}
              className="rh-card-hover flex items-start gap-3 p-4 text-left group"
            >
              <span className="text-xl mt-0.5">{cat.emoji}</span>
              <div className="flex-1 min-w-0">
                <div
                  className="font-medium text-sm"
                  style={{ color: 'var(--rh-text-1)', letterSpacing: '-0.28px' }}
                >
                  {cat.label}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--rh-text-3)' }}
                >
                  {cat.desc}
                </div>
              </div>
              <ArrowRight
                size={13}
                className="mt-1 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                style={{ color: 'var(--rh-text-3)' }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
