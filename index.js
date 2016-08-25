var postcss = require('postcss');

var regex = {
  bType: /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
  color: /^(?!.*(px|rem|em|%|none)).*$/
};

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  function parseBorder(v, l) {
    var result;

    if (l.length === 1 && l[0].match(regex.color)) {
      result = '1px ' + type + ' ' + l[0];
    } else if (l.length === 2) {
      result = l[0] + ' ' + type + ' ' + l[1];
    } else {
      result = v;
    }

    return result;
  }

  return function (root) {
    root.walkDecls(regex.bType, function (decl) {
      var value = decl.value;
      var valueList = postcss.list.space(value);

      if (valueList[0] !== '0') {
        decl.value = parseBorder(value, valueList);
      }
    });
  };
});
