/**
 * Available Tasks
 * ===============
 * gulp serve - Starts the server and executes necessary tasks.
 * gulp inject:js - Injects javascript into the main html file.
 * gulp sass - Compiles sass into one file.
 * gulp watch - Watches files for changes and executes necessary tasks.
 * gulp start - Starts the server using nodemon and watches server files for changes. Restarts server when needed.
 */
var gulp = require('gulp'), // https://github.com/gulpjs/gulp
    inject = require('gulp-inject'), // https://github.com/klei/gulp-inject
    angularFilesort = require('gulp-angular-filesort'), // https://github.com/klei/gulp-angular-filesort
    sass = require('gulp-sass'), // https://github.com/dlmanning/gulp-sass
    cssGlobbing = require('gulp-css-globbing'), // https://github.com/jsahlen/gulp-css-globbing
    nodemon = require('gulp-nodemon'), // https://github.com/JacksonGariety/gulp-nodemon
    plumber = require('gulp-plumber'), // https://github.com/floatdrop/gulp-plumber
    notify = require('gulp-notify'), // https://github.com/mikaelbr/gulp-notify
    autoprefixer = require('gulp-autoprefixer'), // https://github.com/sindresorhus/gulp-autoprefixer
    minifycss = require('gulp-minify-css'), // https://github.com/jonathanepollack/gulp-minify-css
    rename = require('gulp-rename'), // https://github.com/hparra/gulp-rename
    uglify = require('gulp-uglify'), // https://github.com/terinjokes/gulp-uglify
    concat = require('gulp-concat'), // https://github.com/wearefractal/gulp-concat
    del = require('del'), // https://github.com/sindresorhus/del
    copy = require('gulp-copy'); // https://github.com/klaascuvelier/gulp-copy

var env = require('./server/config/environment/local.env');
console.log(env);

// Executes on error
var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>"
    })(err);
};

var assets = {
    js: ['client/*.js', 'client/**/*.js'],
    scss: ['client/*.scss', 'client/**/*.scss'],
    static: ['*.html', '**/*.html', 'favicon.ico']
};

// Inject javascript and css files for development into index.html
gulp.task('inject', function() {
    gulp.src('client/index.html')
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(inject(gulp.src(assets.js), {
        ignorePath: 'client'
    }))
    .pipe(inject(gulp.src('client/*.css'), {
        ignorePath: 'client'
    }))
    .pipe(gulp.dest('./client'));
});

// Compile SASS into a single file
gulp.task('sass', function() {
    gulp.src('app.scss', { cwd: 'client' })
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(cssGlobbing({ extensions: ['.scss'] }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./client'));
});

gulp.task('watch', function() {
    gulp.watch(assets.scss, ['sass']);
    gulp.watch(assets.js, ['inject']);
});

gulp.task('minifycss', ['sass'], function() {
    gulp.src('client/app.css')
    .pipe(rename({ suffix: '-' + Date.now() + '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/'));
});

gulp.task('uglifyjs', function() {
    gulp.src(assets.js)
    .pipe(concat('app-' + Date.now() + '.js'))
    /*.pipe(uglify({
        mangle: false
    }))*/
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function() {
    del('build/*', function(err) {
        if (!err) {
            console.log('Build cleaned!');
        }
    });
});

gulp.task('start', ['inject'], function() {
    nodemon({
        script: 'server/server.js',
        watch: 'server',
        ext: 'js',
        env: env
    })
    .on('crash', function() {
        gulp.src('gulpfile.js')
        .pipe(notify({
            title: 'Server Crashed',
            message: 'Waiting for changes...'
        }));
    });
});

gulp.task('inject:build', ['start:build'], function() {
    gulp.src('build/index.html')
    .pipe(inject(gulp.src('build/*.js'), {
        ignorePath: 'build'
    }))
    .pipe(inject(gulp.src('build/*.css'), {
        ignorePath: 'build'
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('injectcss:build', function() {
    gulp.src('build/index.html');
});

gulp.task('build:static', function() {
    gulp.src(assets.static, { cwd: 'client' })
    .pipe(copy('build/'));
});

gulp.task('start:build', function() {
    nodemon({
        script: 'server/server.js',
        ignore: './',
        env: { 'NODE_ENV': 'production' }
    });
});

// Start server via nodemon
gulp.task('serve', ['start', 'watch']);

// Build files and serve in production mode
gulp.task('prep:build', ['minifycss', 'uglifyjs', 'build:static']);
gulp.task('serve:build', ['inject:build', 'start:build']);
