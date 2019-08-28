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
                replace: process.env.API_SERVER_HOST,
                flags: 'g'
              },
              {
                search: '%%API_SERVER_HOST_TEST%%',
                replace: process.env.API_SERVER_HOST_TEST,
                flags: 'g'
              },
              {
                search: '%%API_SERVER_PORT%%',
                replace: process.env.API_SERVER_PORT,
                flags: 'g'
              },
              {
                search: '%%API_SERVER_PROTOCOL%%',
                replace: process.env.API_SERVER_PROTOCOL,
                flags: 'g'
              },
              {
                search: '%%REGISTER_MAINTAINER1%%',
                replace: process.env.REGISTER_MAINTAINER1,
                flags: 'g'
              },
              {
                search: '%%REGISTER_MAINTAINER2%%',
                replace: process.env.REGISTER_MAINTAINER2,
                flags: 'g'
              },
              {
                search: '%%REGISTER_MAINTAINER_ADDRESS%%',
                replace: process.env.REGISTER_MAINTAINER_ADDRESS,
                flags: 'g'
              },
              {
                search: '%%REGISTER_CONTACTPERSON%%',
                replace: process.env.REGISTER_CONTACTPERSON,
                flags: 'g'
              },
              {
                search: '%%REGISTER_CONTACTPERSON_EMAIL%%',
                replace: process.env.REGISTER_CONTACTPERSON_EMAIL,
                flags: 'g'
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
