var gulp = require('gulp'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'); // https://github.com/klei/gulp-angular-filesort


var assets = {
    js: ['./client/**/*.js'],
    scss: ['./client/**/*.scss'],
    html: ['./client/**/*.html', 'client/*.html']
};

gulp.task('inject:js', function() {
    var target = gulp.src('public/index.html'),
        sources = gulp.src(assets.js);

    return target.pipe(inject(sources))
    .pipe(gulp.dest('./client'));
});
