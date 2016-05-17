# postcss-border-shortcut [![Build Status][ci-img]][ci]

PostCSS plugin for assign default border type if not expressed

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/michelemazzucco/postcss-border-shortcut.svg
[ci]:      https://travis-ci.org/michelemazzucco/postcss-border-shortcut

```css
.your-class {
  border: 1px #E7E7E7;
}
```

```css
.your-class {
  border: 1px solid #E7E7E7;
}
```

## Usage

```js
postcss([ require('postcss-border-shortcut') ])
```

See [PostCSS] docs for examples for your environment.
