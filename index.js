var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  return function (css) {
    css.walkDecls( function (decl) {
      var borderRx = /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/, // eslint-disable-line max-len
          unitRx = /^(?!.*(px|rem|em|%|none)).*$/,
          valueList = postcss.list.space(decl.value),
          prop = decl.prop + ': ',
          firstValue = valueList[0],
          lastValue = valueList[2],
          res = '';

      if (decl.prop.match(borderRx) && firstValue.length >= 2) {
        if (valueList.length === 1 && firstValue.match(unitRx)) {
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
