module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'jest',
    ],
    rules:{
        "@typescript-eslint/no-explicit-any": 0
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:jest/recommended',
    ],
  };