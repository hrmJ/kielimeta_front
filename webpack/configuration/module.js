export default {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modlles/,
      use: [
        { loader: "babel-loader" },
        {
          loader: "string-replace-loader",
          options: {
            multiple: [
              {
                search: "%%API_SERVER_HOST%%",
                replace: process.env.API_SERVER_HOST
              },
              {
                search: "%%API_SERVER_PORT%%",
                replace: process.env.API_SERVER_PORT
              }
            ]
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: "[name]_[local]_[hash:base64]"
            // sourceMap: true,
            // minimize: true
          }
        },
        {
          loader: "sass-loader"
        }
      ]
    }
  ]
};
