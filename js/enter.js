// 账号
var user = document.querySelector('[name="username"]');
// 密码
var eye = document.querySelector('#eye');
var pass = document.querySelector('[name="password"]');
// 复选框
var check = document.querySelector('.check input');
// 登录按钮
var btn = document.querySelector('button');
//获取地址栏中的参数
var search = location.search;
// 设置密码掩码
var flag = 0;
// 获取cookie
var name1 = getCookie("user");
// 判断是否存在用户名
if (name1) {
    alert('您已登录');
    if (confirm("是否注销当前用户？")) {
        delCookie("user");
    } else {
        // if (search) {
        //     //获取参数中传入的地址
        //     var new_url = search.split('=')[1]
        //     location.href = new_url
        // } else {
        window.history.go(-1);
        // }
    }
}

// 设置密码显示与隐藏
eye.onclick = function() {
    if (flag == 0) {
        pass.type = 'text';
        eye.src = "img/open.png";
        flag = 1;
    } else {
        pass.type = 'password';
        eye.src = "img/close.png";
        flag = 0;
    }
};

//给能被点击的登录按钮绑定点击事件
btn.onclick = function() {
    //获取账号输入框中的value
    var u1 = user.value
    var p1 = pass.value
        //调用ajax发送请求
    Ajax({
        url: 'php/enter.php',
        data: `username=${u1}&password=${p1}`,
        success: function(dt) {
            //判断当前返回值是否等于1
            if (dt == 1) {
                //判断当前地址栏中是否有参数
                if (search) {
                    //获取参数中传入的地址
                    var new_url = search.split('=')[1]
                    location.href = new_url
                } else {
                    location.href = "./index.html"
                }
                setCookie("user", u1)
                alert("登录成功")
            } else {
                alert("登录失败")
                location.reload();
            }
        }
    })
    return false
}

// 判断登录按钮
check.onclick = function() {
    //判断当前选项是否被选中
    if (user.value != '' && pass.value != '') {
        if (check.checked) {
            //取消登录按钮的禁用
            btn.disabled = false
            btn.style.backgroundColor = '#005aaa'
        } else {
            btn.disabled = true
        }
    }
}