import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import type { NavItem, Theme } from '../../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Dashboard', emoji: '🏠', path: 'home' },
  { id: 'remote-worldwide', label: 'Remote Worldwide', emoji: '🌍', path: 'remote-worldwide' },
  { id: 'remote-india', label: 'Remote India', emoji: '🇮🇳', path: 'remote-india' },
  { id: 'visa-sponsorship', label: 'Visa Sponsorship', emoji: '✈️', path: 'visa-sponsorship' },
  { id: 'freelance-contract', label: 'Freelance & Contract', emoji: '💼', path: 'freelance-contract' },
  { id: 'foreign-currency', label: 'Foreign Currency Jobs', emoji: '💰', path: 'foreign-currency' },
  { id: 'people-hiring', label: 'People Hiring', emoji: '🎯', path: 'people-hiring' },
  { id: 'google-xray', label: 'Google X-Ray Search', emoji: '🔍', path: 'google-xray' },
  { id: 'remote-companies', label: 'Remote Companies', emoji: '🏢', path: 'remote-companies' },
  { id: 'keywords', label: 'My Keywords', emoji: '🔖', path: 'keywords' },
  { id: 'tracker', label: 'My Tracker', emoji: '📋', path: 'tracker' },
  { id: 'settings', label: 'Settings', emoji: '⚙️', path: 'settings' },
];

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose, theme }: Props) {
  const isDark = theme === 'dark';

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 flex flex-col border-r
          lg:static lg:translate-x-0 lg:z-auto
          transition-all duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDark
            ? 'bg-navy-900 border-white/10'
            : 'bg-slate-900 border-slate-700'
          }
        `}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between px-4 py-5 border-b ${isDark ? 'border-white/10' : 'border-slate-700'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-sm font-bold text-white">
              R
            </div>
            <span className="font-bold text-white text-lg font-sans">RemoteHunt</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {NAV_ITEMS.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium
                  transition-all duration-150 text-left group
                  ${isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-white/8'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-base">{item.emoji}</span>
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="text-blue-400" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t ${isDark ? 'border-white/10' : 'border-slate-700'}`}>
          <p className="text-xs text-slate-500 text-center">Senior Frontend Engineer</p>
          <p className="text-xs text-slate-600 text-center">India → Worldwide</p>
        </div>
      </motion.aside>
    </>
  );
}

export { NAV_ITEMS };
