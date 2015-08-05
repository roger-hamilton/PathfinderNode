var gulp = require('gulp');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var util = require('util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var babelify = require('babelify');
var _ = require('lodash');

gulp.task('browserify', function() {
    bundle(false);
});

gulp.task('browserify-watch', function() {
    bundle(true);
});

function bundle(watch) {
    var bro;

    if (watch) {
        bro = watchify(browserify('./src/app.js',
            // Assigning debug to have sourcemaps
            _.assign(watchify.args, {
                debug: true
            })));
        bro.on('update', function() {
            rebundle(bro);
        });
    } else {
        bro = browserify('./src/app.js', {
            debug: true
        });
    }

    bro.transform(babelify.configure({
        compact: false
    }));

    function rebundle(bundler) {
        return bundler.bundle()
            .on('error', function(e) {
                util.log('Browserify Error', e);
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            })) // loads map from browserify file
            .pipe(sourcemaps.write()) // writes .map file
            .pipe(gulp.dest('dist'))
            .pipe(gulpif(watch,
                browserSync.reload({
                    stream: true,
                    once: true
            })));
    }

    return rebundle(bro);
}
