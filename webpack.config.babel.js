import { module, plugins, resolve } from './webpack/configuration';

export default {
  module,
  plugins,
  resolve,
  entry: {
    main: './src/index.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  }
};
