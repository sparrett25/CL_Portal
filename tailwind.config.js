module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for better contrast
        zinc: {
          900: '#111111',  // Dark background
          700: '#2d2d2d',  // Lighter zinc for inputs and cards
        },
        indigo: {
          500: '#6366F1',  // Indigo color for focus rings, etc.
        },
        white: '#ffffff',  // Explicit white color
      },
      textColor: {
        white: '#ffffff',  // Make sure white text is applied
      },
      backgroundColor: {
        'zinc-950': '#1e1e1e', // Custom dark background color
      }
    },
  },
  darkMode: 'class',  // Enable dark mode
  plugins: [],
}
