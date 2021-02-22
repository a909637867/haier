<?php
header("content-type:text/html;charset=utf-8");
//连接数据库
$link=mysqli_connect("localhost",'root','123456','haier');
//设置编码
mysqli_set_charset($link,"utf8");
$u=$_GET['name'];
$user= $_GET['username'];
$pwd = $_GET['password'];
// SQL语句
if($u%2==0){
    $sql="select * from shop order by interaction_num desc";
}else{
    $sql="select * from shop order by interaction_num asc";
}

if(!empty($user)&&!empty($pwd)&&!empty($u)){
    if($u%2==0){
        $sql="select * from shop where price>=$user and price<=$pwd order by interaction_num desc";
    }else{
        $sql="select * from shop where price>=$user and price<=$pwd order by interaction_num asc";
    }
}
// $sql="select * from shop order by price desc";
//执行SQL语句，并返回结果集
// mysqli_multi_query
$result=mysqli_query($link,$sql);
//创建存储所有数据的数组
$arr=[];
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