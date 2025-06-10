import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      fontFamily: {
        'integral': ['Integral CF', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        secondary: '#666666',
        accent: '#F1F1F1',
        error: '#FF3333',
        success: '#00CC66',
      }
    },
  },
} satisfies Config