const path = require('path');

module.exports = {
  SRC: path.resolve(__dirname, 'src'),
  APP: path.resolve(__dirname, 'src/app'),
  THEME: path.resolve(__dirname, 'src/app/theme'),
  THEME_VARIABLES: path.resolve(__dirname, 'src/app/theme/variables.scss'),
  THEME_FONTS: path.resolve(__dirname, 'src/app/theme/fonts'),
  BUILD: path.resolve(__dirname, 'build'),
  ASSETS: path.resolve(__dirname, 'assets'),
  TEST: path.resolve(__dirname, 'test'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  COMPONENTS: path.resolve(__dirname, 'src/app/components'),
  BASIC_COMPONENTS: path.resolve(__dirname, 'src/app/components/Basic'),
  ROUTES: path.resolve(__dirname, 'src/app/routes'),
  DOMAIN: path.resolve(__dirname, 'src/app/domain')
};
