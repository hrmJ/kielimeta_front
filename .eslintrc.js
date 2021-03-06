module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/babel', 'prettier/react'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  globals: {
    fetch: false
  },
  rules: {
    'max-len': 1,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id']
        },
        allowChildren: false
      }
    ]
  },
  env: {
    jest: true
  }
};
