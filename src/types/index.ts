export type Theme = 'dark' | 'light';

export type Platform = 'linkedin' | 'google' | 'other';

export type JobType = 'full-time' | 'contract' | 'freelance' | 'part-time';

export type ExperienceLevel = 'senior' | 'lead' | 'staff' | 'principal' | 'manager';

export interface Country {
  code: string;
  name: string;
  flag: string;
  visaType?: string;
}

export interface SearchString {
  id: string;
  text: string;
  platform: Platform;
  category: string;
  tab?: 'jobs' | 'posts' | 'people';
  filters?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  quality?: 'low' | 'medium' | 'high';
  supportsCountry?: boolean;
}

export interface ExternalPlatform {
  name: string;
  url: string;
  description: string;
  emoji?: string;
}

export interface TrackerCard {
  id: string;
  company: string;
  role: string;
  source: string;
  status: TrackerStatus;
  notes: string;
  dateAdded: string;
  url?: string;
}

export type TrackerStatus = 'saved' | 'applied' | 'in_progress' | 'offer';

export interface DailyTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface AppSettings {
  theme: Theme;
  defaultCountry: string;
  targetRole: string;
  targetCompensation: string;
}

export interface Stats {
  copyCount: number;
  favoritesCount: number;
  daysActive: number;
  lastActiveDate: string;
  streak: number;
}

export type NavItem = {
  id: string;
  label: string;
  emoji: string;
  path: string;
};

export interface RemoteCompany {
  name: string;
  website: string;
  region: string;
  linkedin: string;
}

export interface CompanyApplication {
  applied: boolean;
  ctc: string;
  noticePeriod: string;
  appliedDate: string;
  notes: string;
}

export interface Bookmark {
  id: string;
  text: string;
  note: string;
  platform: Platform;
  tab?: 'jobs' | 'posts' | 'people';
  source: string;
  filters?: string;
  tags?: string[];
  dateAdded: string;
}
