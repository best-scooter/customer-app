module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier'
  ],
  plugins: ['jest', 'prettier', 'import'],
  env: {
    'jest/globals': true
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ]
  },
  parserOptions: {
    project: './tsconfig.json'
  }
};
