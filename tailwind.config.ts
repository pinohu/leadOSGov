import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'gov-navy': '#1C1E54',
        'gov-gold': '#C9A84C',
        'gov-slate': '#64748b',
      }
    }
  },
  plugins: []
}
export default config
