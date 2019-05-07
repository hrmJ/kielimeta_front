export default {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: 'babel-loader' },
        {
          loader: 'string-replace-loader',
          options: {
            multiple: [
              {
                search: '%%API_SERVER_HOST%%',
                replace: process.env.API_SERVER_HOST
              },
              {
                search: '%%API_SERVER_HOST_TEST%%',
                replace: process.env.API_SERVER_HOST_TEST
              },
              {
                search: '%%API_SERVER_PORT%%',
                replace: process.env.API_SERVER_PORT
              },
              {
                search: '%%API_SERVER_PROTOCOL%%',
                replace: process.env.API_SERVER_PROTOCOL
              }
            ]
          }
        }
      ]
    },

    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]_[local]_[hash:base64]'
            // sourceMap: true,
            // minimize: true
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    }
  ]
};
