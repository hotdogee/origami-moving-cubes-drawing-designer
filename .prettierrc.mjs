/** @type {import("prettier").Config} */

const config = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
}

export default config
