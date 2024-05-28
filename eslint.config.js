// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'max-len': [1, 100],
      'max-params': [1, 5],
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'indent': ['error', 'tab'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-extra-semi': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 2 }],
	  'eol-last': ['error', 'always'],
	  '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
	  "@typescript-eslint/no-floating-promises": "off"
    },
  },
  {
    ignores: [
		'node_modules/',
		'dist/',
		'vite.config.js',
		'server.cjs',
		'eslint.config.js'
    ],
  },
);
