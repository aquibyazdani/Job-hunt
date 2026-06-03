import { ChevronDown } from 'lucide-react';
import type { Country } from '../../types';

interface Props {
  countries: Country[];
  value: string;
  onChange: (code: string) => void;
  showVisaType?: boolean;
}

export function CountrySelector({ countries, value, onChange, showVisaType = false }: Props) {
  const selected = countries.find(c => c.code === value);

  return (
    <div className="relative inline-block">
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="appearance-none bg-slate-800 border border-slate-600 text-slate-100 text-sm rounded-xl pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:border-blue-500 font-sans hover:bg-slate-700 transition-colors"
        >
          <option value="">All Countries</option>
          {countries.map(c => (
            <option key={c.code} value={c.code} className="bg-slate-800 text-slate-100">
              {c.flag} {c.name}{showVisaType && c.visaType ? ` (${c.visaType})` : ''}
            </option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      {selected && showVisaType && selected.visaType && (
        <span className="ml-2 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">
          {selected.flag} {selected.visaType}
        </span>
      )}
    </div>
  );
}
