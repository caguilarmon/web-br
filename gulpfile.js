var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var del = require('del');
// NEW
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


gulp.task('server', function() {
    connect.server({
        port: 3000,
        root: './dist/',
        livereload: true
    });
});

gulp.task('sass', function() {
	
	var outputStyle = argv.prod ? 'compressed' : '';

	return gulp.src('./scss/main.scss')
		.pipe(sass({
			outputStyle: outputStyle
		}).on('error', sass.logError))
		.pipe(gulp.dest('./dist/style'))
		.pipe(connect.reload());
});

gulp.task('watch', function() {
    
    // NEW -  Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

	gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on("change", reload); // NEW
});

gulp.task('copy', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));

	gulp.src('./assets/img/**/*')
	.pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('build', function() {
    runSequence(
        'copy',
        'sass'
    );
});

gulp.task('default', function() {
    del(['./dist']).then(function() {
        runSequence(
            'build',
            'server',
            'watch'
        );
    });
});


gulp.task('args', function() {
	console.log(argv.prod);
});


