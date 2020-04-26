// Utilities
let del = require('del');
let fs = require('fs');

// Gulp
let gulp = require('gulp');

// Gulp plugins
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglifyjs');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer');
let cssnano = require('gulp-cssnano');
let header = require('gulp-header');
let babel = require('gulp-babel');

// Misc/global vars
let pkg = JSON.parse(fs.readFileSync('package.json'));

// Task options
let opts = {
    bannerCss: [
        '@charset "UTF-8";\n',
        '/*!',
        ' * <%= name %> <%= description %>',
        ' * <%= homepage %>',
        ' * Version - <%= version %>',
        ' *',
        ' * Copyright (c) <%= new Date().getFullYear() %>',
        ' */\n\n',
    ].join('\n'),

    bannerJs: [
        '/**',
        ' * <%= name %> <%= description %>',
        ' * <%= homepage %>',
        ' * Version - <%= version %>',
        ' *',
        ' * Copyright (c) <%= new Date().getFullYear() %>',
        ' */\n\n',
    ].join('\n'),
};

gulp.task('createCSS', () => {
    return gulp.src('src/app/sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(header(opts.bannerCss, pkg))
        .pipe(gulp.dest('src/assets/css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('createJS', () => {
    return gulp.src(['src/app/js/**/*.js'])
        .pipe(header(opts.bannerJs, pkg))
        .pipe(babel())
        .pipe(gulp.dest('src/assets/js'))
        .pipe(concat('yii_yandexmaps.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/assets/js'));
});

gulp.task('watch', () => {
    gulp.watch('src/app/sass/**/*.+(scss|sass)', gulp.parallel('sass'));
});

gulp.task('clean', () => {
    return del(['src/assets/js/*', 'src/assets/css/*']);
});

gulp.task('default', gulp.parallel('clean', 'createCSS', 'createJS', 'watch'));
gulp.task('build', gulp.parallel('clean', 'createCSS', 'createJS'));