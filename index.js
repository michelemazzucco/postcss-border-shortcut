var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  return function (css) {
    css.walkDecls( function (decl) {
      var borderRegExp = /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
          unitRegExp = /^(?!.*(px|rem|em|%)).*$/,
          valueList = postcss.list.space(decl.value),
          prop = decl.prop + ': ',
          firstValue = valueList[0],
          lastValue = valueList[2],
          res = '';

      if (decl.prop.match(borderRegExp) && firstValue.length >= 2) {
        if (valueList.length === 1 && firstValue.match(unitRegExp)) {
          lastValue = firstValue;
          res = '1px ' + type + ' ' + lastValue;
          decl.replaceWith(prop + res);
        } else if (valueList.length === 2) {
          lastValue = valueList[1];
          res = firstValue + ' ' + type + ' ' + lastValue;
          decl.replaceWith(prop + res);
        }
      }
    });
  };
});
