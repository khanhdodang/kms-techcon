import 'babel-polyfill'
import gulp from 'gulp'
import mocha from 'gulp-mocha'

gulp.task('desktop_test', () => {
  gulp.src('desktop/specs/test-desktop.js', {read: false})
    .pipe(mocha({
      timeout: 60000,
      reporter: 'spec'
    }))
    .once('error', () => {
      process.exit(1)
    })
    .once('end', () => {
      process.exit()
    })

})
