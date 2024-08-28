var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

gulp.task('dev', function(){
  return console.log('gulp dev test !!!');
});


gulp.task('deploy', () => gulp.src('./dist/**/*').pipe(ghPages()));