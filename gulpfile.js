/**
 * @author moyumin
 */
let gulp = require('gulp');
let livereload = require('gulp-livereload');
let sass = require('gulp-sass');
let babel = require('gulp-babel');
let shelljs = require('shelljs')
let uglify = require('gulp-uglify');
let clean = require('gulp-clean');
let named = require('vinyl-named');
let webpackConfig = require('./gulp-config/webpack.dev.conf.js')
let compiler = require('webpack')
let webpackStraem = require('webpack-stream')
let rootDir = '../..';

// 编译项目下的html
gulp.task('html', () => {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
})
// 编译项目下的images
gulp.task('images', () => {
  gulp.src('src/**/images/*.*')
    .pipe(gulp.dest('dist'));
})
// 编译项目下的scss
gulp.task('sass', () => {
  gulp.src('src/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'           // 配置输出方式,默认为nested
    }))
    .pipe(gulp.dest('dist'));
})

// 编译项目下的javascript
gulp.task('script', () => {
  let distPath=''
  gulp.src('src/**/index.js')
    .pipe(named(function(file) {
      let curPath = file.path
      curPath = curPath.substr(0,curPath.lastIndexOf("\\"))
      distPath = curPath.replace('src', 'dist')
      return 'index'
    }))
    .pipe(webpackStraem(webpackConfig, compiler, function(err, stats) {
      /* Use stats to do more things if needed */
    }))
    .pipe(gulp.dest(function() {
      return distPath
    }))
})
// 清理
gulp.task('clean', function() {
  return gulp.src('dist/*.*', {read: false})
    .pipe(clean());
});
gulp.task('default', ['clean'],function () {
  gulp.start('html','images','sass', 'script');
  shelljs.exec('gulp watch')
});

gulp.task('watch', function() {
  livereload.listen();
  // 看守所有.scss档
  gulp.watch('src/**/*.scss', ['sass']);

  // 看守所有.js档
  gulp.watch('src/**/index.js', ['script']);

  // 看守所有图片档
  gulp.watch('src/**/images/*.*', ['images']);

  //看守html
  gulp.watch('src/**/*.html', ['html']) ;


  gulp.watch(['dist/**']).on('change', (event) => {
    livereload.changed(event.path)
  });
});