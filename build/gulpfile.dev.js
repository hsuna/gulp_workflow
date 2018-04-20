var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer"); // 处理css中浏览器兼容的前缀
var rename = require("gulp-rename"); //重命名
var cssnano = require("gulp-cssnano"); // css的层级压缩合并
var sass = require("gulp-sass"); //sass
var jshint = require("gulp-jshint"); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
var uglify = require("gulp-uglify"); //js压缩
var concat = require("gulp-concat"); //合并文件
var imagemin = require("gulp-imagemin"); //图片压缩
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var config = require("./gulpfile.config.js");
//======= gulp dev 开发环境下 ===============
function dev() {
  /**
   * HTML处理
   */
  gulp.task("html:dev", function() {
    return gulp
      .src(config.html.src)
      .pipe(gulp.dest(config.html.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  /**
   * assets文件夹下的所有文件处理
   */
  gulp.task("assets:dev", function() {
    return gulp
      .src(config.assets.src)
      .pipe(gulp.dest(config.assets.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  /**
   * CSS样式处理
   */
  gulp.task("css:dev", function() {
    return gulp
      .src(config.css.src)
      .pipe(gulp.dest(config.css.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  /**
   * SASS样式处理
   */
  gulp.task("sass:dev", function() {
    return gulp
      .src(config.sass.src)
      .pipe(sass())
      .pipe(gulp.dest(config.sass.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  /**
   * js处理
   */
  gulp.task("js:dev", function() {
    return gulp
      .src(config.js.src)
      .pipe(jshint(".jshintrc"))
      .pipe(jshint.reporter("default"))
      .pipe(gulp.dest(config.js.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  /**
   * 图片处理
   */
  gulp.task("images:dev", function() {
    return gulp
      .src(config.img.src)
      .pipe(
        imagemin({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        })
      )
      .pipe(gulp.dest(config.img.dist))
      .pipe(
        reload({
          stream: true
        })
      );
  });
  gulp.task(
    "dev",
    ["html:dev", "css:dev", "sass:dev", "js:dev", "assets:dev", "images:dev"],
    function() {
      browserSync.init({
        server: {
          baseDir: config.dist
        },
        notify: false
      });
      // Watch .html files
      gulp.watch(config.html.src, ["html:dev"]);
      // Watch .css files
      gulp.watch(config.css.src, ["css:dev"]);
      // Watch .scss files
      gulp.watch(config.sass.src, ["sass:dev"]);
      // Watch assets files
      gulp.watch(config.assets.src, ["assets:dev"]);
      // Watch .js files
      gulp.watch(config.js.src, ["js:dev"]);
      // Watch image files
      gulp.watch(config.img.src, ["images:dev"]);
    }
  );
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;
