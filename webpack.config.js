var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (env) {
  var config = {
    entry: './src/yagui.js',
    output: {
      library: 'yagui',
      libraryTarget: 'umd',
      filename: './build/yagui.js'
    },
    resolve: {
      modules: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: []
    }
  };

  var isRelease = env && env.release;

  if (!isRelease) {
    config.devtool = 'inline-cheap-source-map';
  }

  if (isRelease) {
    config.plugins = [new UglifyJsPlugin()];

    config.module.rules.push({
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }],
    });
  }

  return config;
};