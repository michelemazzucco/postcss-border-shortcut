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

### Gulp
```js
var gulp = require('gulp')
    , postcss = require('gulp-postcss')
    , border = require('postcss-border-shortcut');

gulp.task('css', function () {
  var processors = [
    border
  ];

  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});
```

### JS API
```js
var postcss = require('postcss');
postcss([ require('postcss-border-shortcut') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for other examples.

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
