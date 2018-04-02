var config = {
    distRoot: 'dist',

    server: {
        port: 8000,
        root: './dist',
        livereload: true
    },

    copy: {
        index: {
            src: './src/index.html',
            dest: './dist'
        },

        img: {
            src: './src/assets/img/*',
            dest: './dist/assets/img'
        }
    },

    watch: {
        html: ['./src/index.html', './src/templates/*.html'],
        scss: './src/scss/**/*.scss'
    },

    sass: {
        src: './src/scss/main.scss',
        dest: './dist/assets/css',
        style: 'compressed'
    },

    html: {
        src: ['./src/index.html', './src/templates/*.html'],
        dest: './dist',
        basePath: './src/templates/'
    }
};

module.exports = config;
