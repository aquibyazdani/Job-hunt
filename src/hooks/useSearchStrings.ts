import { useMemo } from 'react';
import type { SearchString } from '../types';

export function useSearchStrings(
  strings: SearchString[],
  selectedCountry: string,
  countryName: string
) {
  return useMemo(() => {
    return strings.map(s => ({
      ...s,
      text: s.supportsCountry && countryName
        ? s.text.replace('[country]', countryName).replace('[selected country]', countryName)
        : s.text,
      filters: s.supportsCountry && countryName && s.filters
        ? s.filters.replace('[country]', countryName)
        : s.filters,
    }));
  }, [strings, selectedCountry, countryName]);
}

export function generateCustomStrings(keyword: string) {
  const k = keyword.trim();
  if (!k) return { linkedin: '', google: '' };

  return {
    linkedin: `"${k}" remote`,
    google: `site:linkedin.com/jobs/view "${k}" "remote"`,
  };
}
