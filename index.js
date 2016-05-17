var postcss = require('postcss');

module.exports = postcss.plugin('postcss-border-shortcut', function (opts) {
    opts = opts || {};

    return function (css) {

        css.walkDecls( function (decl) {
            if (decl.prop.match(/border/i)) {
                var valueList = postcss.list.space(decl.value);
                var prop = decl.prop;
                var FirstValue = valueList[0];
                var LastValue = valueList[2];

            if (valueList.length <= 2) {
              LastValue = valueList[1];
              decl.replaceWith(prop + ':' + FirstValue + ' solid ' + LastValue);
            }
          }
        });
    };
});
