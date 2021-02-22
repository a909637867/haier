<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$user= $_GET['username'];
$pwd = $_GET['password'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','haier');
//设置编码
mysqli_set_charset($link,"utf8");
// SQL语句
$sql = "select * from user where username='$user' and password='$pwd'";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//判断当前结果集中是否存在数据
if(mysqli_fetch_assoc($result)){
    echo '1';
}else{
    echo '0';
}
// // 判断输入的用户名与密码是否存在且输入正确
// if($result&&mysqli_affected_rows($link)){
//     header("location:../index.html");
// }else{
//     echo "<script>alert('用户名或密码输入有误');window.location.href='../enter.html'</script>";
// }
//关闭连接
mysqli_close($link);
?>