var gulp = require('gulp'), // https://github.com/gulpjs/gulp
    inject = require('gulp-inject'), // https://github.com/klei/gulp-inject
    angularFilesort = require('gulp-angular-filesort'), // https://github.com/klei/gulp-angular-filesort
    sass = require('gulp-sass'), // https://github.com/dlmanning/gulp-sass
    cssGlobbing = require('gulp-css-globbing'), // https://github.com/jsahlen/gulp-css-globbing
    nodemon = require('gulp-nodemon'), // https://github.com/JacksonGariety/gulp-nodemon
    watch = require('gulp-watch'), // https://github.com/floatdrop/gulp-watch
    batch = require('gulp-batch'), // https://github.com/floatdrop/gulp-batch
    plumber = require('gulp-plumber'), // https://github.com/floatdrop/gulp-plumber
    notify = require('gulp-notify'), // https://github.com/mikaelbr/gulp-notify
    autoprefixer = require('gulp-autoprefixer'); // https://github.com/sindresorhus/gulp-autoprefixer

var assets = {
    js: ['client/**/*.js', 'client/*.js'],
    scss: ['client/**/*.scss', 'client/*.scss'],
    html: ['client/**/*.html', 'client/*.html']
};

// Inject javascript files for development into index.html
gulp.task('inject:js', function() {
    var target = gulp.src('client/index.html'),
        sources = gulp.src(assets.js).pipe(angularFilesort());

    return target.pipe(inject(sources, {
        ignorePath: 'client'
    }))
    .pipe(gulp.dest('./client'))
    .pipe(notify('javascript injected'));
});

// Compile SASS into a single file
gulp.task('sass', function() {
    gulp.src('app.scss', { cwd: 'client' })
    .pipe(plumber())
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
    });
});

// Start server via nodemon
gulp.task('serve', ['start', 'watch']);
