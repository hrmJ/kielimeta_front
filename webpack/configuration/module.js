export default {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modlles/,
      use: 'babel-loader',
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64]',
            // sourceMap: true,
            // minimize: true
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
  ],
};
