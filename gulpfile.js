"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const newer = require("gulp-newer");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");

gulp.task("styles", function() {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(
      csso({
        restructure: false,
        sourceMap: true,
        debug: true
      })
    )
    .pipe(gulp.dest("./build/css"));
});

gulp.task("assets", function() {
  return gulp
    .src(["src/assets/**"])
    .pipe(newer("build/assets"))
    .pipe(imagemin())
    .pipe(gulp.dest("build/assets"));
});

gulp.task("html", function() {
  return gulp
    .src(["src/*.html"])
    .pipe(newer("build"))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function() {
  return gulp
    .src(["src/js/*.js"])
    .pipe(newer("build/js"))
    .pipe(gulp.dest("build/js"));
});

gulp.task("serve", function() {
  browserSync.init({
    server: "build"
  });
  browserSync.watch("build/*.*").on("change", browserSync.reload);
});

gulp.task("watch", function() {
  gulp.watch("src/styles/**/*.*", ["styles"]).on("change", browserSync.reload);
  gulp.watch("src/assets/*.*", ["assets"]).on("change", browserSync.reload);
  gulp.watch("src/js/*.js", ["js"]).on("change", browserSync.reload);
  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload);
});

gulp.task("build", ["styles", "html", "assets", "js", "watch", "serve"]);
