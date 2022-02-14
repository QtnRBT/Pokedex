const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    purgecss({
      content: ["./src/**/*.vue", "./src/components/*.vue", "./src/views/*.vue"],
      // safelist: ["h-3/6", "h-1/5", "h-4/5", "-top-1/2", "h-2/5"],
      // options: {
      //   whitelist: ["views", "components"],
      // },
      defaultExtractor: (content) => content.match(/[\w-:./]+(?<!:)/g) || [],
    })
  ],
}
