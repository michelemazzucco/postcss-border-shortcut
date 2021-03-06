# postcss-border-shortcut [![Build Status][ci-img]][ci] [![NPM Version][npm-img]][npm] [![Dependency Status][david-dm-img]][david-dm]

PostCSS plugin for assign default border type if not expressed.

```css
/* Before */

.one {
  border: 1px #E7E7E7;
}

.two {
  border-top: 1px #707C80;
}

.three {
  border-bottom: #423424;
}

/* After */

.one {
  border: 1px solid #E7E7E7;
}

.two {
  border-top: 1px solid #707C80;
}

.three {
  border-bottom: 1px solid #423424;
}
```

## Installation
```
$ npm install postcss-border-shortcut --save-dev
```

## Usage

### JS API
```js
const postcss = require('postcss');
postcss([ require('postcss-border-shortcut') ])
```

See [PostCSS] docs for other examples.

## Options
### borderType
Type: `string` Default: `solid`

You can define a default `border`style property, like: `solid`, `dashed`, `dotted`,  `double`, ect...

```js
// Set in build tool, etc.
.border({
  borderType: 'dashed'
})
```

[PostCSS]:      https://github.com/postcss/postcss
[ci-img]:       https://travis-ci.org/michelemazzucco/postcss-border-shortcut.svg
[ci]:           https://travis-ci.org/michelemazzucco/postcss-border-shortcut
[npm]:          https://www.npmjs.com/package/postcss-border-shortcut
[npm-img]:      https://img.shields.io/npm/v/postcss-border-shortcut.svg
[david-dm]:     https://david-dm.org/michelemazzucco/postcss-border-shortcut
[david-dm-img]: https://david-dm.org/michelemazzucco/postcss-border-shortcut.svg
