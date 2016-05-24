var gulp = require('gulp'),
    files = ['index.js', 'test/*.js', 'gulpfile.js'];

gulp.task('lint', function () {
  var eslint = require('gulp-eslint');
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', function () {
  var mocha = require('gulp-mocha');
  return gulp.src('test/*.js', { read: false })
  .pipe(mocha());
});

gulp.task('watch', function () {
  gulp.watch(files, ['test']);
});

gulp.task('default', ['test']);
