//only for the purpose of using intelli
// tailwind.config.js
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            100: '#E6F0FF',
            500: '#3B82F6',
            600: '#2563EB',
          },
          secondary: {
            500: '#10B981',
          },
          gray: {
            100: '#F3F4F6',
            200: '#E5E7EB',
            700: '#374151',
          }
        },
      },
    },
    plugins: [],
  }
  