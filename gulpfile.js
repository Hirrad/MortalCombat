'use strict'
const {src, dest, parallel, watch, task} = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    htmlValidator = require('gulp-w3c-html-validator'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    newer = require('gulp-newer'),
    babel = require('gulp-babel');

sass.compiler = require('node-sass');

const taskFile = {
    sassToCss: () => {
        return src('./src/scss/*.scss')
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(sourcemaps.write())
            .pipe(dest('./dist/css'))
            .pipe(browserSync.stream());
    },
    sync: () => {
        return browserSync.init({
            server: "./dist/"
        })
    },
    validatorHtml: () => {
        return src('./src/*.html')
            .pipe(htmlValidator())
            .pipe(htmlValidator.reporter())
            .pipe(dest('./dist/'))
            .pipe(browserSync.stream());

    },
    imgMin: () => {
        return src('./src/img/*')
            .pipe(newer('./dist/img'))
            .pipe(imagemin())
            .pipe(dest('./dist/img'))
            .pipe(browserSync.stream());
    },
    babelJs: () => {
        return src('./src/js/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(browserSync.stream());

    }
}
const watchChange = () => {
    watch('./src/scss/**/*.scss', taskFile.sassToCss);
    watch('./src/*.html', taskFile.validatorHtml);
    watch('./src/img/*', taskFile.imgMin);
    watch('./src/js/**/*.js', taskFile.babelJs);
}

task('default', parallel(taskFile.sync, watchChange));

