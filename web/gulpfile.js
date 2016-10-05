var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var merge = require('merge-stream');
 

gulp.task('compile-less', function() {
  var style = gulp.src('assets/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('css/'));

  var responsive = gulp.src('assets/less/responsive.less')
    .pipe(less())
    .pipe(gulp.dest('css/'));

  return merge(style, responsive);
});


/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('assets/less/*.less' , ['compile-less']);
});


/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-less', 'watch-less']);  