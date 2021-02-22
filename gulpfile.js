//引入gulp
const gulp = require("gulp")
//引入打包css依赖
const cssmin = require("gulp-cssmin")
//引入打包js依赖
const uglify = require("gulp-uglify")
//引入打包HTML依赖
const htmlmin = require("gulp-htmlmin")
//引入自动删除dist文件夹依赖
const clean = require("del")

//压缩css文件规则
const cssys = () => {
	return gulp.src("./src/css/*.css")
		.pipe(cssmin())
		.pipe(gulp.dest("./dist/css"))
}
//压缩js文件规则
const jsys = () => {
	return gulp.src("./src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"))
}
//压缩html规则
const htmlys = () => {
	return gulp.src("./src/html/*.html")
		.pipe(htmlmin({
			removeAttributeQuotes: true, //移除属性上的双引号
			removeComments: true, //移除注释
			collapseWhitespace: true, //移除所有空格,会变成一行代码
			minifyCSS: true, //把页面里面style标签里面的css样式也去空格
			minifyJS: true, //把页面里面script标签里面的js代码也去空格
			collapseBooleanAttributes: true //把值为布尔值的属性简写
		}))
		.pipe(gulp.dest("dist/pages"))
}
//自动删除dist文件夹任务
const del = ()=>{
	return del(["./dist"])
}


//导出
// module.exports.cssys = cssys;
// module.exports.jsys = jsys;
// module.exports.htmlys = htmlys

//批量执行任务
module.exports.default = gulp.series(del,gulp.parallel(cssys,jsys,htmlys))