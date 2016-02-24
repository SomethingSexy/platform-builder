var gulp = require('gulp');
var jspm = require('jspm');

var paths = {
  scripts: ['app/**/*.js'],
  styles: ['src/**/*.css'],
  images: 'client/img/**/*'
};

gulp.task('build', function() {
  // copy over styles
  gulp.src(paths.styles)
  .pipe(gulp.dest('dist'));

  var builder = new jspm.Builder();

  builder.reset(System);

  return builder.loadConfig('config.js')
    .then(function() {
      builder.config({
        separateCSS: true,
        cssOptimize: false
      });
      return builder.buildStatic('dist/apps/platform/client.js', 'public/js/platform.js', {
        sourceMaps: false,
        minify: false,
        mangle: false
      });
    }).then(function(){
      return builder.buildStatic('dist/apps/product/client.js', 'public/js/product.js', {
        sourceMaps: false,
        minify: false,
        mangle: false
      });
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build']);
});
