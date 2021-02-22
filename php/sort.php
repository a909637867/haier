<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
// $user= $_GET['name1'];
// $pwd = $_GET['password'];
//连接数据库
$link=mysqli_connect("localhost",'root','123456','haier');
//设置编码
mysqli_set_charset($link,"utf8");
$u=$_GET['name'];
$user= $_GET['username'];
$pwd = $_GET['password'];
$num=$_GET['num'];
// 价格范围
$st1="title like '%对开门%' and title not like '%十字对开门%'";
$st2="title like '%十字对开门%'";
$st3="title like '%多门%'";
$st4="title like '%三门%'";
$st5="title like '%两门%'";
$st6="title like '%单门%'";
;
// SQL语句
if($num==1){
    if($u%2==0){
        $sql="select * from shop where $st1 order by price desc";
    }else{
        $sql="select * from shop where $st1 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st1 order by price desc";
    //     }else{
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st1 order by price asc";
    //     }
    // }
}
if($num==2){
    if($u%2==0){
        $sql="select * from shop where $st2 order by price desc";
    }else{
        $sql="select * from shop where $st2 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         echo 1;
    //         $sql="select * from shop where price>='$user' and price<='$pwd' and $st2 order by price desc";
    //     }else{
    //         echo 2;
    //         $sql="select * from shop where price>='$user' and price<='$pwd' and $st2 order by price asc";
    //     }
    // }
}

if($num==3){
    if($u%2==0){
        $sql="select * from shop where $st3 order by price desc";
    }else{
        $sql="select * from shop where $st3 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st3 order by price desc";
    //     }else{
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st3 order by price asc";
    //     }
    // }
}
if($num==4){
    if($u%2==0){
        $sql="select * from shop where $st4 order by price desc";
    }else{
        $sql="select * from shop where $st4 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st4 order by price desc";
    //     }else{
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st4 order by price asc";
    //     }
    // }
}
if($num==5){
    if($u%2==0){
        $sql="select * from shop where $st5 order by price desc";
    }else{
        $sql="select * from shop where $st5 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st5 order by price desc";
    //     }else{
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st5 order by price asc";
    //     }
    // }
}
if($num==6){
    if($u%2==0){
        $sql="select * from shop where $st6 order by price desc";
    }else{
        $sql="select * from shop where $st6 order by price asc";
    }
    // if(!empty($user)&&!empty($pwd)&&!empty($u)){
    //     if($u%2==0){
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st6 order by price desc";
    //     }else{
    //         $sql="select * from shop where price>=$user and price<=$pwd and $st6 order by price asc";
    //     }
    // }
}
// and $st3 and $st4 and $st5 and $st6
 //执行SQL语句，并返回结果集
 // mysqli_multi_query
 $result=mysqli_query($link,$sql);
 if (!$result) {
    printf("Error: %s\n", mysqli_error($link));
    exit();
}
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