var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.type || 'solid';
  return function (css) {
    css.walkDecls( function (decl) {
      var borderRegExp = /^(?!.*(style|width|color|radius)).*border.*$/,
          unitRegExp = /^(?!.*(px|rem|em|%)).*$/,
          finalResult = '';

      if (decl.prop.match(borderRegExp)) {
        var valueList = postcss.list.space(decl.value),
            prop = decl.prop,
            firstValue = valueList[0],
            lastValue = valueList[2];

        if (valueList.length === 1 && firstValue.match(unitRegExp) && firstValue.length >= 2) {
          lastValue = firstValue;
          finalResult = decl.replaceWith(prop + ': 1px ' + type + lastValue);
          return finalResult;
        } else if (valueList.length === 2) {
          lastValue = valueList[1];
          finalResult = decl.replaceWith(prop + ':' + firstValue + type + lastValue)
          return finalResult;
        }
      }
    });
  };
});
