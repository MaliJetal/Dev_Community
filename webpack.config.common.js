const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryFile = path.resolve(__dirname, 'src', 'client', 'index.js');
const outputDir = path.resolve(__dirname, 'dist');

module.exports = {
 entry: ['babel-polyfill', entryFile],
 context: __dirname,
 output: {
      filename: 'bundle.js',
      path: outputDir
 },
 plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename : 'index.html',
    inject:true,
    template:path.resolve(__dirname,'public','index.html')
  })
],
 module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ],
  }
};