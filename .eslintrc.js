module.exports = {
  extends: ['airbnb'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  globals: {
    fetch: false
  },
  rules: {
    'max-len': 1
  }
};
