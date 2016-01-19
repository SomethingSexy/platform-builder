var gulp = require('gulp');
var jspm = require('jspm');

var paths = {
  scripts: ['app/**/*.js'],
  images: 'client/img/**/*'
};

gulp.task('build', function() {
  var builder = new jspm.Builder();

  builder.reset(System);

  return builder.loadConfig('config.js')
    .then(function() {
      builder.config({
        separateCSS: true,
        cssOptimize: false
      });
      return builder.buildStatic('app/client.js', 'public/js/main.js', {
        sourceMaps: false,
        minify: false,
        mangle: false
      });
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['build']);
});
