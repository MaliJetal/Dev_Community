const path = require('path');
const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode : 'development',
  devtool : 'inline-source-map',
  devServer : {
    contentBase : path.join(__dirname , 'dist'),
    port:'3080',
    proxy:{
      '/api':{
        target:"http://localhost:5000",
        //pathRewrite: { '^/api/users': '' }
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