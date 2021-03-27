module.exports = {
  extends: ['eslint:recommended', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    node: true,
  },
  env: {
    'jest/globals': true,
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'prefer-arrow-callback': 'off',
        'func-names': 'off',
      },
    },
  ],
};
