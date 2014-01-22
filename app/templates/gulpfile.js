var gulp = require('gulp');
var compass = require('gulp-compass');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var embedlr = require('gulp-embedlr');

gulp.task('styles', function () {
  gulp.src(['app/sass/*.scss'])
    .pipe(compass({
      config_file: 'app/config.rb',
      css: 'dist'
    }))
    // .pipe(gulp.dest('app/assets/temp'));
    .pipe(refresh(server))
});

gulp.task('lr-server', function () {
  server.listen(35729, function (err) {
  if (err)
    return console.log(err);
  });
});

gulp.task('html', function () {
  gulp.src("app/*.html")
    .pipe(embedlr())
    .pipe(gulp.dest('dist/'))
    .pipe(refresh(server));
});

gulp.task('default', function () {
  gulp.run('lr-server', 'styles', 'html');
  gulp.watch('dist/**/*.css', function (event) {
    gulp.run('styles');
  });
  gulp.watch('app/**/*.html', function (event) {
    gulp.run('html');
  });
});
