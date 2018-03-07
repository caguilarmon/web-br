var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var del = require('del');


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

gulp.task('html', function() {

    gulp.src('*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    
	gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch(['*.html'], ['html']);
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


