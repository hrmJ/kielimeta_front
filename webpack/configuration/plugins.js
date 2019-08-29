//import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WebpackAutoInject from 'webpack-auto-inject-version';

const plugins = [
  new HtmlWebPackPlugin({
    title: 'Codejobs',
    template: './src/index.html',
    filename: './index.html'
  }),
  new CopyWebpackPlugin([{ from: 'src/images', to: 'images' }]),
  new WebpackAutoInject()
  // new BundleAnalyzerPlugin()
];

export default plugins;
