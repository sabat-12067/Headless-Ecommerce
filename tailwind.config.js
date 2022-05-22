module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1000px',
      xl: '1440px',
    },
    colors: {
      'primary-1': '#f9fafb',
      'primary-2': '#f3f4f6',
      'primary-3': '#e5e7eb',
      'primary-4': '#d1d5db',
      'primary-5': '#9ca3af',
      'primary-6': '#6b7280',
      'primary-7': '#4b5563',
      'primary-8': '#374151',
      'primary-9': '#1f2937',
      'primary-10': '#111827',
      'primary-11': 'hsl(205, 100%, 21%)',
      'white': '#fff',
      'red': 'hsl(0, 100%, 50%)',

      'secondary-1': '#fff7ed',
      'secondary-2': '#ffedd5',
      'secondary-3': '#fed7aa',
      'secondary-4': '#fdba74',
      'secondary-5': '#fb923c',
      'secondary-6': '#f97316',
      'secondary-7': '#ea580c',
      'secondary-8': '#c2410c',
      'secondary-9': '#9a3412',
      'secondary-10': '#7c2d12',
    },
    gridTemplateColumns: {
      'autofill-sm': 'repeat(auto-fill, minmax(170px, 1fr))',
      'autofill-lg': 'repeat(auto-fit, minmax(260px, 1fr))',
      'autofill-details': 'repeat(auto-fit, minmax(250px, 1fr))',
      'grid-sm': 'repeat(2, 2fr)',
      'grid-thumbs': 'repeat(auto-fill, minmax(80px, 1fr))',
      'grid-checkout-pg': 'repeat(5, 1fr)',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      zoomInOut: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(0.8)' }
      },
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-15px)' },
      }
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      zoomInOut: 'zoomInOut 1s ease-in-out infinite',
      bounce: 'bounce 1s ease-in-out infinite',
    },
    extend: {},
  },
  plugins: [],
};