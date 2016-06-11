import path from 'path';
import base from './webpack.base.babel';
import config from './config';
import paths from './paths';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackUtil from './webpack.util.babel';

module.exports = {
  ...base,

  entry: [
    'webpack/hot/dev-server',
    path.resolve(paths.SRC, 'client/customer.js')
  ],

  devtool: config.devTool || 'source-map',

  devServer: {
    contentBase: paths.BUILD,
    hot: true,
    inline: true,
    port: config.port
  },

  plugins: base.plugins.concat([
    new HtmlWebpackPlugin(WebpackUtil.getHtmlPluginConfig(config, false))
  ]),

  module: {
    ...base.module,

    loaders: base.module.loaders.concat([{
      test: /\.css?$/,
      loaders: ['style', 'css']
    }, {
      test: /\.scss?$/,
      exclude: paths.THEME_VARIABLES,
      loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
    }])
  }

};
