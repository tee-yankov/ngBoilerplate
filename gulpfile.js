var gulp = require('gulp'), // https://github.com/gulpjs/gulp
    inject = require('gulp-inject'), // https://github.com/klei/gulp-inject
    angularFilesort = require('gulp-angular-filesort'); // https://github.com/klei/gulp-angular-filesort


var assets = {
    js: ['./client/**/*.js', './client/*.js'],
    scss: ['./client/**/*.scss'],
    html: ['./client/**/*.html', 'client/*.html']
};

// Inject javascript files for development into index.html
gulp.task('inject:js', function() {
    var target = gulp.src('client/index.html'),
        sources = gulp.src(assets.js).pipe(angularFilesort());

    return target.pipe(inject(sources, {
        ignorePath: 'client'
    }))
    .pipe(gulp.dest('./client'));
});

// Start the server and run startup taska
gulp.task('server', ['inject:js']);
