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
const environments = require('gulp-environments');
const data = require('./src/data/data.json');

// DEFINE ENVIRONMENTS

const development = environments.development;
const production = environments.production;

// FUNCTIONS

function styles() {
  return gulp
    .src(['./src/main.scss'])
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(production(csso({ restructure: false })))
    .pipe(
      development(
        csso({
          restructure: false,
          sourceMap: true,
          debug: true,
        })
      )
    )
    .pipe(gulp.dest('./build/css'));
}

function html() {
  return gulp
    .src(['src/*.njk'])
    .pipe(plumber())
    .pipe(nunjucks.compile(data.index))
    .pipe(rename({ extname: '.html' }))
    .pipe(production(minifyHTML()))
    .pipe(gulp.dest('build'));
}

function javaScript() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(plumber())
    .pipe(newer('build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(production(uglify()))
    .pipe(gulp.dest('build/js'));
}

function cleanBuild() {
  return gulp.src(['build'], { read: false, allowEmpty: true }).pipe(clean({ force: true }));
}

function serve() {
  browserSync.init({
    server: 'build',
  });
  browserSync.watch('build/*.*').on('change', browserSync.reload);
}

function assets() {
  return gulp
    .src(['src/data/assets/**'])
    .pipe(plumber())
    .pipe(newer('build/assets'))
    .pipe(imagemin())
    .pipe(gulp.dest('build/assets'));
}

function watch() {
  gulp.watch('src/styles/**/*.*', styles).on('change', browserSync.reload);
  gulp.watch('src/assets/*.*', assets).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', javaScript).on('change', browserSync.reload);
  gulp.watch('src/**/*.njk', html).on('change', browserSync.reload);
}

const build = production()
  ? gulp.series(cleanBuild, gulp.parallel(styles, html, assets, javaScript))
  : gulp.series(
      cleanBuild,
      gulp.parallel(styles, html, assets, javaScript),
      gulp.parallel(watch, serve)
    );

// TASKS

gulp.task('build', build);
gulp.task('clean', cleanBuild);
