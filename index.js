var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.type || 'solid';

  return function (css) {
    css.walkDecls( function (decl) {
      var borderRegExp = /^(?!.*(style|width|color|radius)).*border.*$/,
          unitRegExp = /^(?!.*(px|rem|em|%)).*$/,
          valueList = postcss.list.space(decl.value),
          prop = decl.prop,
          firstValue = valueList[0],
          lastValue = valueList[2],
          result = '';

      if (decl.prop.match(borderRegExp) && firstValue.length >= 2) {
        if (valueList.length === 1 && firstValue.match(unitRegExp)) {
          lastValue = firstValue;
          result = prop + ': 1px ' + type + ' ' + lastValue;
        } else if (valueList.length === 2) {
          lastValue = valueList[1];
          result = prop + ': ' + firstValue + ' ' + type + ' ' + lastValue;
        }
        decl.replaceWith(result);
      }
    });
  };
});
