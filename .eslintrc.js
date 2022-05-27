module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: ['error', 4],
        'no-param-reassign': 'off',
        'no-console': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'one-var': 'off',
        'arrow-body-style': 'off',
        'no-unused-vars': 'off',
    },
};
