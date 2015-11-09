var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	rename = require("gulp-rename"),
	minifycss = require("gulp-minify-css"),
	notify = require("gulp-notify"),
	concat = require("gulp-concat"),
	livereload = require("gulp-livereload"),
	uglify = require("gulp-uglify"),
	beautify = require('gulp-beautify');
	htmlminify = require("gulp-html-minify"),



gulp.task('styles', function(){
	return sass('src/scss', { style: 'expanded' })
		.pipe(autoprefixer("last 2 versions"))
		.pipe(gulp.dest('dist/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(livereload())
		.pipe(notify({message:"SCSS Compiled"}));
});

gulp.task('scripts', function() {
	return gulp.src("src/javascript/**")
		.pipe(concat('main.js'))
		.pipe(beautify({indentSize: 4, indentChar : ' '}))
		.pipe(gulp.dest("dist/js/"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(livereload())
		.pipe(notify({message:"Minified JS, And Bundled."}));
});

gulp.task('templates' , function(){
    return gulp.src("src/templates/**/*.html")
        .pipe(htmlminify())
        .pipe(gulp.dest("dist/templates"))
        .pipe(livereload())
        .pipe(notify({message:"Compressed HTML."}));
});

gulp.task("doall", ['templates', "scripts", "styles"]);

gulp.task('watch', function(){
	livereload.listen({ start: true});
	gulp.watch(['views/*']).on('change', livereload.changed);
	gulp.watch('src/scss/*', ['styles']);
	gulp.watch('src/javascript/**', ['scripts']);
	gulp.watch('src/templates/*.html', ['templates']);
});
