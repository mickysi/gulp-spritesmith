var gulp = require('gulp'),
	spritesmith=require('gulp.spritesmith'),
	imagemin = require('gulp-imagemin');

//创建精灵图
gulp.task('t1', function() {
   return gulp.src('src/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'css/style.css',//保存合并后对于css样式的地址
            padding:14,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate: function (data) {
                var arr=[];
				//url文件夹是自己习惯
				arr.push(".icon{background: url(../images/sprite.png) no-repeat;"+
				"background-size:"+data.spritesheet.width/100+"rem  "+data.spritesheet.height/100+"rem;}\n");
                data.sprites.forEach(function (sprite) {
                    arr.push("."+sprite.name+
                    "{" +  
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }
        }))
        .pipe(gulp.dest('dist/'));
});
//压缩
gulp.task('t2', function() {
  return gulp.src('dist/'+ '/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(imagemin())
  .pipe(gulp.dest('dist/'))
});
//总命令
gulp.task('default', gulp.series('t1','t2'));