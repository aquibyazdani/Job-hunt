import type { Country } from '../types';

export const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', visaType: 'H-1B' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', visaType: 'Skilled Worker' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', visaType: 'EU Blue Card' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', visaType: 'HSM' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', visaType: 'LMIA' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', visaType: 'TSS 482' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', visaType: 'CSEP' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', visaType: 'Work Permit' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', visaType: 'Work Permit' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', visaType: 'Work Permit' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', visaType: 'Work Permit' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', visaType: 'Tech Visa' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', visaType: 'Work Permit' },
  { code: 'FR', name: 'France', flag: '🇫🇷', visaType: 'Work Permit' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', visaType: 'EP' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', visaType: 'Work Permit' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', visaType: 'Engineer Visa' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', visaType: 'L Permit' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', visaType: 'Red-White-Red Card' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', visaType: 'Work Permit' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', visaType: 'Work Permit' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', visaType: 'Blue Card' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', visaType: 'Digital Nomad Visa' },
];

export const WORLDWIDE_COUNTRIES = COUNTRIES;
export const VISA_COUNTRIES = COUNTRIES.filter(c =>
  ['US', 'GB', 'DE', 'NL', 'CA', 'AU', 'IE', 'SG', 'JP', 'CH', 'PT'].includes(c.code)
);
