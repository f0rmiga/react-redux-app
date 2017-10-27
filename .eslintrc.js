// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  plugins: [
    'react'
  ],
  extends: 'airbnb',
  rules: {
    'max-len': ['warn', 240],
    'no-bitwise': 'off',
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'import/extensions': ['error', 'always', {
      js: 'never'
    }],
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'import/prefer-default-export': 'off',
    'no-alert': 'off',
    'no-mixed-operators': 'off',
    'no-prototype-builtins': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'react/forbid-prop-types': 'off'
  }
};
