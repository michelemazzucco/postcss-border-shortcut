var postcss = require('postcss');

var regex = {
  type: /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
  color: /^(?!.*(px|rem|em|%|none)).*$/
}

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  function parseBorder(v, l) {
    var result = '';
    var value_list = l;

    if (value_list.length === 1 && value_list[0].match(regex.color)) {
      result = '1px ' + type + ' ' + value_list[0];
    } else if (value_list.length === 2) {
      result = value_list[0] + ' ' + type + ' ' + value_list[1];
    } else {
      result = v;
    }

    return result;
  }

  function isBorder(d) {
    var value = d.value;
    var value_prop = d.prop + ': ';
    var value_list = postcss.list.space(value);

    if (value_prop.match(regex.type) && value_list[0].length >= 2) {
      d.replaceWith(prop + parseBorder(value, value_list));
    }
  }

  return function (css) {
    css.walkDecls(regex.type, function (decl) {
      isBorder(decl);
    });
  };
});
