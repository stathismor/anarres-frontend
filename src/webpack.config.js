module.exports = {
    // other configuration settings...
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [
            /node_modules\/@sanity/,
            /src/ // You might also want to include your source files here
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
              ]
            }
          }
        }
      ]
    },
    // other configuration settings...
  };
  