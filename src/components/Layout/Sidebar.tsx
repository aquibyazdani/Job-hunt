import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NavItem, Theme } from '../../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'home',              label: 'Dashboard',           emoji: '🏠', path: 'home' },
  { id: 'remote-worldwide',  label: 'Remote Worldwide',     emoji: '🌍', path: 'remote-worldwide' },
  { id: 'remote-india',      label: 'Remote India',         emoji: '🇮🇳', path: 'remote-india' },
  { id: 'visa-sponsorship',  label: 'Visa Sponsorship',     emoji: '✈️', path: 'visa-sponsorship' },
  { id: 'freelance-contract',label: 'Freelance & Contract', emoji: '💼', path: 'freelance-contract' },
  { id: 'foreign-currency',  label: 'Foreign Currency',     emoji: '💰', path: 'foreign-currency' },
  { id: 'people-hiring',     label: 'People Hiring',        emoji: '🎯', path: 'people-hiring' },
  { id: 'google-xray',       label: 'Google X-Ray',         emoji: '🔍', path: 'google-xray' },
  { id: 'remote-companies',  label: 'Remote Companies',     emoji: '🏢', path: 'remote-companies' },
  { id: 'keywords',          label: 'My Keywords',          emoji: '🔖', path: 'keywords' },
  { id: 'tracker',           label: 'My Tracker',           emoji: '📋', path: 'tracker' },
  { id: 'settings',          label: 'Settings',             emoji: '⚙️', path: 'settings' },
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          fixed top-0 left-0 h-full w-60 z-50 flex flex-col border-r
          lg:static lg:translate-x-0 lg:z-auto
          transition-transform duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isDark
            ? 'bg-[#111111] border-white/8'
            : 'bg-white border-[#ebebeb]'
          }
        `}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between px-4 py-4 border-b ${isDark ? 'border-white/8' : 'border-[#ebebeb]'}`}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-[6px] flex items-center justify-center text-xs font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #007cf0 0%, #7928ca 50%, #ff0080 100%)',
              }}
            >
              R
            </div>
            <span
              className={`font-semibold text-base tracking-[-0.4px] ${isDark ? 'text-white' : 'text-[#171717]'}`}
            >
              RemoteHunt
            </span>
          </div>
          <button
            onClick={onClose}
            className={`lg:hidden p-1 rounded transition-colors ${isDark ? 'text-white/40 hover:text-white' : 'text-[#888] hover:text-[#171717]'}`}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-sm
                  transition-all duration-100 text-left
                  ${isActive
                    ? isDark
                      ? 'bg-white text-[#171717] font-medium'
                      : 'bg-[#171717] text-white font-medium'
                    : isDark
                      ? 'text-white/60 hover:text-white hover:bg-white/8'
                      : 'text-[#4d4d4d] hover:text-[#171717] hover:bg-[#f5f5f5]'
                  }
                `}
              >
                <span className="text-sm leading-none">{item.emoji}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isDark ? 'bg-[#171717]' : 'bg-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`px-4 py-3 border-t ${isDark ? 'border-white/8' : 'border-[#ebebeb]'}`}>
          <p className={`text-xs font-medium ${isDark ? 'text-white/40' : 'text-[#888888]'}`} style={{ fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0px' }}>
            Senior Frontend Engineer
          </p>
          <p className={`text-xs mt-0.5 ${isDark ? 'text-white/25' : 'text-[#a1a1a1]'}`} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            India → Worldwide
          </p>
        </div>
      </motion.aside>
    </>
  );
}

export { NAV_ITEMS };
