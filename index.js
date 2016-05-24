var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};

  return function (css) {
    css.walkDecls( function (decl) {
      var borderRegExp = /^(?!.*(style|width|color|radius)).*border.*$/;
      var unitRegExp = /^(?!.*(px|rem|em|%)).*$/;

      if (decl.prop.match(borderRegExp)) {
        var valueList = postcss.list.space(decl.value),
            prop = decl.prop,
            firstValue = valueList[0],
            lastValue = valueList[2];

        if (valueList.length === 1 && firstValue.match(unitRegExp) && firstValue.length >= 2) {
          lastValue = firstValue;
          decl.replaceWith(prop + ': 1px solid ' + lastValue);
        } else if (valueList.length === 2) {
          lastValue = valueList[1];
          decl.replaceWith(prop + ':' + firstValue + ' solid ' + lastValue);
        }
      }
    });
  };
});
