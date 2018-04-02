const config = require('./gulpconfig');
const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const htmlPartial = require('gulp-html-partial');

// Development serve task.
const serve = () => connect.server(config.server);

// HTML partials task
const html = () => {
    const htmlConfig = config.html;

    return gulp.src(htmlConfig.src)
        .pipe(htmlPartial({
            basePath: htmlConfig.basePath
        }))
        .pipe(gulp.dest(htmlConfig.dest))
        .pipe(connect.reload());
};

// SASS task
const sassTask = () => {
    const sassConfig = config.sass;

    return gulp.src(sassConfig.src)
        .pipe(sass({
            outputStyle: sassConfig.style
        }).on('error', sass.logError))
        .pipe(gulp.dest(sassConfig.dest))
        .pipe(connect.reload());
};

// Copy the files to distribution folder.
const copy = () => {
    const copyConfig = config.copy;

    return gulp.src(copyConfig.img.src)
        .pipe(gulp.dest(copyConfig.img.dest));
};

const watch = () => {
    const watchConfig = config.watch;

    gulp.watch(watchConfig.html, ['html']);
    gulp.watch(watchConfig.scss, ['sass']);
};

// Build the project
const build = () => del([config.distRoot]).then(() => {
    runSequence(
        'copy',
        'sass',
        'html'
    );
});

// Gulp default task
const defaultTask = () => runSequence(
    'build',
    'serve',
    'watch'
);

gulp.task('serve', serve);
gulp.task('copy', copy);
gulp.task('watch', watch);
gulp.task('sass', sassTask);
gulp.task('html', html);

gulp.task('build', build);
gulp.task('default', defaultTask);
