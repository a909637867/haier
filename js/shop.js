//获取账号cookie
var name1 = getCookie("user");
//获取大盒子对象
var box = document.querySelector(".main-content");
//获取地址栏中的地址
var url = location.href;
//获取localStorage中的cartList3
var cartList = localStorage.getItem("cartList1");
//把当前cartList字符串转为数组对象
cartList = JSON.parse(cartList) || [];
//判断当前cookie是否存在
var user = document.querySelector('.user img');
if (name1) {
    show()
    user.src = "img/user.webp"
} else {
    user.src = "img/nouser.png"
    alert("你还没登录，请登录在进入")
    location = "./enter.html?pathUrl=" + url
};

function show() {
    //判断当前localStorage中是否有内容
    if (cartList.length > 0) {
        //获取全选框是否被选中
        var aa = cartList.every(item => {
            //判断当前商品是否被选中
            return item.selected == 1
        });
        //获取当前被选中商品的种类和价格
        var sum = total();
        //  购物车信息 
        var str1 = '';
        str1 = ` 
                <!-- 购物车信息 -->
                <div class="main-content-title">
                    <div class="title-message">
                        <p>商品</p>
                    </div>
                    <div class="title-price">
                        <p>单价</p>
                    </div>
                    <div class="title-number">
                        <p>数量</p>
                    </div>
                    <div class="title-total">
                        <p>小计</p>
                    </div>
                    <div class="title-operation">
                        <p>操作</p>
                    </div>
                </div>`;
        //遍历数组中所有商品
        var str2 = ''
        cartList.forEach(item => {
            str2 += `
                <!-- 购物车中有商品 -->
                <div class="merchandise-news">
                    <div class="merchandise-matter">
                        <input type="checkbox" ${item.selected==1?"checked":''} name="xuan" data-id="${item.id}" >
                        <img src="${item.pic}" alt="">
                        <div class="merchandise-matter-text">
                            <h3>${item.title}</h3>
                            <p>${item.textbox}</p>
                            <p>${item.interaction} <i class="iconfont icon-xiaoxi"></i></p>
                        </div>
                    </div>
                    <div class="merchandise-price">
                        <span>￥</span><span>${item.price}</span>
                    </div>
                    <div class="merchandise-number">
                        <button data-id="${item.id}" ${item.number<=1?"disabled":''} >-</button>
                        <span>${item.number}</span>
                        <button data-id="${item.id}"} >+</button>
                    </div>
                    <div class="merchandise-total">
                        <span>￥</span><span>${(item.number*item.price).toFixed(2)}</span>
                    </div>
                    <div class="merchandise-operation">
                        <button data-id="${item.id}">删除</button>
                    </div>
                </div>
            `
        });
        //给当前字符串拼接结束的标签
        str2 += '</div>';
        // 结算
        var sums = 0;
        for (let i = 0; i < cartList.length; i++) {
            sums = sums + parseFloat(cartList[i].number) * parseFloat(cartList[i].price)
        }
        var str3 = '';
        str3 = `
                <div class="main-content-bottom">
                    <div class="bottom-check" >
                        <input type="checkbox" name="quanxuan" ${aa?"checked":''}><span>全选</span>
                        <button class="del">批量删除<button>
                    </div>
                    <div class="goods-message">
                        <span>商品种类：${cartList.length} 种<span>
                        <span class="ml5">所选商品价格：￥${sum[1]} 元<span>&nbsp;&nbsp;
                        <span>总价：￥${sums} 元</span>
                    </div>
                    <div class="goods-settlement">
                        <button class="jiesuan">结算</button>
                        <!-- <button class="qingkong">清空购物车</button> -->
                    <div>
                </div>
        `;
        //最后把拼接好的内容添加到box大盒子中
        box.innerHTML = str1 + str2 + str3;
    } else {
        var str4 = `
        <!-- 购物车中没有商品 -->
        <div class="jumbotron">
        <img src="img/nodiv.webp" alt="">
        <p>还没有任何商品，快去 <a href="./list.html" class="Cred" >挑选</a> 吧</p>
        </div>
        `;
        //把当前内容添加到box盒子中
        box.innerHTML = str4
    }
}
// 给大盒子添加点击事件
box.onclick = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    // 判断点击的为加号
    if (target.innerHTML == "+") {
        //获取当前对象中的id属性
        var id = target.getAttribute("data-id")
            //遍历cartList数组对象
        cartList.forEach(item => {
                //判断遍历出来的商品是否为当前操作商品
                if (item.id == id) {
                    item.number++
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    // 判断点击的为减号
    if (target.innerHTML == "-") {
        //获取当前对象中的id属性
        var id = target.getAttribute("data-id")
            //遍历cartList数组对象
        cartList.forEach(item => {
                //判断遍历出来的商品是否为当前操作商品
                if (item.id == id) {
                    item.number--
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    // 判断点击的为删除键
    if (target.innerHTML == "删除") {
        //获取当前对象中的id属性
        var id = target.getAttribute("data-id")
            //遍历cartList数组对象
        cartList = cartList.filter(item => {
                return item.id != id;
            })
            //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    // 判断商品是否被选中
    if (target.name == "xuan") {
        //获取当前商品对应的id 
        var id = target.getAttribute("data-id")
            //遍历数组中所有的商品对象
        cartList.forEach(item => {
                if (item.id == id) {
                    item.selected = item.selected == 1 ? "0" : "1"
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    if (target.name == "quanxuan") {
        //遍历所有商品
        cartList.forEach(item => {
                //判断当前全选框是否被选中
                if (target.checked) {
                    item.selected = 1
                } else {
                    item.selected = 0
                }
            })
            //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    if (target.innerHTML == "批量删除") {
        cartList = cartList.filter(item => {
            return item.selected != 1
        });
        //重新把当前操作完毕的数组添加到localStorage中
        localStorage.setItem("cartList1", JSON.stringify(cartList))
            //调用show方法，重新把页面再次渲染
        show()
    }
    if (target.innerHTML == "结算") {
        //添加确认框
        if (confirm("你确定要购买吗？")) {
            alert("你需要支付：￥" + total()[1])
            cartList = cartList.filter(item => {
                return item.selected != 1
            });
            //重新把当前操作完毕的数组添加到localStorage中
            localStorage.setItem("cartList1", JSON.stringify(cartList))
                //调用show方法，重新把页面再次渲染
            show()
        }
    }
    // if (target.innerHTML == "清空购物车") {
    //     if (confirm("你确定要清空购物车吗？")) {
    //         //重新把当前操作完毕的数组添加到localStorage中
    //         localStorage.setItem("cartList1", JSON.stringify([]))
    //             //调用show方法，重新把页面再次渲染
    //         show()
    //         location.reload()
    //     }
    // }
};
//统计所选商品种类和价格
function total() {
    var num = 0 //所选商品种类
    var price = 0 //所选商品总价格
        //遍历cartList数组对象
    cartList.forEach(item => {
        //判断当前商品是否被选中
        if (item.selected == 1) {
            num++
            price += item.number * item.price
        }
    })
    return [num, price]
}