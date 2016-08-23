var postcss = require('postcss');

var regex = {
  type: /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
  color: /^(?!.*(px|rem|em|%|none)).*$/
}

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
  opts = opts || {};
  var type = opts.borderType || 'solid';

  function parseBorder(el) {
    var value_list = postcss.list.space(el.value);
    var prop = el.prop + ': ';
    var result = '';

    if (value_list[0].length >= 2){
      if (value_list.length === 1 && value_list[0].match(regex.color)) {
        result = '1px ' + type + ' ' + value_list[0];
        el.replaceWith(prop + result)
      } else if (value_list.length === 2) {
        result = value_list[0] + ' ' + type + ' ' + value_list[1];
        el.replaceWith(prop + result)
      }
    }
  }

  return function (css) {
    css.walkDecls(regex.type, function(decl) {
      parseBorder(decl)
    });
  };
});
