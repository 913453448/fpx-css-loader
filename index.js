const loaderUtils = require('loader-utils');
const plugin = require('./plugin');
const webParse = require('./parser/web');

const defaultOpts = {
  rootValue: {
    fpx: 750,
  },
  forceRem: false,
  forceVw: false,
  platform: 'web',
  unitPrecision: 5,
};

module.exports = function (source, options) {
  options = {
    ...defaultOpts,
    ...loaderUtils.getOptions(this) || {},
  };
  if (source) {
    let result;
    switch (options.platform) {
      case 'web':
        result = webParse(source, options);
        break;
      default:
        result = webParse(source, options);
        break;
    }
    return result;
  }
  return source;
};
module.exports.FoxCssPlugin = plugin;
