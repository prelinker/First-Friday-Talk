var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var csso = require('gulp-csso');

var imagemin = require('gulp-imagemin');

var notify = require("gulp-notify");

gulp.task('scripts', function() {
    
    return gulp.src( 'assets/js/*.js' )
        .pipe( uglify() )
        .pipe( concat('all.min.js') )
        .pipe( gulp.dest('js/') )
        .pipe( notify("<%= file.relative %> generated") );
        
});

gulp.task('css', function() {
    
    gulp.src( 'assets/scss/*.scss' )
        .pipe( sass() )
        .pipe( concat('gallery.min.css') )
        .pipe( csso() )
        .pipe( gulp.dest('css/') )
        .pipe( notify("<%= file.relative %> generated") );
        
});

gulp.task('images', function() {

    return gulp.src( 'assets/img/**/*' )
        .pipe( imagemin( {optimizationLevel: 9} ) )
        .pipe( gulp.dest('img/') )
        .pipe(notify({
            onLast: true,
            message: "Images optimized"
        }));

});

gulp.task('default', ['scripts', 'css', 'images']);