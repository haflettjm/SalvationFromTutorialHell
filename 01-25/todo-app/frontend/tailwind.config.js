module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "theme-gray": "#41455A",
        "theme-pink": "#F19CAB",
        "theme-blue": "#2B2F4B",
        "theme-black": "#1A1A1A",
      },
    },
  },
};
