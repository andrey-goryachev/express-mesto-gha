module.exports = {
  // "env": {
  //     "browser": true,
  //     "commonjs": true,
  //     "es2021": true
  // },
  extends: 'airbnb-base',
  // "overrides": [
  // ],
  // "parserOptions": {
  //     "ecmaVersion": "latest"
  // },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['foo_', '_bar'] }],
    'comma-dangle': ['error', 'never'],
    // 'no-console': ['error', { allow: ['warn', 'error'] }]
    'no-console': { allow: ['warn', 'error']}
  }
};
