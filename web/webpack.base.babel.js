import webpack from 'webpack';
import config from './config';
import paths from './paths';

const NODE_ENV = process.env.NODE_ENV || config.NODE_ENV || 'development';

const preLoaders = config.eslint ? [{
  test: /\.jsx?$/,
  loader: 'eslint',
  include: paths.APP,
  exclude: paths.ASSETS
}] : [];

module.exports = {

  resolve: {
    root: [
      paths.NODE_MODULES,
      paths.APP,
      paths.COMPONENTS,
      paths.BASIC_COMPONENTS,
      paths.ROUTES,
      paths.DOMAIN
    ]
  },

  stats: {
    children: false
  },

  output: {
    library: 'webclient',
    libraryTarget: 'var',
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ],

  module: {
    preLoaders,
    loaders: [{
      test: /\.jsx?$/, // test for both js and jsx
      loaders: ['babel'],
      exclude: [paths.ASSETS],
      include: [
        paths.SRC, paths.TEST, /buildo-react-components/, /react-autosize-textarea/,
        /node_modules\/state/, /state-react-router/, /react-avenger/,
        /node_modules\/react-container/
      ]
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: paths.THEME_FONTS,
      loader: `file?name=[path][name].[ext]&context=${paths.THEME}`
    }, {
      test: /\.png$/,
      loader: 'file?name=[path][name].[ext]'
    }, {
      test: paths.THEME_VARIABLES,
      loader: 'sass-variables'
    }]
  }

};
