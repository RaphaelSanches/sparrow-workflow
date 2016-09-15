var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	rupture = require('rupture'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync')


// Source files
var srcPaths = {
	js: 'src/js/**/*.js',
	css: 'src/styl/**/*.styl',
	styl: 'src/styl/style.styl',
	img: 'src/img/**',
	svg: 'src/svg/**/*.svg'
};

// Builded files
var buildPaths = {
	build: 'build/**/*',
	js: 'build/js/**/*.js',
	css: 'build/css/',
	img: 'build/img/',
	svg: 'build/svg/'

};




// Tasks!
// -------------------------------------

gulp.task('stylus', function(){
	gulp.src(srcPaths.styl)
		.pipe(stylus({
			use: [rupture()]
		}))
		.pipe(gulp.dest(buildPaths.css));
});


gulp.task('img', function() {
	gulp.src(srcPaths.img)
		.pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true, cache: false}))
		.pipe(gulp.dest(buildPaths.img));
});


gulp.task('js', function() {
	gulp.src(srcPaths.js)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(buildPaths.js))
})


// deploy svg
gulp.task('svg-deploy', function(){
	gulp.src(srcPaths.svg)
		.pipe(gulp.dest(buildPaths.img))
});


// Browser sync
// -------------------------------------
gulp.task('browser-sync', function(){
	var files = buildPaths.build;

	browserSync.init(files, {
		server: {
			baseDir: './build/'
		}
	});
});




// Watch task
// -------------------------------------

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch(srcPaths.css, ['stylus']);
	gulp.watch(srcPaths.img, ['img', 'svg-deploy']);
	gulp.watch(srcPaths.js, ['js']);

});


