const postcss = require('postcss');

module.exports = postcss.plugin('postcss-plugin-fvm', (options) => {
  const { unitPrecision, rootValue } = options;
  const pxRegex = /(\d*\.?\d+)fpx/gi;

  const vwReplace = function (value, $1) {
    // eslint-disable-next-line no-restricted-properties
    const fixed = Math.pow(10, unitPrecision);
    // eslint-disable-next-line no-mixed-operators
    return `${Math.round((parseFloat($1) / (rootValue.fpx / 100)) * fixed) / fixed}vw`;
  };

  return function (css) {
    css.walkDecls((decl, i) => {
      // eslint-disable-next-line no-bitwise
      if (~decl.value.indexOf('fpx')) {
        const value = decl.value.replace(pxRegex, vwReplace);
        decl.value = value;
      }
    });

    css.walkAtRules('media', (rule) => {
      if (!rule.params.indexOf('fpx')) {
        rule.params = rule.params.replace(pxRegex, vwReplace);
      }
    });
  };
});
