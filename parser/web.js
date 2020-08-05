/**
 * web端fpx单位适配
 */
const postcss = require('postcss');
const px2rem = require('postcss-plugin-px2rem');
const fvw = require('../postcss/fvw');
const { supportVw } = require('../utils');

module.exports = function (source, options) {
  if ((options.forceRem || !supportVw()) && options.forceVw) { // rem
    return postcss([px2rem({
      ...options,
      rootValue: {
        fpx: options.rootValue.fpx / 10,
      },
    })]).process(source).css;
  }
  return postcss([fvw(options)]).process(source).css; // vw
};
