'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    htmlmin = require('gulp-htmlmin'),
    jsImport = require('gulp-js-import'),
    reload = browserSync.reload;
   

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        fontawesome: 'build/fontawesome/',
        bootstrap: 'build/bootstrap/',
        htaccess: 'build/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/main.js',
        style: 'src/style/style.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        bootstrap: 'src/bootstrap/bootstrap.min.css',
        fontawesome: 'src/fontawesome/**/*.*',
        htaccess: '.htaccess'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        fontawesome: 'src/fontawesome/**/*.*',
        htaccess: '.htaccess'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.build.html))//Выплюнем их в папку build
        .pipe(reload({stream: true}));             
      //  .pipe(reload({stream: true}));//И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
     //   .pipe(rigger()) 
        .pipe(jsImport({hideConsole: true}))
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sass().on('error', sass.logError)) // помилки
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
       
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('fontawesome:build', function() {
    gulp.src(path.src.fontawesome)
        .pipe(gulp.dest(path.build.fontawesome))
});

gulp.task('htaccess:build', function() {
    gulp.src(path.src.htaccess)
        .pipe(gulp.dest(path.build.htaccess))
});

gulp.task('bootstrap:build', function() {
    gulp.src(path.src.bootstrap)
        .pipe(gulp.dest(path.build.bootstrap))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'bootstrap:build',
    'fontawesome:build',
    'htaccess:build'
]);



gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fontawesome:build');
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);