var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};

  return function (css) {
    css.walkDecls( function (decl) {
      var borderRegExp = /^(?!.*(style|width|color)).*border.*$/;
      var pxRegExp = /^((?!px).)*$/;

      if (decl.prop.match(borderRegExp)) {
        var valueList = postcss.list.space(decl.value);
        var prop = decl.prop;
        var FirstValue = valueList[0];
        var LastValue = valueList[2];

        if (valueList.length == 2) {
          LastValue = valueList[1];
          decl.replaceWith(prop + ':' + FirstValue + ' solid ' + LastValue);
        } else if (valueList.length == 1 && FirstValue.match(pxRegExp)) {
          LastValue = FirstValue;
          decl.replaceWith(prop + ': 1px solid ' + LastValue);
        }
      }
    });
  };
});
