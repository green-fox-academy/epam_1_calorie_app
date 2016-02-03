'use strict';

var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var jasmine = require('gulp-jasmine');

gulp.task('default', function() {
  console.log('Watching for file changes...');
  watch('./public/js/*.js', batch(function (events, done) {
      gulp.start('lint', done);
      gulp.start('test', done);
  }));
});

gulp.task('lint', function() {
  return gulp.src('./public/js/*.js')
    .pipe(jshint())
  	.pipe(jshint.reporter(stylish))
  	.pipe(jshint.reporter('fail'));
});


gulp.task('test', function () {
	return gulp.src('spec/*.js')
		.pipe(jasmine());
});
