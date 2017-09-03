'use strict';

// --- require ---
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
// --- require ---

// --- dirs ---
const baseDir = "./dist";
const cssDir = "./dist/css";
const sassDir = "./src/sass";
// --- dirs ---

// --- files ---
const scssFile = "master.scss";
// --- files ---

// --- tasks ---
gulp.task('sass', function () {
    return gulp.src(sassDir+'/'+scssFile)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(cssDir));
});

gulp.task('sass:watch', function () {
    gulp.watch(sassDir + '/**/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: baseDir
        }
    });
});
// --- tasks ---

// --- watch task ---
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: baseDir
        }
    });
    gulp.watch(sassDir + '/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch(baseDir + "/*.html").on('change', browserSync.reload);
});
// --- watch task ---
