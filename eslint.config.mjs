import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  ...nextVitals,
  {
    // eslint-config-next já registra o plugin jsx-a11y; aqui ligamos o conjunto
    // completo de regras recomendadas (não só o subconjunto padrão do Next).
    files: ['**/*.{js,jsx,mjs}'],
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      'no-console': ['error', { allow: ['error'] }],
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'dist/**',
    'prototype/**',
    'node_modules/**',
    'playwright-report/**',
    'test-results/**',
  ]),
]);
