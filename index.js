var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
    opts = opts || {};

    return function (css, result) {

        css.walkDecls(function(decl) {

          if (decl.prop.match(/border/i)) {
            var valueList = postcss.list.space(decl.value),
                prop = decl.prop,
                FirstValue = valueList[0],
                borderType = valueList[1],
                LastValue = valueList[2];

            if (valueList.length <= 2) {
              LastValue = valueList[1];
              decl.replaceWith(prop + ':' + FirstValue + ' solid ' + LastValue);
            }
          }
        });
    };
});
