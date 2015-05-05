var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('package', function() {
	return gulp.src(['./**/*', '!./**/*.zip', '!node_modules/**/*'])
		.pipe(zip('./assignment.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('default', ['package']);
