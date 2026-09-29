import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedActions,
  ...config.recommendedTsconfig,
  ...config.recommendedRegex,
  ...config.recommendedVirtualDom,
  {
    rules: {
      'devcontainer/require-desktop-lite-feature': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'prefer-destructuring': 'off',
      'unicorn/no-for-loop': 'off',
      'jest/no-identical-title': 'off',
      'unicorn/prefer-single-call': 'off',
      '@cspell/spellchecker': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      'sonarjs/prefer-specific-assertions': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // Preserve real DOM input events covered by the migrated application scenarios.
    files: [
      'packages/e2e-integration/src/viewlet.activity-bar-source-control-selected-with-badge.ts',
      'packages/e2e-integration/src/viewlet.activity-bar-source-control-repeated.ts',
      'packages/e2e-integration/src/viewlet.activity-bar-source-control-nested-icon.ts',
      'packages/e2e-integration/src/viewlet.activity-bar-source-control-badge-updates-on-save.ts',
      'packages/e2e-integration/src/viewlet.activity-bar-keyboard-navigation.ts',
    ],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
])
