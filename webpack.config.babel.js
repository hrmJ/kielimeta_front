import { module, plugins, resolve } from './webpack/configuration';

export default {
  module,
  plugins,
  resolve,
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'bundle.js',
  },
};
