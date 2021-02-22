<?php
header("content-type:text/html;charset=utf-8");
//链接数据库
$link = mysqli_connect("localhost","root","","vmall");
//设置编码
mysqli_set_charset($link,"utf8");
//查询数据库数据
$arr = [
	"select * from shop where num>0 order by num desc limit 0,8",
	"select * from shop where num>0 and keymain='手机' limit 0,4",
	"select * from shop where num>0 and keymain='智能穿戴' limit 0,8",
	"select * from shop where num>0 and keymain='笔记本' limit 0,9",
	"select * from shop where num>0 and keymain='耳机音箱眼镜' limit 0,8",
	"select * from shop where num>0 and keymain='智能家居' limit 0,8",
	"select * from shop where num>0 and keymain='莫塞尔' limit 0,8",
	"select * from shop where num>0 and keymain='通用配件' limit 0,8",
	"select * from shop where num>0 and keymain='精品平板' limit 0,4",
	"select * from shop where num>0 and keymain='生态精品' limit 0,8",
	"select * from shop where num>0 order by num desc limit 0,17",
	"select * from shop where title like '%儿童手表%'",
	"select * from shop where num>0 order by num desc limit 0,6"
];
//存放所有数据数组
$arr3 = [];
foreach($arr as $value){
	$result = mysqli_query($link,$value);
	$arr2 = [];
	//遍历结果集
	while($row = mysqli_fetch_assoc($result)){
	    //把遍历出来的数据追加到数组中
	    array_push($arr2 , $row);
	}
	array_push($arr3,$arr2);
}
//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr3);
//关闭连接
mysqli_close($link);
?>