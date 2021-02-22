<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
//用户名
$username = $_POST["valname"];
//账号
$usernum = $_POST["valnum"];
//密码
$userpass = $_POST["valpass"];
//身份证号
$userid = $_POST["valid"];
//出生日期
$userbrith = $_POST["valbrith"];
//连接数据库
$link = mysqli_connect("localhost","root","","vmall");
//设置编码
mysqli_set_charset($link,"utf8");
//sql语句
$sql = "select usernum from user where usernum=$usernum";
$sql2 = "insert into user (username,usernum,userstr,idnum,brthnum) values ('$username',$usernum,'$userpass',$userid,$userbrith)";
//查找是否数据库中有相同的账号
$retuse = mysqli_query($link,$sql);
$arr = [];
//将查询结果添加到数组中
while($row = mysqli_fetch_assoc($retuse)){
	array_push($arr,$row);
}
//判断返回的数据是否有内容
if(count($arr) >= 1){
	echo 0;
}else{
	mysqli_query($link,$sql2);
	echo 1;
}
//断开连接
mysqli_close($link);
?>