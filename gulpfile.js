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
let jshint = require('gulp-jshint');

// Misc/global vars
let pkg = JSON.parse(fs.readFileSync('package.json'));

// Task options
let opts = {
    srcDir: 'src/node_app/',
    dstDir: 'src/assets/',

    bannerCss: [
        '@charset "UTF-8";\n',
        '/**',
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
    return gulp.src(opts.srcDir + 'sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(header(opts.bannerCss, pkg))
        .pipe(gulp.dest(opts.dstDir + 'css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(opts.dstDir + 'css'));
});

gulp.task('lint', () => {
    return gulp.src([opts.srcDir + 'js/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('createJS', () => {
    return gulp.src([opts.srcDir + 'js/**/*.js'])
        .pipe(header(opts.bannerJs, pkg))
        .pipe(babel())
        .pipe(gulp.dest(opts.dstDir + 'js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(opts.dstDir + 'js'));
});

gulp.task('watch', () => {
    gulp.watch([
            opts.srcDir + 'sass/**/*.+(scss|sass)',
            opts.srcDir + 'js/**/*.js'
        ],
        gulp.parallel(['createCSS', 'lint', 'createJS']));
});

gulp.task('clean', () => {
    return del([
        opts.dstDir + 'js/*',
        opts.dstDir + 'css/*'
    ]);
});

gulp.task('default', gulp.parallel('clean', 'createCSS', 'lint', 'createJS', 'watch'));
gulp.task('build', gulp.parallel('clean', 'lint', 'createCSS', 'createJS'));