<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$users= trim($_REQUEST['user']);
$pwds = trim($_REQUEST['pwd']);
//连接数据库
$link=mysqli_connect("localhost",'root','123456','haier');
//设置编码
mysqli_set_charset($link,"utf8");
// 判断用户名
if(empty($users)){
    echo "<script>alert('用户名不能为空');window.location.href='../login.html'</script>";
}else if(strlen($users) < 6){
    echo "<script>alert('用户名长度不能少于6位');window.location.href='../login.html'</script>";
}else if(preg_match_all("/([\x81-\xfe][\x40-\xfe])/",$users)){
    echo "<script>alert('用户名不能为中文');window.location.href='../login.html'</script>";
}else if(strlen($users)>16){
    echo "<script>alert('用户名长度不能超过16位');window.location.href='../login.html'</script>";
}

// 判断密码
if(empty($pwds)){
    echo "<script>alert('密码不能为空');window.location.href='../login.html'</script>";
}else if(strlen($pwds) < 6){
    echo "<script>alert('密码长度不能少于6位');window.location.href='../login.html'</script>";
}else if(strlen($pwds) >18){
    echo "<script>alert('密码长度不能超过18位');window.location.href='../login.html'</script>";
}
// 当用户名与密码满足条件时 执行SQL语句并将数据传入数据库
$sql1 = "select * from user where username='{$users}'";
$con = mysqli_query($link,$sql1);
if(strlen($users)>=6 && strlen($pwds)>=6 ){
    if(preg_match("/[A-Za-z]/",$pwds)&& preg_match("/\d/",$pwds)){
        if(mysqli_fetch_assoc($con)){
            echo "<script>alert('用户名已存在，请重新进行注册');window.location.href='../login.html'</script>";
        }else{
            // SQL语句
            $sql = "insert into  user values('$users','$pwds')";
            //执行SQL语句，并返回结果集
            $result=mysqli_query($link,$sql);
            if($result){
                echo "<script>alert('注册成功');window.location.href='../enter.html'</script>";
                // header("location:../enter.html");
            }
        }
    }else{
        echo "<script>alert('密码需包含数字和字母');window.location.href='../login.html'</script>";
    }
}
// 关闭数据库
mysqli_close($link);
