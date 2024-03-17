module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|webp)$/i,
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'src/assets',
            },
          },
        ],
      },
    },
  };