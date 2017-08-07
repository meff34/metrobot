const gulp = require('gulp');
const tsc = require('gulp-typescript');
const nodemon = require('gulp-nodemon');

const tsProject = tsc.createProject('tsconfig.json');

gulp.task('default', ['watch', 'nodemon']);

gulp.task('watch', ['typescript'], () => {
    gulp.watch('source/**/*.*', ['typescript']);
});

gulp.task('typescript', () => {
  return gulp.src('source/**/*.ts')
    .pipe(tsProject())
    .pipe(gulp.dest('build/'));
});

gulp.task('nodemon', function () {
  const stream = nodemon({
    script: 'build/index.js',
    ignore: ['source/**/*.*'],
    ext: 'js json',
    env: { 'NODE_ENV': 'development' },
  });

  stream.on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10)
  })
});