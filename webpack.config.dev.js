const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode : 'development',
  devtool : 'inline-source-map',
  devServer : {
    contentBase : './dist',
    port:'3000',
    proxy: {
      '/widgets': {
          // server to proxy
          target: 'http://localhost:5000'
      }
    }
  },
  module : {
    rules : [
      {
        test : /\.css$/,
        use : ['style-loader', 'css-loader']
      }
    ]
  }
})