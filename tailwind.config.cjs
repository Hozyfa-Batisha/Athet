module.exports = {
  content: [
    "./public/index.html",
    "./public/js/**/*.js",
    "./public/data/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        themeBg: "#F7F2E6",
        orangeMain: "#0E6B55",
        orangeBorder: "#C9A24B",
        orangeLight: "#F6F1E2",
        brand: {
          50: "#F0F7F4",
          500: "#14876C",
          600: "#0E6B55",
          700: "#0A4F40",
        },
      },
    },
  },
};
