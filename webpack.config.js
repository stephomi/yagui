var path = require('path');

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
    config.devtool = 'eval';
  } else {
    config.devtool = 'source-map';
  }

  if (isRelease) {
    config.module.rules.push({
      test: /\.js$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader',
        options: {
          plugins: [
            ['transform-es2015-classes', { loose: true }],
            'transform-es2015-block-scoping'
          ]
        }
      }],
    });
  }

  return config;
};
