import gulp from  'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import ghPages from 'gulp-gh-pages';
import minifyCss from 'gulp-minify-css';
import BrowserSync from 'browser-sync';
import replace from 'gulp-replace';
import runSeq from 'run-sequence';
import jspm from 'jspm';

var browserSync = BrowserSync.create();

var sassInput = './app/**/*.scss';
var sassOutput = './';
var dist = './dist';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp
        .src(sassInput)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(sassOutput));
});
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
gulp.task('jspm-bundle', function(done) {
    jspm.setPackagePath('.');
    jspm.bundleSFX('app/main', dist+'/main.js', {
        sourceMaps: true,
        minify : true,
        mangle : true
    }).then(() => {
        done();
    });
});
gulp.task('html-build', function() {
    gulp.src('index.html')
        .pipe(replace('jspm_packages/system.js', ''))
        .pipe(replace('<script src="config.js"></script>', ''))
        .pipe(replace('<script>System.import("app/main");</script>', '<script src="main.js"></script>'))
        .pipe(gulp.dest(dist));
});
gulp.task('sass-build', function() {
    return gulp
        .src(sassInput)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(gulp.dest(dist));
});

gulp.task('server', ['sass'], function() {
    browserSync.init({
        server: './',
        browser: 'google chrome'
    });

    gulp.watch('app/**/*.scss',['sass']);
    gulp.watch(['*.html', '*.css', 'app/**/*.js']
      , browserSync.reload);
});

gulp.task('build-deploy',function(done) {
    runSeq(['sass-build','jspm-bundle','html-build'], 'deploy',done);
});

gulp.task('build', ['sass-build','jspm-bundle','html-build']);
