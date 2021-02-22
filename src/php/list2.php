<?php
header("content-type:text/html;charset=utf-8");
//链接数据库
$link = mysqli_connect("localhost","root","","vmall");
//设置编码
mysqli_set_charset($link,"utf8");
//获取编号
$num = $_GET["val"];
//查询数据库数据sql语句
$sql = "select * from shop where keyss=$num";
//执行sql语句
$result = mysqli_query($link,$sql);
//存放所有数据数组
$arr3 = [];
//遍历结果集
while($row = mysqli_fetch_assoc($result)){
	//把遍历出来的数据追加到数组中
	array_push($arr3 , $row);
}
//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr3);
//关闭连接
mysqli_close($link);
?>