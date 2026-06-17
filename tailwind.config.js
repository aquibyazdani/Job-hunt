/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Vercel design system tokens
        ink: '#171717',
        canvas: {
          DEFAULT: '#ffffff',
          soft: '#fafafa',
          soft2: '#f5f5f5',
        },
        hairline: {
          DEFAULT: '#ebebeb',
          strong: '#a1a1a1',
        },
        // Semantic text
        'ds-body': '#4d4d4d',
        'ds-mute': '#888888',
        // Brand / accent
        'ds-link': '#0070f3',
        'ds-cyan': '#50e3c2',
        'ds-violet': '#7928ca',
        'ds-pink': '#ff0080',
        // Keep navy for legacy dark surfaces
        navy: {
          950: '#0a0f1e',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        'tight-xl': '-2.4px',
        'tight-lg': '-1.28px',
        'tight-md': '-0.96px',
        'tight-sm': '-0.6px',
        'tight-xs': '-0.28px',
      },
      boxShadow: {
        // Vercel stacked shadow system (+ inset hairline ring)
        'v1': 'inset 0 0 0 1px rgba(0,0,0,0.08)',
        'v2': '0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.08)',
        'v3': '0px 2px 2px rgba(0,0,0,0.04), 0px 8px 8px -8px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.08)',
        'v4': '0px 2px 2px rgba(0,0,0,0.04), 0px 8px 16px -4px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(0,0,0,0.08)',
        'v5': '0px 1px 1px rgba(0,0,0,0.03), 0px 8px 16px -4px rgba(0,0,0,0.04), 0px 24px 32px -8px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        pill: '100px',
        'pill-sm': '64px',
      },
    },
  },
  plugins: [],
};
