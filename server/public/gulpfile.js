var gulp=require('gulp'),
	connect=require('gulp-connect'),
	browserify=require('gulp-browserify'),
	concat=require('gulp-concat'),
	port=process.env.port || 3000;

//gulp browserify
gulp.task('browserify',function(){
	gulp.src('./app/js/main.js')
	.pipe(browserify({
		transform:'reactify'
	}))
	.pipe(gulp.dest('./dist/js'))
});

//live reload
gulp.task('connect',function(){
	connect.server({
		//root:'./',
		port:port,
		livereload:true
	})
});

//reload js
gulp.task('js',function(){
	gulp.src('./dist/**/*.js')
	.pipe(connect.reload())
});

//reload html
gulp.task('html',function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload())
});

//gulp watch
gulp.task('watch',function(){
	gulp.watch('./dist/**/*.js',['js']);
	gulp.watch('./app/**/*.js',['browserify']);
	gulp.watch('./app/**/*.html',['html']);
})

//default task
gulp.task('default',['browserify']);

//gulp init
// gulp.task('start',['browserify','connect','watch']);
gulp.task('start',['browserify','watch']);