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
const minifyHTML = require('gulp-htmlnano');
const nunjucks = require('gulp-nunjucks');
const data = require('./src/data/data.json');

function styles() {
  return gulp
    .src(['./src/main.scss'])
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
}

function assets() {
  return gulp
    .src(['src/data/assets/**'])
    .pipe(plumber())
    .pipe(newer('build/assets'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets'));
}

function html() {
  return gulp
    .src(['src/*.njk'])
    .pipe(plumber())
    .pipe(nunjucks.compile(data.index))
    .pipe(rename({ extname: '.html' }))
    .pipe(minifyHTML())
    .pipe(gulp.dest('build'));
}

function js() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(plumber())
    .pipe(newer('build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
}

function cleanBuild() {
  return gulp.src('build', { read: false, allowEmpty: true }).pipe(clean({ force: true }));
}

function serve() {
  browserSync.init({
    server: 'build',
  });
  browserSync.watch('build/*.*').on('change', browserSync.reload);
}

function watch() {
  gulp.watch('src/styles/**/*.*', styles).on('change', browserSync.reload);
  gulp.watch('src/assets/*.*', assets).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', js).on('change', browserSync.reload);
  gulp.watch('src/**/*.njk', html).on('change', browserSync.reload);
}

const build = gulp.series(cleanBuild, gulp.parallel(styles, html, assets, js, watch, serve));

gulp.task('build', build);
