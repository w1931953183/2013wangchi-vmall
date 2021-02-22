<?php
header("content-type:text/html;charset=utf-8");
$link = mysqli_connect("localhost","root","","vmall");
//获取传入的参数
$val1 = $_POST["val1"];
$val2 = $_POST["val2"];
//sql语句
$sql = "select * from user where usernum=$val1 and userstr='$val2'";
//设置编码
mysqli_set_charset($link,"utf8");
//执行sql语句
$result = mysqli_query($link,$sql);
$arr = [];
while($row = mysqli_fetch_assoc($result)){
	array_push($arr,$row);
}
if(count($arr) > 0){
	echo json_encode($arr);
}else{
	echo 0;
}
mysqli_close($link);


?>