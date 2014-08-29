var gulp = require('gulp');

var csso = require('gulp-csso');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var deploy = require('gulp-gh-pages');
var lr = require('gulp-livereload');
var nib = require('nib');
var autoprefixer = require('autoprefixer-stylus');

gulp.task('deploy', function(){
  return gulp.src('demo/**/*')
    .pipe(deploy());
});

gulp.task('build', function(){
  return gulp.src('src/index.styl')
    .pipe(stylus({
      paths: [__dirname+'/src'],
      use: [
        nib(),
        autoprefixer()
      ]
    }))

    // non-minified
    .pipe(rename('vaporwave.css'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo'))
    .pipe(lr())

    // minified
    .pipe(rename('vaporwave.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', function(){
  gulp.watch('src/**/*.styl', ['build']);
});

gulp.task('default', ['build', 'watch']);