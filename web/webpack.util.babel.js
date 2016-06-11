import path from 'path';
import fs from 'fs';

const getTemplate = (config) => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, './src/app/index.html'), 'utf8')
    .replace(/__GZIP__/g, config.gzip ? '.gz' : '');

  if (!config.iso) {
    return indexHtml
      .replace('__TITLE__', config.title)
      .replace('__STATE__', 'null')
      .replace('__DATA__', '{}')
      .replace('__CONTENT__', '')
      .replace('__LOCALE__', 'null');
  }
  return indexHtml;
};

const getHtmlPluginConfig = (config, bundle) => {
  return {
    bundle,
    inject: false,
    minify: bundle ? {} : false,
    templateContent: getTemplate(config)
  };
};

export default {
  getHtmlPluginConfig
};
