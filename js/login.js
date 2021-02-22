window.onload = function() {

    // 账号
    var user = document.querySelector('[name="user"]');
    // 密码
    var eye = document.querySelector('#eye');
    var pass = document.querySelector('[name="pwd"]');
    // 复选框
    var check = document.querySelector('.check input');
    // 注册按钮
    var btn = document.querySelector('button');

    // 设置密码掩码
    var flag = 0;
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

    // 判断注册按钮
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
}