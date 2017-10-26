var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jsonTransform = require('gulp-json-transform');
var minifyHTML = require('gulp-minify-html');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};


gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('./view/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('scripts', function() {
  gulp.src(['./js/*.js'])
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(babel({ presets: ['env'] }))
  .pipe(uglify())
  .pipe(uglify())
  .pipe(gulp.dest('./docs/js/'));
});

gulp.task('json', function() {
	gulp.src(['./js/**/*.json'])
	.pipe(jsonTransform(function(data) {
		return data;
	}))
	.pipe(gulp.dest('./docs/js/'));
});

gulp.task('scss', function() {
  return gulp.src(['./scss/**/*.scss', './scss/**/*.css'])
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers:  AUTOPREFIXER_BROWSERS,
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write("."))
  .pipe(gulp.dest('./docs/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['./js/**/*.js'], ['scripts']);
  gulp.watch(['./js/**/*.json'], ['json']);
  gulp.watch(['./scss/**/*.scss', './scss/**/*.css'], ['scss']);
  gulp.watch(['./img/**/*.jpg', './img/**/*.png', './img/**/*.gif'], ['img'])
});

gulp.task('img', function () {
  return gulp.src(['./img/**/*.jpg', './img/**/*.png', './img/**/*.gif'])
  .pipe(gulp.dest('./docs/img/'));
});

gulp.task('font', function () {
  return gulp.src(['./font/**/*'])
  .pipe(gulp.dest('./docs/font/'));
})


gulp.task('default', ['scripts', 'json', 'scss', 'img', 'font', 'watch']);
