module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['prettier'],
    rules: {
        indent: ['error', 4],
        eqeqeq: [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        quotes: ['error', 'single'],
        'accessor-pairs': 'error',
        semi: 'off',
        'semi-style': 'error',
        'no-caller': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                ignoreRestSiblings: true
            }
        ],
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-tabs': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'comma-dangle': 'error',
        '@typescript-eslint/no-floating-promises': 'error'
    },
    ignorePatterns: ['**/__generated__/**/*', '**/dist/**/*', '**/generated/**/*']
}
