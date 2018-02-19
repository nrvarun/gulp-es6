'use strict';

import gulp 			from 'gulp';
import batch 			from 'gulp-batch';
import watch 			from 'gulp-watch';
import plumber 			from 'gulp-plumber';
import notify 			from 'gulp-notify';
import gutil 			from 'gulp-util';
import source 			from 'vinyl-source-stream';
import buffer 			from 'vinyl-buffer';
import pugInheritance 	from 'gulp-pug-inheritance';
import pug 				from 'gulp-pug';
import sass 			from 'gulp-sass';
import postcss 			from 'gulp-postcss';
import autoprefixer 	from 'autoprefixer';
import minifyCSS 		from 'gulp-csso';
import sourcemaps 		from 'gulp-sourcemaps';
import babel 			from 'gulp-babel';
import browserify 		from 'browserify';
import babelify 		from 'babelify';
import es2015 			from 'babel-preset-es2015';
import uglify 			from 'gulp-uglify';
import browserSync 		from 'browser-sync';
import filter 			from 'gulp-filter';
import changed 			from 'gulp-changed';
import imagemin 		from 'gulp-imagemin';
import clean 			from 'gulp-rimraf';
import purify 			from 'gulp-purifycss';
import merge 			from 'merge-stream';
import glob 			from 'glob';
import path 			from 'path';

// Code Linting
import eslint 			from 'gulp-eslint';
import reporter 		from 'postcss-reporter';
import bemlinter 		from 'postcss-bem-linter';
import syntax_scss 		from 'postcss-scss';
import stylelint 		from 'stylelint';
import gstylelint 		from 'gulp-stylelint';
import stylelintFormatter from 'stylelint-formatter-pretty';

browserSync.create();

// PATHS
const dirs = {
  src: 'src',
  dest: 'dist',
};
const paths = {
  css: {
    source: `${dirs.src}/css/*.scss`,
    watch: `${dirs.src}/css/**/*.scss`,
    dest: `${dirs.dest}/css/`,
  },
  js: {
    source: [`${dirs.src}/js/**/*.js`],
    dest: `${dirs.dest}/js/`,
    // vendor:     `${dirs.src}/assets/js/vendor/*.js`,
    // js    :     [`${dirs.src}/assets/js/vendor.min.js`, `${dirs.src}/assets/js/main.min.js`]
  },
  pug: {
    source: [`${dirs.src}/**/*.pug`],
    dest: `${dirs.dest}/`,
    watch: [`${dirs.src}/pug/**/*.pug`, `${dirs.src}/*.pug`],
  },
  images: {
    source: `${dirs.src}/img/**/*.{png,jpg,jpeg,gif,svg}`,
    dest: `${dirs.dest}/img/`,
  },
};

// Clean Dist Directory
gulp.task('clean', [], () => {
  console.log('Clean all files in dist folder');

  return gulp.src('dist/*', { read: false }).pipe(clean());
});

const plugins = [autoprefixer({ browsers: ['last 10 version'] })];

// SASS
gulp.task('sass', () =>
  gulp
    .src(paths.css.source)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          message: '<%= error.message %>',
          title: 'CSS preprocessing',
        }),
      }),
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream({ match: '**/*.css' })),);

// SCSS Stylelint
// gulp.task('scss-lint', () => {
//   const processors = [
// 	bemlinter('bem'),
//     stylelint(),
//     reporter({
//       clearMessages: true,
//       throwError: true
//     }),
//   ];

//   return gulp
//     .src([
//       'src/css/**/*.scss',
//       // Ignore linting vendor assets
//       // Useful if you have bower components
//       '!src/css/1-plugins/**/*.scss',
//     ])
//     .pipe(postcss(processors, { syntax: syntax_scss }));
// });

gulp.task('scss-lint', function () {

	return gulp.src(['./src/css/**/*.scss','!./src/css/1-plugins/**/*.scss'])
	  .pipe(gstylelint({
		failAfterError: false,
		reporters: [{
		  formatter: stylelintFormatter,
		  console: true
		}]
	}));
});

// Eslint
gulp.task('eslint', () =>
  gulp
    .src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

// PUG
gulp.task('pug', () =>
  gulp
    .src(paths.pug.source)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          message: '<%= error.message %>',
          title: 'Template compilation',
        }),
      }),
    )
    .pipe(changed(dirs.dest, { extension: '.html' }))
    .pipe(
      pugInheritance({
        basedir: 'src',
        extension: '.pug',
        skip: 'node_modules',
      }),
    )
    .pipe(
      filter(file => !/\/_/.test(file.path) && !/^_/.test(file.relative)),
    )
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream()),
);

// ES6 Bundles generator
gulp.task('bundle-js', () => {
  const files = glob.sync('./src/js/*.js');
  return merge(
    files.map(file =>
      browserify({
        entries: file,
        debug: true,
      })
        .transform(babelify.configure({ presets: [es2015] }))
        .on(
          'error',
          notify.onError({
            message: '<%= error.message %>',
            title: 'Babelify JS',
          }),
        )
        .bundle()
        .on(
          'error',
          notify.onError({
            message: '<%= error.message %>',
            title: 'JS compilation',
          }),
        )
        .pipe(source(`${path.basename(file, '.js')}.js`))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
      // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream()),
    ),
  );
});

gulp.task('images', () =>
  gulp
    .src(paths.images.source)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(gulp.dest(paths.images.dest)),
);

gulp.task('fonts', () =>
  gulp.src('src/fonts/**/*.*').pipe(gulp.dest('dist/fonts')),
);

gulp.task('js-vendor', () =>
  gulp.src('src/js/plugins/*.js').pipe(gulp.dest('dist/js/plugins')),);

// SERVE
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    open: true,
    port: 8000,
  });

  gulp.watch(paths.css.watch, ['sass', 'scss-lint']);
  gulp.watch(paths.js.source, ['bundle-js', 'eslint']);
  gulp.watch(paths.pug.watch, ['pug']);
  // gulp.watch(paths.images.source, browserSync.reload)
});

// TASKS
gulp.task('default', ['build', 'serve']);
gulp.task('build', [
  'pug',
  'sass',
  'scss-lint',
  'eslint',
  'bundle-js',
  'images',
  'fonts',
  'js-vendor',
]);
