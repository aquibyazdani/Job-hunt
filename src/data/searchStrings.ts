import type { SearchString } from '../types';

export const REMOTE_WORLDWIDE_LINKEDIN: SearchString[] = [
  {
    id: 'rw-li-1', text: '"senior frontend engineer" OR "senior react engineer"',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓, Experience: Mid-Senior, Location: [country]',
    tags: ['LinkedIn', 'Jobs'], quality: 'high', difficulty: 'easy', supportsCountry: true,
  },
  {
    id: 'rw-li-2', text: 'React "work from anywhere"',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓, Date: Past week',
    tags: ['LinkedIn', 'Jobs'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'rw-li-3', text: '"frontend architect" OR "staff frontend"',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓, Experience: Mid-Senior + Director',
    tags: ['LinkedIn', 'Jobs', 'Senior'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'rw-li-4', text: 'React TypeScript "remote"',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓, Location: [country]',
    tags: ['LinkedIn', 'Jobs'], quality: 'medium', difficulty: 'easy', supportsCountry: true,
  },
  {
    id: 'rw-li-5', text: '"senior frontend" "globally distributed"',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Jobs', 'Distributed'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'rw-li-6', text: 'Next.js OR React "senior" remote',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓, Date: Past week',
    tags: ['LinkedIn', 'Jobs', 'Next.js'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'rw-li-7', text: '"UI engineer" OR "frontend platform" remote',
    platform: 'linkedin', category: 'remote-worldwide', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Jobs'], quality: 'high', difficulty: 'medium',
  },
];

export const REMOTE_WORLDWIDE_GOOGLE: SearchString[] = [
  {
    id: 'rw-g-1', text: 'site:linkedin.com/jobs/view "senior frontend" "React" "remote" "[country]"',
    platform: 'google', category: 'remote-worldwide',
    tags: ['Google', 'X-Ray'], quality: 'high', difficulty: 'medium', supportsCountry: true,
  },
  {
    id: 'rw-g-2', text: 'site:linkedin.com/jobs/view "frontend engineer" "work from anywhere" "React"',
    platform: 'google', category: 'remote-worldwide',
    tags: ['Google', 'X-Ray'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'rw-g-3', text: 'site:linkedin.com/jobs/view "staff frontend" OR "frontend architect" "remote" "TypeScript"',
    platform: 'google', category: 'remote-worldwide',
    tags: ['Google', 'X-Ray', 'Senior'], quality: 'high', difficulty: 'hard',
  },
];

export const REMOTE_INDIA_LINKEDIN: SearchString[] = [
  {
    id: 'ri-li-1', text: '"frontend engineer" "India" remote',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Remote ✓, Date: Past week',
    tags: ['LinkedIn', 'Jobs', 'India'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'ri-li-2', text: 'React "senior" remote',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Location: India, Remote ✓, Experience: Mid-Senior',
    tags: ['LinkedIn', 'Jobs'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ri-li-3', text: '"frontend" "APAC" OR "Asia timezone" remote',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Jobs', 'APAC'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ri-li-4', text: '"frontend engineer" contract remote',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Job type: Contract, Remote ✓',
    tags: ['LinkedIn', 'Contract'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'ri-li-5', text: 'Turing OR Toptal OR Arc "senior frontend"',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Location: India',
    tags: ['LinkedIn', 'Platforms'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ri-li-6', text: '"React developer" "USD" OR "remote" India',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'USD'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ri-li-7', text: '"frontend" "offshore" OR "nearshore" senior',
    platform: 'linkedin', category: 'remote-india', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Offshore'], quality: 'medium', difficulty: 'medium',
  },
];

export const REMOTE_INDIA_GOOGLE: SearchString[] = [
  {
    id: 'ri-g-1', text: 'site:linkedin.com/jobs/view "frontend" "India" "remote" "React" "USD"',
    platform: 'google', category: 'remote-india',
    tags: ['Google', 'X-Ray', 'USD'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ri-g-2', text: 'site:linkedin.com/jobs/view "senior react" ("APAC" OR "India") "remote"',
    platform: 'google', category: 'remote-india',
    tags: ['Google', 'X-Ray', 'APAC'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ri-g-3', text: 'site:turing.com "senior frontend" OR "react engineer"',
    platform: 'google', category: 'remote-india',
    tags: ['Google', 'Turing'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ri-g-4', text: 'site:arc.dev "senior frontend" OR "react"',
    platform: 'google', category: 'remote-india',
    tags: ['Google', 'Arc.dev'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ri-g-5', text: 'site:toptal.com/developers "react" OR "frontend"',
    platform: 'google', category: 'remote-india',
    tags: ['Google', 'Toptal'], quality: 'high', difficulty: 'easy',
  },
];

export const VISA_LINKEDIN: SearchString[] = [
  {
    id: 'vs-li-1', text: '"senior frontend" "visa sponsorship"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: [country], Experience: Mid-Senior, Date: Past week',
    tags: ['LinkedIn', 'Visa'], quality: 'high', difficulty: 'easy', supportsCountry: true,
  },
  {
    id: 'vs-li-2', text: '"frontend engineer" "relocation"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: [country], Experience: Mid-Senior',
    tags: ['LinkedIn', 'Relocation'], quality: 'high', difficulty: 'easy', supportsCountry: true,
  },
  {
    id: 'vs-li-3', text: 'React "Blue Card" OR "work permit"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: Germany',
    tags: ['LinkedIn', 'Germany', 'Blue Card'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'vs-li-4', text: '"frontend" "Skilled Worker" OR "visa sponsor"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: United Kingdom',
    tags: ['LinkedIn', 'UK'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'vs-li-5', text: 'React TypeScript "we sponsor"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: [country], Date: Past week',
    tags: ['LinkedIn', 'Sponsor'], quality: 'high', difficulty: 'medium', supportsCountry: true,
  },
  {
    id: 'vs-li-6', text: '"senior react" "relocation package"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: [country]',
    tags: ['LinkedIn', 'Relocation Package'], quality: 'high', difficulty: 'medium', supportsCountry: true,
  },
  {
    id: 'vs-li-7', text: '"frontend" "immigration support" OR "relocation assistance"',
    platform: 'linkedin', category: 'visa-sponsorship', tab: 'jobs',
    filters: 'Location: [country]',
    tags: ['LinkedIn', 'Immigration'], quality: 'high', difficulty: 'hard', supportsCountry: true,
  },
];

export const VISA_GOOGLE: SearchString[] = [
  {
    id: 'vs-g-1', text: 'site:linkedin.com/jobs/view "senior frontend" "React" "visa sponsorship" -"no visa"',
    platform: 'google', category: 'visa-sponsorship',
    tags: ['Google', 'X-Ray'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'vs-g-2', text: 'site:linkedin.com/jobs/view "frontend" ("Blue Card" OR "relocation package") "React"',
    platform: 'google', category: 'visa-sponsorship',
    tags: ['Google', 'X-Ray', 'Blue Card'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'vs-g-3', text: 'site:linkedin.com/jobs/view "frontend engineer" "Skilled Worker" "React" -"no sponsorship"',
    platform: 'google', category: 'visa-sponsorship',
    tags: ['Google', 'X-Ray', 'UK'], quality: 'high', difficulty: 'hard',
  },
  {
    id: 'vs-g-4', text: 'site:linkedin.com/jobs/view "react" "we sponsor" OR "visa support" "[country]"',
    platform: 'google', category: 'visa-sponsorship',
    tags: ['Google', 'X-Ray'], quality: 'high', difficulty: 'hard', supportsCountry: true,
  },
];

export const FREELANCE_JOBS_LINKEDIN: SearchString[] = [
  {
    id: 'fl-li-1', text: '"frontend" OR "React" freelance',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Job type: Contract, Remote ✓, Date: Past week',
    tags: ['LinkedIn', 'Freelance'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'fl-li-2', text: '"contract" "senior frontend" OR "senior react"',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Job type: Contract, Remote ✓',
    tags: ['LinkedIn', 'Contract'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-li-3', text: '"part-time" OR "fractional" frontend React',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Job type: Part-time OR Contract, Remote ✓',
    tags: ['LinkedIn', 'Part-time', 'Fractional'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'fl-li-4', text: '"frontend consultant" OR "React consultant"',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Consultant'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'fl-li-5', text: '"contract react developer" remote',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Job type: Contract, Remote ✓',
    tags: ['LinkedIn', 'Contract'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-li-6', text: 'freelance "Next.js" OR "TypeScript" senior',
    platform: 'linkedin', category: 'freelance-contract', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'Freelance', 'Next.js'], quality: 'medium', difficulty: 'medium',
  },
];

export const FREELANCE_POSTS_LINKEDIN: SearchString[] = [
  {
    id: 'fl-p-1', text: '"looking for" React contractor',
    platform: 'linkedin', category: 'freelance-contract', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-p-2', text: '"hiring" frontend freelance',
    platform: 'linkedin', category: 'freelance-contract', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-p-3', text: '"need a" React developer',
    platform: 'linkedin', category: 'freelance-contract', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-p-4', text: '"looking for" frontend engineer remote',
    platform: 'linkedin', category: 'freelance-contract', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fl-p-5', text: '"recommend" React developer OR freelancer',
    platform: 'linkedin', category: 'freelance-contract', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'medium',
  },
];

export const FREELANCE_GOOGLE: SearchString[] = [
  {
    id: 'fl-g-1', text: 'site:linkedin.com/posts "looking for" "React" ("contract" OR "freelance")',
    platform: 'google', category: 'freelance-contract',
    tags: ['Google', 'X-Ray', 'Posts'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'fl-g-2', text: 'site:linkedin.com/posts "hiring" "frontend" "freelance" OR "contractor"',
    platform: 'google', category: 'freelance-contract',
    tags: ['Google', 'X-Ray', 'Posts'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'fl-g-3', text: 'site:linkedin.com/jobs/view "React" ("contract" OR "freelance") "senior" "remote"',
    platform: 'google', category: 'freelance-contract',
    tags: ['Google', 'X-Ray', 'Jobs'], quality: 'high', difficulty: 'medium',
  },
];

export const FOREIGN_CURRENCY_LINKEDIN: SearchString[] = [
  {
    id: 'fc-li-1', text: '"senior frontend" "USD" remote',
    platform: 'linkedin', category: 'foreign-currency', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'USD'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fc-li-2', text: 'React "EUR" OR "GBP" "senior" remote',
    platform: 'linkedin', category: 'foreign-currency', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'EUR', 'GBP'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'fc-li-3', text: '"frontend engineer" remote "competitive salary"',
    platform: 'linkedin', category: 'foreign-currency', tab: 'jobs',
    filters: 'Remote ✓, Location: US/UK/EU',
    tags: ['LinkedIn', 'Salary'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'fc-li-4', text: '"senior react" "international" OR "global" remote',
    platform: 'linkedin', category: 'foreign-currency', tab: 'jobs',
    filters: 'Remote ✓',
    tags: ['LinkedIn', 'International'], quality: 'medium', difficulty: 'medium',
  },
];

export const FOREIGN_CURRENCY_GOOGLE: SearchString[] = [
  {
    id: 'fc-g-1', text: 'site:linkedin.com/jobs/view "frontend" "React" "USD" "remote" -India',
    platform: 'google', category: 'foreign-currency',
    tags: ['Google', 'X-Ray', 'USD'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'fc-g-2', text: 'site:linkedin.com/jobs/view "frontend engineer" ("USD" OR "EUR" OR "GBP") "senior"',
    platform: 'google', category: 'foreign-currency',
    tags: ['Google', 'X-Ray', 'Salary'], quality: 'high', difficulty: 'hard',
  },
];

export const PEOPLE_POSTS_LINKEDIN: SearchString[] = [
  {
    id: 'ph-p-1', text: '"looking for" React contractor',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ph-p-2', text: '"hiring" frontend freelance',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ph-p-3', text: '"need a" React developer',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ph-p-4', text: '"looking for" frontend engineer remote',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
  {
    id: 'ph-p-5', text: '"looking for" "AI" frontend OR React',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts', 'AI'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-p-6', text: '"recommend" React developer OR freelancer',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-p-7', text: '#hiring React OR frontend',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past week',
    tags: ['LinkedIn', 'Posts', 'Hashtag'], quality: 'medium', difficulty: 'easy',
  },
  {
    id: 'ph-p-8', text: '"anyone know" React developer',
    platform: 'linkedin', category: 'people-hiring', tab: 'posts',
    filters: 'Tab: Posts, Date: Past month',
    tags: ['LinkedIn', 'Posts'], quality: 'high', difficulty: 'easy',
  },
];

export const PEOPLE_DECISION_MAKERS: SearchString[] = [
  {
    id: 'ph-dm-1', text: 'CTO OR "VP Engineering" OR "Head of Engineering"',
    platform: 'linkedin', category: 'people-hiring', tab: 'people',
    filters: 'Location: US, Industry: Technology, Company size: 11-200, Connection: 2nd',
    tags: ['LinkedIn', 'People', 'CTO'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-dm-2', text: 'Founder OR "Co-founder" OR CEO',
    platform: 'linkedin', category: 'people-hiring', tab: 'people',
    filters: 'Location: US/UK/Germany, Company size: 11-50, Industry: Software',
    tags: ['LinkedIn', 'People', 'Founder'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-dm-3', text: '"Engineering Manager" OR "Tech Lead" OR "Staff Engineer"',
    platform: 'linkedin', category: 'people-hiring', tab: 'people',
    filters: 'Location: US/EU, Company size: 51-200, Connection: 2nd',
    tags: ['LinkedIn', 'People', 'Manager'], quality: 'high', difficulty: 'hard',
  },
];

export const PEOPLE_GOOGLE: SearchString[] = [
  {
    id: 'ph-g-1', text: 'site:linkedin.com/posts "looking for" "React" ("contract" OR "freelance")',
    platform: 'google', category: 'people-hiring',
    tags: ['Google', 'X-Ray', 'Posts'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-g-2', text: 'site:linkedin.com/posts ("hiring" OR "need") "frontend" ("freelance" OR "contractor")',
    platform: 'google', category: 'people-hiring',
    tags: ['Google', 'X-Ray', 'Posts'], quality: 'high', difficulty: 'medium',
  },
  {
    id: 'ph-g-3', text: 'site:linkedin.com/in CTO "AI" "SaaS" -recruiter',
    platform: 'google', category: 'people-hiring',
    tags: ['Google', 'X-Ray', 'Profiles'], quality: 'high', difficulty: 'hard',
  },
  {
    id: 'ph-g-4', text: 'site:linkedin.com/in "VP Engineering" "remote-first" OR "globally distributed"',
    platform: 'google', category: 'people-hiring',
    tags: ['Google', 'X-Ray', 'Profiles'], quality: 'high', difficulty: 'hard',
  },
];

export const ALL_GOOGLE_XRAY: Array<{ group: string; strings: SearchString[] }> = [
  {
    group: 'Jobs with Visa Sponsorship',
    strings: VISA_GOOGLE,
  },
  {
    group: '100% Remote Jobs',
    strings: REMOTE_WORLDWIDE_GOOGLE,
  },
  {
    group: 'Remote from India',
    strings: REMOTE_INDIA_GOOGLE,
  },
  {
    group: 'Freelance / Contract',
    strings: FREELANCE_GOOGLE,
  },
  {
    group: 'Finding Decision Makers',
    strings: PEOPLE_GOOGLE.filter(s => s.tags?.includes('Profiles')),
  },
  {
    group: 'Finding Hiring Posts',
    strings: PEOPLE_GOOGLE.filter(s => s.tags?.includes('Posts')),
  },
  {
    group: 'Foreign Currency Jobs',
    strings: FOREIGN_CURRENCY_GOOGLE,
  },
];
