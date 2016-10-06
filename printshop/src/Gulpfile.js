'use strict';
var bases = {
	app: 'app/',
	dist: '../dist/',
};
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    tinylr = require('tiny-lr'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
	filter = require('gulp-filter'),
	ngAnnotate  = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename');

// Modules for webserver and livereload
var express = require('express'),
	refresh = require('gulp-livereload'),
	livereload = require('connect-livereload'),
	livereloadport = 35729,
	serverport = 8000;

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./../dist'));

// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
	res.sendfile('index.html', { root: '../dist' });
});

//***************************** CSS task****************************************
gulp.task('css', function() {
	
  //move all css to dist
  gulp.src('app/css/**/*.css')
	  .pipe(gulp.dest('../dist/css/'));
	
	
  //compile bootstrap less into css 
  gulp.src('app/css/bootstrap.less')
	  // The onerror handler prevents Gulp from crashing when you make a mistake in your LESS
	  .pipe(less({onError: function(e) { console.log(e); } }))
	  // Optionally add autoprefixer
	  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
	  // These last two should look familiar now :)
	  .pipe(minifyCSS())
	  .pipe(gulp.dest('../dist/css/'));  
  
  //compile theme less into css
  gulp.src('app/css/theme.less')
	  // The onerror handler prevents Gulp from crashing when you make a mistake in your LESS
	  .pipe(less({onError: function(e) { console.log(e); } }))
	  // Optionally add autoprefixer
	  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
	  // These last two should look familiar now :)
	  .pipe(minifyCSS())
	  .pipe(gulp.dest('../dist/css/'));
});

//***************************** Views task****************************************
gulp.task('views', function() {
  // Get our index.html And put it in the dist folder
  gulp.src('app/index.html')
     .pipe(gulp.dest('../dist/'));
  
  //get partial view and put it in dist
  gulp.src('app/views/**/*')
		.pipe(templateCache('templatescache.js', { module:'templatescache', standalone:true, root: './' }))
		.pipe(gulp.dest('../dist/'))
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('../dist/'));
		
	// get all css images in src And put it in the dist folder
  gulp.src('app/css/images/**/*')
	  .pipe(gulp.dest('../dist/css/images/'));

});

//***************************** RUN DEV task****************************************
// Dev task
gulp.task('dev', ['css', 'views'], function() { });


//***************************** WATCH task****************************************
//watch task is to automatically run compilation is anything changing is src 
gulp.task('watch', [], function() {
	
	// Start webserver
	gutil.log('Start webserver', serverport);
	server.listen(serverport, function() {
		gutil.log('Listening on', serverport);
    });
	gutil.log('Start live reload', livereloadport);
	// Start live reload
	refresh.listen(livereloadport);

	// Watch our less files
	gulp.watch(['app/css/**/*.less'], [
		'css'
	]);
	gulp.watch(['app/css/**/*.css'], [
		'css'
	]);

	gulp.watch(['app/**/*.html'], [
		'views'
	]);

	gulp.watch('../dist/**/*.html').on('change', refresh.changed);
	gulp.watch('../dist/**/*.css').on('change', refresh.changed);

});

//***************************** FINALLY! RUN GULP task ****************************************
gulp.task('default', ['dev', 'watch']);

