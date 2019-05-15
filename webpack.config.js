var path = require('path');

module.exports = function (env) {
  var config = {
    entry: './src/yagui.js',
    output: {
      library: 'yagui',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'build'),
      filename: 'yagui.js'
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

  config.mode = isRelease ? 'production' : 'development';

  if (isRelease) {
    config.module.rules.push({
      test: /\.js$/,
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