/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add animation keyframes
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        }
      },
      // Define animation classes
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 6s ease-in-out infinite 1s',
        'float-delay-2': 'float 6s ease-in-out infinite 2s',
        'spin': 'spin 8s linear infinite',
      },
      // Add any custom colors needed for the landing page
      colors: {
        blue: {
          '500': '#3b82f6',
        },
        orange: {
          '500': '#f97316',
        },
        slate: {
          '50': '#f8fafc',
          '200': '#e2e8f0',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
        },
      },
      // Add any spacing or other utilities needed
      opacity: {
        '10': '0.1',
      }
    },
  },
  plugins: [],
}