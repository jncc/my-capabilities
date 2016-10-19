"use strict";

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// the server-scripts task compiles the app.server code
// all the remaining tasks deal with building app.client

gulp.task('server-scripts', () => {
  // use the tsconfig.json typescript compiler configuration instead of gulp.src()
  let tsProject = $.typescript.createProject('tsconfig.json');
  return tsProject.src()
    //.pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(tsProject()).js
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'));
    // .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {

  return gulp.src('src/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
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

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('src/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('src/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec'));
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

gulp.task('extras', () => {
  return gulp.src([
    'src/*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'built']));

gulp.task('nodemon', (cb) => {

  var started = false;
  return $.nodemon({ script: '.tmp/app.server/server.js' })
    .on('start', () => {
      // to avoid nodemon being started multiple times
      if (!started) {
        cb();
        started = true;
      }
    });
});

gulp.task('serve', () => {

  // run the second set of tasks when the first set is finished
  runSequence(['clean', 'wiredep', 'server-scripts'], ['nodemon', 'styles', 'scripts', 'fonts'], () => {

    browserSync({
      port: 9000,
      proxy: "http://localhost:5000", // proxy for app.server
      serveStatic: ['.tmp/app.client', 'app.client']
    });

    gulp.watch([
      'app.server/*.*',
      'app.client/*.html',
      'app.client/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);
    gulp.watch('app.client/styles/**/*.scss', ['styles']);
    gulp.watch('app.client/scripts/**/*.js', ['scripts']);
    gulp.watch('app.client/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
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

// inject bower components
gulp.task('wiredep', () => {
  // gulp.src('src/styles/*.scss')
  //   .pipe(wiredep({
  //     ignorePath: /^(\.\.\/)+/
  //   }))
  //   .pipe(gulp.dest('src/styles'));

  // gulp.src('src/*.html')
  //   .pipe(wiredep({
  //     exclude: ['bootstrap-sass'],
  //     ignorePath: /^(\.\.\/)*\.\./
  //   }))
  //   .pipe(gulp.dest('src'));
});

gulp.task('build', ['server-scripts', 'lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
  runSequence(['clean', 'wiredep'], 'build');
});
