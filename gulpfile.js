var gulp = require('gulp');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify   = require('babelify');

gulp.task('build', function() {
  return browserify('./src/scripts/index.js', {
          debug: true
        })
        .transform(babelify)
        .bundle()
        .on('error', function(err){
          console.error(err.message);
          this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/scripts/**/*.js'], function () {
    gulp.start('build');
  });
});
