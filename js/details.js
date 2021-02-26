var name1 = getCookie("user");
var user = document.querySelector('.user img');
if (name1) {
    user.src = "img/user.webp"
} else {
    user.src = "img/nouser.png"
};
//获取当前地址栏中的参数信息
var search = location.search
    // 获取大盒子
var box = document.querySelector('#main');
var dt;
//判断当前search对象中是否有值
if (search) {
    //分割search字符串
    var id = search.split('=')[1];

    (async function() {
        dt = await promiseAjax({
            url: 'php/details.php',
            data: 'id=' + id,
            datatype: 'json'
        });
        // 大图
        var d1 = dt.pic01;
        var n = d1.replace(/_60/, '');
        //创建拼接所有内容的字符串
        var str = `
        <div class="main-contain">
        <div class="main-t-content">
            <div class="main-content-title">
                <a href="index.html">首页</a> >
                <a href="list.html">冰箱</a> >
                <span>${dt.textbox}</span>
            </div>
            <div class="main-content-pic">
                <div class="main-content-pic-l">
                    <div class="main-pic">
                        <!-- 大图 -->
                        <div class="main-bigpic">
                            <img src="${n}" alt="" class="bigpic">
                            <div class="main-bigpic-cover"></div>
                        </div>
                        <!-- 小图 -->
                        <div class="main-smallpic">
                            <div class="main-small">
                                <img src="${dt.pic01}" alt="" class="C05cca8 xiao">
                            </div>
                            <div class="main-small">
                                <img src="${dt.pic02}" alt="" class="xiao">
                            </div>
                            <div class="main-small">
                                <img src="${dt.pic03}" alt="" class="xiao">
                            </div>
                            <div class="main-small">
                                <img src="${dt.pic04}" alt="" class="xiao">
                            </div>
                            <div class="main-small">
                                <img src="${dt.pic05}" alt="" class="xiao">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-content-cover">
                    <img src="${n}" alt="" class="main_content_rightpic">
                </div>
                <div class="main-content-pic-r">
                    <div class="main-content-r-title">
                        <h2>${dt.title}</h2>
                        <p>${dt.textbox}</p>
                    </div>
                    <div class="main-content-r-price">
                        <span>参考价</span><i>￥</i><em>${dt.price}</em>
                        <br>
                        <p class="placard">
                            <u class="iconfont icon-icon_gantanhaozhong"></u> <span>具体成交价格根据商品参加活动或会员使用优惠券、积分等发生变化，最终以各渠道订单结算页价格为准</span>
                        </p>
                    </div>
                    <div class="main-content-r-by">
                        <button class="shop-btn">加入购物车</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ${dt.xiangqing}
    `;
        //把当前内容添加到大盒子中
        box.innerHTML = str;

        // 头部菜单
        var ps = document.querySelectorAll('.list li p');
        for (let i = 0; i < ps.length; i++) {
            ps[i].onmouseover = function() {
                ps[i].style.backgroundColor = '#fff'
                ps[i].style.color = '#0c5ca8'
            }
            ps[i].onmouseout = function() {
                ps[i].style.backgroundColor = '#f6f6f6'
                ps[i].style.color = '#444'
            }
        }

        // 放大镜
        // 获取左边大图盒子
        var main_bigpic = document.getElementsByClassName('main-bigpic');
        // 获取左边大图
        var main_bigpic_img = document.getElementsByClassName('bigpic');
        // 获取左边小图盒子
        var main_smallpic = document.getElementsByClassName('main-smallpic');
        // 获取左边所有小图
        var main_small = document.getElementsByClassName('xiao');
        // 获取右边大图盒子
        var main_content_cover = document.getElementsByClassName('main-content-cover');
        // 获取右边大图
        var main_content_rightpic = document.getElementsByClassName('main_content_rightpic');
        // 获取遮罩层
        var main_bigpic_cover = document.getElementsByClassName('main-bigpic-cover');
        for (let i = 0; i < main_small.length; i++) {
            main_small[i].onclick = function() {
                let a = main_small[i].getAttribute('src');
                let n = a.replace(/_60/, '');
                main_bigpic_img[0].removeAttribute('src');
                main_content_rightpic[0].removeAttribute('src');
                main_bigpic_img[0].setAttribute('src', n);
                main_content_rightpic[0].setAttribute('src', n);
                for (let j = 0; j < main_small.length; j++) {
                    main_small[j].className = 'xiao';
                }
                main_small[i].className = 'C05cca8 xiao';
            }
        };
        // 遮罩层与右边大盒子显示
        main_bigpic[0].onmouseover = function() {
            main_bigpic_cover[0].style.display = 'block';
            main_content_cover[0].style.display = 'block';
        };
        // 鼠标移动实现放大镜效果
        main_bigpic[0].onmousemove = function(e) {
            var e = e || window.event;
            //获取当前光标的移动距离
            var x1 = e.pageX - main_bigpic[0].offsetLeft - parseInt(main_bigpic_cover[0].offsetWidth / 2);
            var y1 = e.pageY - main_bigpic[0].offsetTop - parseInt(main_bigpic_cover[0].offsetWidth);
            //设置遮藏层的边界
            var minX = 0,
                minY = 0;
            var maxX = main_bigpic[0].clientWidth - main_bigpic_cover[0].clientWidth;
            maxY = main_bigpic[0].clientHeight - main_bigpic_cover[0].clientHeight;
            //右边图片的移动距离
            var rightX, rightY;
            //水平方向的判断，并且移动遮藏层
            if (x1 < minX) {
                main_bigpic_cover[0].style.left = minX + 'px'
                rightX = minX
            } else if (x1 > maxX) {
                main_bigpic_cover[0].style.left = maxX + 'px'
                rightX = maxX
            } else {
                main_bigpic_cover[0].style.left = x1 + 'px'
                rightX = x1
            }

            //垂直方向的判断
            if (y1 < minY) {
                main_bigpic_cover[0].style.top = minY + 'px'
                rightY = minY
            } else if (y1 > maxY) {
                main_bigpic_cover[0].style.top = maxY + "px"
                rightY = maxY
            } else {
                main_bigpic_cover[0].style.top = y1 + 'px'
                rightY = y1
            }

            //让右边的图片进行移动
            main_content_rightpic[0].style.left = -2 * rightX + 'px'
            main_content_rightpic[0].style.top = -2 * rightY + 'px'
        };
        // 遮罩层与右边大盒子隐藏
        main_bigpic[0].onmouseout = function() {
            main_bigpic_cover[0].style.display = 'none';
            main_content_cover[0].style.display = 'none';
        };

        //加入购物车
        var shop_btn = document.getElementsByClassName('shop-btn')[0];
        shop_btn.onclick = function() {
            // 获取localStorage中的cartList1
            var cartList = localStorage.getItem("cartList1")
                //判断当前获取的cartList是否存在
            if (cartList) {
                //把localStorage中获取的内容转为数组对象
                cartList = JSON.parse(cartList)
                var a = 0 //判断当前添加的商品是否在localStorage中存在
                    //遍历数组中所有元素啊
                cartList.forEach(item => {
                        //判断当前遍历的商品是否等于要添加的商品
                        if (item.id == dt.id) {
                            a++
                            item.number++
                        }
                    })
                    //判断a变量是否等于0
                if (a == 0) {
                    //修改商品数量
                    dt.number = 1
                        //把当前对象追加到数组中
                    cartList.push(dt)
                }
                //把当前商品添加到localStorage中
                localStorage.setItem("cartList1", JSON.stringify(cartList))
            } else {
                //修改当前商品数量
                dt['number'] = 1
                    //把当前商品添加到localStorage中
                localStorage.setItem("cartList1", JSON.stringify([dt]))
            }
        };
        // 头像的显示
        var name1 = getCookie("user");
        var user = document.querySelector('.user img');
        if (name1) {
            user.src = "img/user.webp"
        } else {
            user.src = "img/nouser.png"
            user.onmouseover = function() {
                user.src = "img/userhover.png"
            }
            user.onmouseout = function() {
                user.src = "img/nouser.png"
            }

        };
        // 显示二维码
        var ewm = document.querySelector('.ewm');
        var erweima = document.querySelector('.erweima');
        ewm.onmouseover = function() {
            erweima.style.display = 'block';
        };
        ewm.onmouseout = function() {
            erweima.style.display = 'none';
        };
    })()
} else {
    alert("你还没选中商品")
    location = "./list.html"
}