/**
 * fpx-css-loader webpack插件
 * 自动给入口文件注入flexible.js代码
 */
const { supportVw } = require('./utils');

class FpxWebpackPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    if ((this.options.forceRem || !supportVw()) && !this.options.forceVw) {
      Object.keys(compiler.options.entry).forEach((key) => {
        if (!(compiler.options.entry[key] instanceof Array)) {
          compiler.options.entry[key] = [compiler.options.entry[key]];
        }
        compiler.options.entry[key] = [`!!${require.resolve('amfe-flexible/index.min.js')}`, ...compiler.options.entry[key]];
      });
    }
  }
}

FpxWebpackPlugin.NAME = 'FpxWebpackPlugin';
module.exports = FpxWebpackPlugin;
