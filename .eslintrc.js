const { parserOptions } = require('../../nest/my-nest/.eslintrc')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': 'error',
    'vue/no-unused-vars': 'error',
  },
}
