var gulp = require('gulp')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')

gulp.task('default', function() {
  return browserify('./source/app.js')
         .transform(babelify.configure({ presets: ["es2015", "react"] }))
         .bundle()
         .pipe(source('snapterest.js'))
         // This is where you specify the output location of the .js
         .pipe(gulp.dest('./build/'))
})
