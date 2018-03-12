var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('serve', function () {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("public/app/components/**/*.html").on('change', browserSync.reload);

  gulp.watch("public/app/components/**/*.scss", ['sass']);

  gulp.watch("public/sass/sass*.scss", ['sass']);

  gulp.watch("public/app/components/**/*.scss").on('change', browserSync.reload);

});

gulp.task('sass', function () {
  return gulp.src("public/sass/main.scss")
  //.pipe(sassPartialsImported("public/sass/abstracts/"))
    .pipe(sass({includePaths: "public/sass/mixins"}).on('error', sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('public/app/components/**/*.html')

});

gulp.task('default', ['sass', 'serve', 'html-watch']);

gulp.task('html-watch', ['html'], function (done) {
  browserSync.reload();
  done();
});
