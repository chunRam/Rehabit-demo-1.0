module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules', 'dist'],
  overrides: [
    {
      files: ['apps/mobile/**/*.{js,jsx}'],
      env: {
        browser: true,
        node: false
      }
    },
    {
      files: ['**/*.test.js'],
      env: {
        node: true
      }
    }
  ]
};
