"use strict";

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

function typescript(include) {
  // use the tsconfig.json typescript compiler configuration instead of gulp.src()
  // so we have the same typescript options within our code editor
  let tsProject = $.typescript.createProject('tsconfig.json');
  tsProject.config.include = include;
  return tsProject.src()
    .pipe($.sourcemaps.init())
    .pipe(tsProject()).js
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
}

gulp.task('server-scripts', () => {
  return typescript(['app.server/**/*']);
});

gulp.task('scripts', () => {
return typescript(['app.client/**/*'])
    .pipe($.if('*.js', webpack( require('./app.client/webpack.config.js') )))
    .pipe(gulp.dest('.tmp/app.client'));
});

gulp.task('styles', () => {
  return gulp.src('app.client/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/app.client/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('src/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'src', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('src/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// puts everything that's not html into dist?
gulp.task('extras', () => {
  return gulp.src([
    'src/*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'built']));

gulp.task('serve', () => {

  // run the second set of tasks when the first set is finished, then...
  runSequence(['clean', 'server-scripts'], ['styles', 'scripts', 'fonts'], () => {

    var started = false;

    // use nodemon to run app.server
    $.nodemon({
      script: '.tmp/app.server/server.js',
      watch:  ['.tmp/app.server'],
      ext:    'js',
      delay:  100
    }).on('start', () => {
      // use browserSync to run app.client
      if (!started) {
        browserSync({
          port:        9000,
          proxy:       "http://localhost:5000", // proxy for app.server
          serveStatic: ['.tmp/app.client', 'app.client']
        });
      }
      started = true;
    });

    gulp.watch('app.server/*.*', ['server-scripts']);
    gulp.watch([
      'app.client/*.html',
      'app.client/images/**/*',
      '.tmp/app.client/fonts/**/*'
    ]).on('change', reload);
    gulp.watch('app.client/styles/**/*.scss', ['styles']);
    gulp.watch('app.client/scripts/**/*.ts', ['scripts']);
    gulp.watch('app.client/fonts/**/*', ['fonts']);
  });
});


// gulp.task('serve:dist', () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     server: {
//       baseDir: ['dist']
//     }
//   });
// });

// gulp.task('serve:test', ['scripts'], () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/scripts': '.tmp/scripts',
//         '/bower_components': 'bower_components'
//       }
//     }
//   });

//   gulp.watch('src/scripts/**/*.js', ['scripts']);
//   gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
//   gulp.watch('test/spec/**/*.js', ['lint:test']);
// });



gulp.task('build', ['server-scripts', 'scripts', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  runSequence(['clean'], 'build');
});
