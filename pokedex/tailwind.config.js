module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.js", "./index.html", "./src/**/*.vue"],
  },
  mode: 'hash',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'form': "0px 0px 20px 3px rgba(0,0,0,0.25)",
      },
      screens: {
        'mid': '930px',
        '3xl': '1620px',
      },
    },
  },
  variants: {},
  plugins: [],
}
