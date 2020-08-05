/**
 * 判断当前环境是否支持vw适配
 * @returns {boolean}
 */
exports.supportVw = function () {
  //  支持浏览器环境
  const supportList = require('browserslist')();
  // vw所支持的浏览器环境
  const vw = require('caniuse-lite/data/features/viewport-units');
  const unpack = require('caniuse-lite').feature;
  // 默认支持
  let support = true;
  function browsersSort(a, b) {
    a = a.split(' ');
    b = b.split(' ');
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    return Math.sign(parseFloat(a[1]) - parseFloat(b[1]));
  }
  // Convert Can I Use data
  function f(data, opts, callback) {
    data = unpack(data);
    if (!callback) {
      [callback, opts] = [opts, {}];
    }
    const need = [];
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const browser in data.stats) {
      const versions = data.stats[browser];
      // eslint-disable-next-line guard-for-in,no-restricted-syntax
      for (const version in versions) {
        const suppor = versions[version];
        if (suppor === 'n') {
          need.push(`${browser} ${version}`);
        }
      }
    }
    callback(need.sort(browsersSort));
  }
  f(vw, (browsers) => {
    browsers.forEach((item) => {
      if (supportList.includes(item)) {
        support = false;
      }
    });
  });

  return support;
};
