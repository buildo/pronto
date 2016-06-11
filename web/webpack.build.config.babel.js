import path from 'path';
import webpack from 'webpack';
import base from './webpack.base.babel';
import config from './config';
import paths from './paths';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackUtil from './webpack.util.babel';

const plugins = [
  // cause failed production builds to fail faster
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin(WebpackUtil.getHtmlPluginConfig(config, true)),
  new ExtractTextPlugin('style', '/style.[hash].min.css')
];

if (config.gzip) {
  plugins.unshift(new CompressionPlugin({
    regExp: /\.js$|\.css$/
  }));
}

if (config.uglify) {
  plugins.unshift(
    // Minimize all JavaScript output of chunks.
    // Loaders are switched into minimizing mode.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  );
}

module.exports = {
  ...base,

  entry: path.resolve(paths.SRC, 'client/index.js'),

  devtool: 'source-map',

  plugins: plugins.concat(base.plugins),

  module: {
    ...base.module,

    loaders: base.module.loaders.concat([{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      exclude: paths.THEME_VARIABLES,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url?sourceMap!sass?sourceMap')
    }
  ])
  }
};
