const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entryFile = path.resolve(__dirname, 'src', 'client', 'index.js');
const outputDir = path.resolve(__dirname, 'public');
module.exports = {
 entry: ['babel-polyfill', entryFile],
 output: {
      filename: 'bundle.js',
      path: outputDir
 },
 plugins: [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename : 'index.html',
    inject:true,
    template:path.resolve(__dirname,'src','index.html')
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
      test: /\.(scss|css)$/,
      use: [
          {
            loader: 'style-loader'
          }, 
          { 
            loader: 'css-loader',
          }, 
          { 
            loader: 'sass-loader' 
          }
        ]
      }
    ]
 }
};