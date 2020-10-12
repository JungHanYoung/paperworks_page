const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');

gulp.task("sass", function() {
    return gulp.src("scss/styles.scss")
    .pipe(postcss([
        require('tailwindcss'),
        require('autoprefixer')
    ]))
    .pipe(sass({indentWidth: 2, outputStyle: "compact"}))
    .pipe(gulp.dest("public/stylesheets"));
});

gulp.task("sass:watch", function() {
    return gulp.watch("scss/*.scss", gulp.series(['sass']))
});