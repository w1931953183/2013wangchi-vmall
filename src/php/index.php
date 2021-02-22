<?php
header("content-type:text/html;charset=utf-8");
//链接数据库
$link = mysqli_connect("localhost","root","","vmall");
//设置编码
mysqli_set_charset($link,"utf8");
//查找热销精品
$sql = "select * from shop where num>0 order by num desc limit 0,8";
//执行
$result = mysqli_query($link,$sql);
//创建存储所有数据的数组
$arr = [];
//遍历结果集
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的数据追加到数组中
    array_push($arr,$row);
}
//把当前数组转为字符串，并响应给浏览器
echo json_encode($arr);
//关闭连接
mysqli_close($link);


?>