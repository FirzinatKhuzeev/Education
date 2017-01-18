var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    del = require("del");

var source = 'src/',
    dest = 'dist/',
    bootstrapSass = {
        in: './node_modules/bootstrap-sass/'
    },
    fonts = {
        in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    },
    scripts = {
        in: [source + 'scripts/**/*.js', 'node_modules/jquery/dist/jquery.js'],
        out: dest + 'scripts/'
    },
    images = {
        in: source + 'img/*.*',
        out: dest + 'img/'
    },
    scss = {
        in: source + 'scss/main.scss',
        out: dest + 'css/',
        watch: source + 'scss/**/*',
        sassOpts: {
            outputStyle: 'nested',
            precison: 3,
            errLogToConsole: true,
            includePaths: [bootstrapSass.in + 'assets/stylesheets']
        }
    };

gulp.task('fonts', () => {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('sass', () => {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out));
});

gulp.task('scripts', () => {
    return gulp.src(scripts.in)
        .pipe(uglify())
        .pipe(gulp.dest(scripts.out));
});

gulp.task('images', () => {
    return gulp.src(images.in)
        .pipe(gulp.dest(images.out));
});

gulp.task('clean', () => {
    return del(dest);
});

gulp.task('build', ['clean', 'sass', 'fonts', 'scripts', 'images'], () => { });

gulp.task('default', ['clean', 'sass', 'fonts', 'scripts', 'images'], () => {
    gulp.watch(scss.watch, ['sass']);
});