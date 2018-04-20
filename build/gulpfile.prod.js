var gulp = require("gulp");
var babel = require("gulp-babel");
var autoprefixer = require("gulp-autoprefixer"); // 处理css中浏览器兼容的前缀
var rename = require("gulp-rename"); //重命名
var cssnano = require("gulp-cssnano"); // css的层级压缩合并
var sass = require("gulp-sass"); //sass
var jshint = require("gulp-jshint"); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var uglify = require("gulp-uglify"); //js压缩
var concat = require("gulp-concat"); //合并文件
var imagemin = require("gulp-imagemin"); //图片压缩
var config = require("./gulpfile.config.js");

/**
 * HTML处理
 */
gulp.task("html", function() {
  return gulp.src(config.html.src).pipe(gulp.dest(config.html.dist));
});

/**
 * assets文件夹下的所有文件处理
 */
gulp.task("assets", function() {
  return gulp.src(config.assets.src).pipe(gulp.dest(config.assets.dist));
});

/**
 * CSS样式处理
 */
gulp.task("css", function() {
  return gulp
    .src(config.css.src)
    .pipe(autoprefixer("last 2 version"))
    .pipe(gulp.dest(config.css.dist))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(cssnano()) //执行压缩
    .pipe(gulp.dest(config.css.dist));
});

/**
 * SASS样式处理
 */
gulp.task("sass", function() {
  return gulp
    .src(config.sass.src)
    .pipe(autoprefixer("last 2 version"))
    .pipe(sass())
    .pipe(gulp.dest(config.sass.dist))
    .pipe(
      rename({
        suffix: ".min"
      })
    ) //rename压缩后的文件名
    .pipe(cssnano()) //执行压缩
    .pipe(gulp.dest(config.sass.dist));
});

/**
 * js处理
 */
gulp.task("js", function() {
  return gulp
    .src(config.js.src)
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    .pipe(babel()) 
    .pipe(gulp.dest(config.js.dist))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dist));
});

/**
 * 合并所有js文件并做压缩处理
 */
gulp.task("js-concat", function() {
  return gulp
    .src(config.js.src)
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter("default"))
    .pipe(babel()) 
    .pipe(concat(config.js.build_name))
    .pipe(gulp.dest(config.js.dist))
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dist));
});

/**
 * 图片处理
 */
gulp.task("images", function() {
  return gulp
    .src(config.img.src)
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(config.img.dist));
});

gulp.task("build", ["html", "css", "sass", "js", "assets", "images"]);

export default gulp;
