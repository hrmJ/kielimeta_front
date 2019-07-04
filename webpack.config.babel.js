import { module, plugins, resolve } from './webpack/configuration';

export default {
  module,
  plugins,
  resolve,
  entry: {
    app: './src/index.jsx'
  },
  output: {
    filename: 'bundle.js'
  }
};
