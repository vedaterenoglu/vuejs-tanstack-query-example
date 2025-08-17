import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import security from 'eslint-plugin-security'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    name: 'app/files-to-ignore',
    ignores: ['dist/**', 'node_modules/**', '.storybook/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  security.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    ignores: ['vite.config.ts'],
    plugins: {
      security,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.app.json',
        tsconfigRootDir: '.',
      },
    },
    rules: {
      // Code Style Rules (matching React project)
      semi: ['error', 'never'],
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // TypeScript Rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true, allowBoolean: true },
      ],

      // Import Order Rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      // Security Rules
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-require': 'error',

      // Vue specific rules
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['vite.config.ts', '.storybook/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      semi: ['error', 'never'],
    },
  },
]