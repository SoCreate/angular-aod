var gulp = require('gulp');
var gls = require('gulp-live-server');
var inject = require('gulp-inject');

var config = {
    source: './src',
    allClientJavaScript: [
        './src/lib/*.js', 
        './src/**/module.js', 
        './src/**/*.js'
    ]
};

gulp.task('inject-script-links', function () {
    var target = gulp.src(config.source + '/index.html');
    var sources = gulp.src(config.allClientJavaScript, { read: false });
    return target.pipe(inject(sources, {
        starttag: '<!--scripts-start-->',
        endtag: '<!--scripts-end-->',
        transform: function (filepath) {
            var filepathToUse = ('.' + filepath).replace(config.source, '');
            return '<script src="' + filepathToUse + '"></script>';
        }
    })).pipe(gulp.dest(config.source));
});

gulp.task('serve', function() {
    var server = gls.static('src', 8000);
    server.start();
    gulp.watch(['src/**/*.js', 'src/**/*.css', 'src/**/*.html'], function () {
        // TODO: Figure out how to do this
        gulp.start('inject-script-links');
        server.notify.apply(server, arguments);
    });
});

gulp.task('default', ['inject-script-links', 'serve']);