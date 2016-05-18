# postcss-border-shortcut [![Build Status][ci-img]][ci]

PostCSS plugin for assign default border type if not expressed.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/michelemazzucco/postcss-border-shortcut.svg
[ci]:      https://travis-ci.org/michelemazzucco/postcss-border-shortcut

```css
/* Before */

.one {
  border: 1px #E7E7E7;
}

.two {
  border-top: 1px #707C80;
}

/* After */

.one {
  border: 1px solid #E7E7E7;
}

.two {
  border-top: 1px solid #707C80;
}
```
