var postcss = require('postcss');

var regex = {
  type: /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
  color: /^(?!.*(px|rem|em|%|none)).*$/
}

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  return function (css) {
    css.walkDecls( function (decl) {
      var valueList = postcss.list.space(decl.value);
      var prop = decl.prop + ': ';
      var res = '';


      if (decl.prop.match(regex.type) && valueList[0].length >= 2) {
        if (valueList.length === 1 && valueList[0].match(regex.color)) {
          res = '1px ' + type + ' ' + valueList[0];
          decl.replaceWith(prop + res);
        } else if (valueList.length === 2) {
          res = valueList[0] + ' ' + type + ' ' + valueList[1];
          decl.replaceWith(prop + res);
        }
      }
    });
  };
});
