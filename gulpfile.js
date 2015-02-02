var gulp = require('gulp'), // https://github.com/gulpjs/gulp
    inject = require('gulp-inject'), // https://github.com/klei/gulp-inject
    angularFilesort = require('gulp-angular-filesort'), // https://github.com/klei/gulp-angular-filesort
    sass = require('gulp-sass'), // https://github.com/dlmanning/gulp-sass
    cssGlobbing = require('gulp-css-globbing'), // https://github.com/jsahlen/gulp-css-globbing
    nodemon = require('gulp-nodemon'), // https://github.com/JacksonGariety/gulp-nodemon
    plumber = require('gulp-plumber'), // https://github.com/floatdrop/gulp-plumber
    notify = require('gulp-notify'), // https://github.com/mikaelbr/gulp-notify
    autoprefixer = require('gulp-autoprefixer'); // https://github.com/sindresorhus/gulp-autoprefixer

var assets = {
    js: ['client/*.js', 'client/**/*.js'],
    scss: ['client/*.scss', 'client/**/*.scss'],
    html: ['client/*.html', 'client/**/*.html']
};

// Inject javascript files for development into index.html
gulp.task('inject:js', function() {
    var target = gulp.src('client/index.html'),
        sources = gulp.src(assets.js).pipe(angularFilesort());

    return target.pipe(inject(sources, {
        ignorePath: 'client'
    }))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest('./client'))
    .pipe(notify('javascript injected'));
});

// Compile SASS into a single file
gulp.task('sass', function() {
    gulp.src('app.scss', { cwd: 'client' })
    .pipe(plumber({ errorHandler: onError }))
    .pipe(cssGlobbing({ extensions: ['.scss'] }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./client'))
    .pipe(notify('sass compiled'));
});

gulp.task('watch', function() {
    gulp.watch(assets.scss, ['sass']);
    gulp.watch(assets.js, ['inject:js']);
});

gulp.task('start', ['sass', 'inject:js'], function() {
    nodemon({
        script: 'server/server.js',
        watch: 'server',
        ext: 'js'
    })
    .on('restart', notify.onError({
        title: 'Server Restart'
    }));
});

// Start server via nodemon
gulp.task('serve', ['start', 'watch']);

function onError(err) {
    notify.onError({
        title: 'Error',
        message: err
    });
}
