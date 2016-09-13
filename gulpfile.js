var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync')


// Source files
var srcPaths = {
	js: 'src/js/**/*.js',
	css: 'src/styl/**/*.styl',
	styl: 'src/styl/style.styl',
	img: 'src/img/**'
};

// Builded files
var buildPaths = {
	build: 'build/**/*',
	js: 'build/js/**/*.js',
	css: 'build/css/',
	img: 'build/img/'
};




// Tasks!
// -------------------------------------

gulp.task('stylus', function(){
	gulp.src(srcPaths.styl)
		.pipe(stylus())
		.pipe(gulp.dest(buildPaths.css));
});


gulp.task('img', function() {
	gulp.src(srcPaths.img)
		.pipe(imagemin({optimizationLevel: 5, progressive: true, interlaced: true, cache: false}))
		.pipe(gulp.dest(buildPaths.img));
});





// Watch task
// -------------------------------------

gulp.task('watch', function(){
	gulp.watch(srcPaths.css, ['stylus']);
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


