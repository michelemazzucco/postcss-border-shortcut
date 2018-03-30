const test = require('ava')
const postcss = require('postcss')
const plugin = require('./')

const run = (t, input, output, opts = {}) =>
  postcss([plugin(opts)]).process(input)
    .then((result) => {
      t.deepEqual(result.css, output)
      t.deepEqual(result.warnings().length, 0)
    })

test('Add border types to border property', t =>
  run(t,
    'div { border: 1px red; }',
    'div { border: 1px solid red; }'
  )
)

test('Add border types to border top property', t =>
  run(t,
    '.class { border-top: 1px green; }',
    '.class { border-top: 1px solid green; }'
  )
)

test('Works with only color property', t =>
  run(t,
    'div { border: green; border-bottom: #423424; }',
    'div { border: 1px solid green; border-bottom: 1px solid #423424; }'
  )
)

test('Not edit decl of other types of border property', t =>
  run(t,
    '.class { border-style: solid; border-collapse: separate; }',
    '.class { border-style: solid; border-collapse: separate; }'
  )
)

test('Not change complete border declaration and with only size expressed', t =>
  run(t,
    'div { border-bottom: red dashed 10px; border: 42em; }',
    'div { border-bottom: red dashed 10px; border: 42em; }'
  )
)

test('Not change border with value of 0 or none', t =>
  run(t,
    'div { border: 0; border-top: none; }',
    'div { border: 0; border-top: none; }'
  )
)

test('Not change other CSS rules or border with value of 0', t =>
  run(t,
    'div { display: flex; width: 100%; border-radius: 5px; }',
    'div { display: flex; width: 100%; border-radius: 5px; }'
  )
)

test('Change border type based on opts', t =>
  run(t,
    '.class { border-top: 1px palevioletred; }',
    '.class { border-top: 1px dashed palevioletred; }',
    { borderType: 'dashed' }
  )
)
