const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode : 'development',
  devtool : 'inline-source-map',
  devServer : {
    contentBase : path.join(__dirname, 'dist'),
    port:'5000',
    proxy: {
      '/api/users': {
          // server to proxy
          target: 'http://localhost:3000/'
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