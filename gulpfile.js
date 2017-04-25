// SPARROW WORKFLOW
// a simple workflow
// by Raphael Sanches
// -------------------------------------


// Initializing
var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	rupture = require('rupture'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-autoprefixer'),
	csslint = require('gulp-csslint'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin');
	



// Source files
var srcPaths = {
	jsVendor: 'src/js/vendor/*',
	js: 'src/js/main.js',
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

gulp.task('css', function(){
	gulp.src(srcPaths.styl)
		.pipe(stylus({
			use: [rupture()]
		}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(csslint())
		.pipe(cssnano())
		.pipe(gulp.dest(buildPaths.css));
});


gulp.task('img', function() {
	gulp.src(srcPaths.img)
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true,
			verbose: false,
			cache: false
		}))
		.pipe(gulp.dest(buildPaths.img));
});


gulp.task('js', function() {
	gulp.src([srcPaths.jsVendor, srcPaths.js])
		.pipe(jshint())
        .pipe(jshint.reporter('default'))
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
			baseDir: './'
		}
	});
});




// Watch task
// -------------------------------------

gulp.task('watch', ['browser-sync'], function(){
	gulp.watch(srcPaths.css, ['css']);
	gulp.watch(srcPaths.img, ['img', 'svg-deploy']);
	gulp.watch(srcPaths.js, ['js']);

});

gulp.task('build', function(){
	gulp.start(
		'css',
		'js',
		'img',
		'svg-deploy'
	);
});
