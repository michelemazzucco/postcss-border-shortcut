const postcss = require('postcss')

const regex = {
  t: /^(?!.*(style|width|color|radius|collapse|spacing)).*border.*$/,
  c: /^(?!.*(px|rem|em|%|none)).*$/
}

const parseBorder = (value, list, { borderType = 'solid' }) =>
  list.length === 1 && list[0].match(regex.c) ?
    `1px ${borderType} ${list[0]}` : list.length === 2 ?
      `${list[0]} ${borderType} ${list[1]}` : value

module.exports = postcss.plugin('postcss-border-shortcut', (opts = {}) =>
  root => {
    root.walkDecls(regex.t, decl => {
      const { value } = decl
      const list = postcss.list.space(value)
      if (list[0] !== '0') decl.value = parseBorder(value, list, opts)
    })
  })
