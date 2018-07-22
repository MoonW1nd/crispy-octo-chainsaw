'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const postHTML = require('gulp-posthtml');
const tap = require('gulp-tap');
const minifyHTML = require('gulp-htmlnano');

gulp.task('styles', function() {
  return gulp
    .src('./src/main.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      csso({
        restructure: false,
        sourceMap: true,
        debug: true,
      })
    )
    .pipe(gulp.dest('./build/css'));
});

gulp.task('assets', function() {
  return gulp
    .src(['src/assets/**'])
    .pipe(plumber())
    .pipe(newer('build/assets'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets'));
});

gulp.task('html', function() {
  let path = 'src';

  const options = {};
  const plugins = [require('posthtml-include')({ root: `${path}` })];

  return gulp
    .src(['src/*.html'])
    .pipe(plumber())
    .pipe(tap(file => (path = file.path)))
    .pipe(postHTML(plugins, options))
    .pipe(minifyHTML())
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(plumber())
    .pipe(newer('build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('clean', function() {
  return gulp.src('build', { read: false }).pipe(clean({ force: true }));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'build',
  });
  browserSync.watch('build/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.*', ['styles']).on('change', browserSync.reload);
  gulp.watch('src/assets/*.*', ['assets']).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'html', 'assets', 'js', 'watch', 'serve']);
