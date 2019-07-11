import path from 'path';
console.log(path.resolve(__dirname, '../../src'));

export default {
  rules: [
    {
      test: /\.jsx?$/,
      include: path.resolve(__dirname, '../../src'),
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
      include: /unmodifiedSass/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    },

    {
      test: /\.scss$/,
      exclude: /unmodifiedSass/,
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
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 20000, // Convert images < 20kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }
      ]
    }
  ]
};
