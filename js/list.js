var name1 = getCookie("user");
var user = document.querySelector('.user img');
if (name1) {
    user.src = "img/user.webp"
} else {
    user.src = "img/nouser.png"
};
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

// 分页器 
// 获取操作对象
var row = document.querySelector('.rows');
var pagination1 = document.querySelector('.pagination');
(async function() {
    var dt = await promiseAjax({
            url: 'php/list.php',
            datatype: 'json'
        })
        //创建分页器对象
    new Pagination(pagination1, {
        pageInfo: {
            pagenum: 1,
            pagesize: 32,
            totalsize: dt.length,
            totalpage: Math.ceil(dt.length / 32)
        },
        textInfo: {
            first: '首页',
            prev: "上一页",
            next: "下一页",
            last: "尾页"
        },
        cb(m) {
            //获取当前页需要显示的数据
            var ar1 = dt.slice((m - 1) * 32, m * 32)
                //创建拼接所有数据的字符串
            var str = ''
                // 遍历当前ar1数组中所有的数据
            ar1.forEach(item => {
                str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
            })
            row.innerHTML = str
        }
    })
})()


// 分类
var tool_list_li = document.querySelectorAll('.tool-list li')
var n = 1;
for (let i = 0; i < tool_list_li.length; i++) {
    tool_list_li[i].onclick = function() {
        for (let j = 0; j < tool_list_li.length; j++) {
            tool_list_li[j].className = ''
        }
        n++;
        if (i != 0) {
            if (n % 2 == 0) {
                tool_list_li[i].className = 'down iconfont icon-xia'
            } else {
                tool_list_li[i].className = 'down iconfont icon-shang'
            }
        } else {
            tool_list_li[i].className = 'down'
        }
    }
}

// 获取大盒子
var main = document.querySelector('#main');
var i = 1;
// 给大盒子添加点击事件
main.onclick = function(e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    // 点击对象为综合
    if (target.innerHTML == "综合") {
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/list.php',
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str
                }
            })
        })()
    };
    // 点击对象为人气
    if (target.innerHTML == "人气") {
        // 请求的次数
        i++;
        // 最低价格
        var di = document.querySelector('[name="username"]').value;
        // 最高价格
        var gao = document.querySelector('[name="password"]').value;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                url: 'php/renqi.php',
                data: `name=${i}&username=${di}&password=${gao}`,
                datatype: 'json'
            });
            //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                    <div class="main-box">
                                    <div class="main-shop-pic">
                                        <a href="details.html?id=${item.id}" target="_blank">
                                            <img src="${item.pic}" alt="">
                                        </a>
                                    </div>
                                    <div class="main-shop-title">
                                        <a href="${item.titleURL}">
                                            <h3>${item.title}</h3>
                                        </a>
                                        <p>${item.textbox}</p>
                                    </div>
                                    <div class="main-shop-price">
                                        <p class="jiage">
                                            <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                        </p>
                                        <a href="${item.interactionURL}">
                                        <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                        </a>
                                    </div>
                                </div>  
                                `
                    })
                    row.innerHTML = str
                }
            })
        })()
    }
    // 点击对象为价格
    if (target.innerHTML == "价格") {
        i++;
        var di = document.querySelector('[name="username"]').value;
        var gao = document.querySelector('[name="password"]').value;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                url: 'php/rank.php',
                data: `name=${i}&username=${di}&password=${gao}`,
                datatype: 'json'
            });
            //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                    <div class="main-box">
                                    <div class="main-shop-pic">
                                        <a href="details.html?id=${item.id}" target="_blank">
                                            <img src="${item.pic}" alt="">
                                        </a>
                                    </div>
                                    <div class="main-shop-title">
                                        <a href="${item.titleURL}">
                                            <h3>${item.title}</h3>
                                        </a>
                                        <p>${item.textbox}</p>
                                    </div>
                                    <div class="main-shop-price">
                                        <p class="jiage">
                                            <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                        </p>
                                        <a href="${item.interactionURL}">
                                        <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                        </a>
                                    </div>
                                </div>  
                                `
                    })
                    row.innerHTML = str
                }
            })
        })()
    }
    // 价格范围
    if (target.innerHTML == "确定") {
        var di = document.querySelector('[name="username"]').value;
        var gao = document.querySelector('[name="password"]').value;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/price_range.php',
                    data: `username=${di}&password=${gao}`,
                    datatype: 'json'
                })
                //创建分页器对象

            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                    if (ar1.length > 0) {
                        var len = dt.length;
                        //创建拼接所有数据的字符串
                        var len = dt.length;
                        var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                        var str = ''
                            // 遍历当前ar1数组中所有的数据
                        ar1.forEach(item => {
                            str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                        })
                        row.innerHTML = str1 + str
                    } else {
                        var str2 = `
                                <div id="shopNo">
                                    <div id="noshop">
                                        <img src="img/shop-kong.webp">
                                        <p>抱歉，没有找到相关产品</p>
                                    </div>
                                    <div id="silimarPro">
                                        <h2>相似产品</h2>
                                        <div class="silimar-shop">
                                        <div class="shop-prev"><span class="iconfont">&#xe732;</span></div>
                                        <div class="shop-next"><span class="iconfont">&#xe731;</span></div>
                                            <ul class="shop-lists">
                                                <div class="silimarPro-list shows">
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='1'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201028383683175204_350.png" alt="">
                                                        </a>
                                                        <h3>496升风冷变频十字对开门冰箱<h3>
                                                        <p>BCD-496WSEBU1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='2'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201109359844883083_350.png" alt="">
                                                        </a>
                                                        <h3>331升风冷变频多门冰箱<h3>
                                                        <p>BCD-331WLHFD78D9U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='3'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027342998469012_350.png" alt="">
                                                        </a>
                                                        <h3>481升风冷变频十字对开门冰箱<h3>
                                                        <p>BCD-481WGHTDD9D9U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='4'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027507635559778_350.png" alt="">
                                                        </a>
                                                        <h3>506升风冷变频多门冰箱<h3>
                                                        <p>BCD-506WSEBU1<p>
                                                    </div>
                                                </li>
                                                </div>
                                                <div class="silimarPro-list">
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='5'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201029478664582110_350.png" alt="">
                                                        </a>
                                                        <h3>601升风冷变频对开门冰箱<h3>
                                                        <p>BCD-601WLHSS17B2U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='6'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027356125879334_350.png" alt="">
                                                        </a>
                                                        <h3>651升风冷变频对开门冰箱<h3>
                                                        <p>BCD-651WLHSS6ED9<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='7'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201110485942108837_350.png" alt="">
                                                        </a>
                                                        <h3>376升风冷变频多门冰箱<h3>
                                                        <p>BCD-376WFPB<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='8'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201127339900910258_350.png" alt="">
                                                        </a>
                                                        <h3>486升风冷变频多门冰箱<h3>
                                                        <p>BCD-486WFBG<p>
                                                    </div>
                                                </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                `;
                        row.innerHTML = str2;
                        pagination1.innerHTML = '';
                        // 图片切换
                        // 获取图片的左右按钮
                        var shop_prev = document.querySelector('.shop-prev');
                        var shop_next = document.querySelector('.shop-next');
                        // 获取图片盒子
                        var shop_lists = document.querySelector('.shop-lists');
                        shop_prev.onclick = function() {
                            shop_lists.style = "transform: translate(0px);transition: all .5s linear;"
                        }
                        shop_next.onclick = function() {
                            shop_lists.style = "transform: translate(-916px);transition: all .5s linear;"
                        }
                    }
                }
            })
        })()
    }
    // 清空
    if (target.innerHTML == "清空") {
        var di = document.querySelector('[name="username"]');
        var gao = document.querySelector('[name="password"]');
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        di.value = '';
        gao.value = '';
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/list.php',
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str
                }
            })
        })()
    }
    if (target.innerHTML == "对开门") {
        let j = 1;
        i++;
        // 最低价格
        var di = document.querySelector('[name="username"]').value;
        // 最高价格
        var gao = document.querySelector('[name="password"]').value;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                url: 'php/sort.php',
                data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                datatype: 'json'
            });

            //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "十字对开门") {
        let j = 2;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/sort.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "多门") {
        let j = 3;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/sort.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "三门") {
        let j = 4;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/sort.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "两门") {
        let j = 5;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/sort.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "单门") {
        let j = 6;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/sort.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "600升以上") {
        let j = 1;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "501-600升") {
        let j = 2;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "301-500升") {
        let j = 3;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "201-300升") {
        let j = 4;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "101-200升") {
        let j = 5;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
    if (target.innerHTML == "100升及以下") {
        let j = 6;
        i++;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/rongji.php',
                    data: `name=${i}&username=${di}&password=${gao}&num=${j}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                        //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                                <div class="main-box">
                                <div class="main-shop-pic">
                                    <a href="details.html?id=${item.id}" target="_blank">
                                        <img src="${item.pic}" alt="">
                                    </a>
                                </div>
                                <div class="main-shop-title">
                                    <a href="${item.titleURL}">
                                        <h3>${item.title}</h3>
                                    </a>
                                    <p>${item.textbox}</p>
                                </div>
                                <div class="main-shop-price">
                                    <p class="jiage">
                                        <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                    </p>
                                    <a href="${item.interactionURL}">
                                    <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                    </a>
                                </div>
                            </div>  
                            `
                    })
                    row.innerHTML = str1 + str
                }
            })
        })()
    }
};
// 获取搜索栏中的搜索键
var search_shop = document.querySelector('.search-shop');
// 获取搜索栏
var search_shops = document.querySelector('#search-shops');
search_shops.onfocus = function() {
    search_shops.placeholder = '';
};
search_shops.onblur = function() {
    search_shops.placeholder = '即烘即穿洗衣机';
};

search_shops.onkeydown = function(e) {
    var e = e || window.event;
    var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    if (keyCode == 13) {
        var search_val = search_shops.value;
        var row = document.querySelector('.rows');
        var pagination1 = document.querySelector('.pagination');
        (async function() {
            var dt = await promiseAjax({
                    url: 'php/search.php',
                    data: `name=${search_val}`,
                    datatype: 'json'
                })
                //创建分页器对象
            new Pagination(pagination1, {
                pageInfo: {
                    pagenum: 1,
                    pagesize: 32,
                    totalsize: dt.length,
                    totalpage: Math.ceil(dt.length / 32)
                },
                textInfo: {
                    first: '首页',
                    prev: "上一页",
                    next: "下一页",
                    last: "尾页"
                },
                cb(m) {
                    //获取当前页需要显示的数据
                    var ar1 = dt.slice((m - 1) * 32, m * 32)
                    if (ar1.length > 0) {
                        //创建拼接所有数据的字符串
                        var len = dt.length;
                        var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                        var str = '';
                        // 遍历当前ar1数组中所有的数据
                        ar1.forEach(item => {
                            str += `
                            <div class="main-box">
                               <div class="main-shop-pic">
                                   <a href="details.html?id=${item.id}" target="_blank">
                                       <img src="${item.pic}" alt="">
                                   </a>
                               </div>
                               <div class="main-shop-title">
                                   <a href="${item.titleURL}">
                                       <h3>${item.title}</h3>
                                   </a>
                                   <p>${item.textbox}</p>
                               </div>
                               <div class="main-shop-price">
                                   <p class="jiage">
                                       <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                                   </p>
                                   <a href="${item.interactionURL}">
                                   <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                                   </a>
                               </div>
                            </div>  `
                        })
                        row.innerHTML = str1 + str
                    } else {
                        var str2 = `
                                <div id="shopNo">
                                    <div id="noshop">
                                        <img src="img/shop-kong.webp">
                                        <p>抱歉，没有找到相关产品</p>
                                    </div>
                                    <div id="silimarPro">
                                        <h2>相似产品</h2>
                                        <div class="silimar-shop">
                                        <div class="shop-prev"><span class="iconfont">&#xe732;</span></div>
                                        <div class="shop-next"><span class="iconfont">&#xe731;</span></div>
                                            <ul class="shop-lists">
                                                <div class="silimarPro-list shows">
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='1'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201028383683175204_350.png" alt="">
                                                        </a>
                                                        <h3>496升风冷变频十字对开门冰箱<h3>
                                                        <p>BCD-496WSEBU1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='2'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201109359844883083_350.png" alt="">
                                                        </a>
                                                        <h3>331升风冷变频多门冰箱<h3>
                                                        <p>BCD-331WLHFD78D9U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='3'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027342998469012_350.png" alt="">
                                                        </a>
                                                        <h3>481升风冷变频十字对开门冰箱<h3>
                                                        <p>BCD-481WGHTDD9D9U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='4'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027507635559778_350.png" alt="">
                                                        </a>
                                                        <h3>506升风冷变频多门冰箱<h3>
                                                        <p>BCD-506WSEBU1<p>
                                                    </div>
                                                </li>
                                                </div>
                                                <div class="silimarPro-list">
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='5'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201029478664582110_350.png" alt="">
                                                        </a>
                                                        <h3>601升风冷变频对开门冰箱<h3>
                                                        <p>BCD-601WLHSS17B2U1<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='6'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201027356125879334_350.png" alt="">
                                                        </a>
                                                        <h3>651升风冷变频对开门冰箱<h3>
                                                        <p>BCD-651WLHSS6ED9<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='7'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201110485942108837_350.png" alt="">
                                                        </a>
                                                        <h3>376升风冷变频多门冰箱<h3>
                                                        <p>BCD-376WFPB<p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="box">
                                                        <a href="details.html?id='8'" target="_blank" class="imgbox">
                                                            <img src="https://image.haier.com/cn/cooling/W020201127339900910258_350.png" alt="">
                                                        </a>
                                                        <h3>486升风冷变频多门冰箱<h3>
                                                        <p>BCD-486WFBG<p>
                                                    </div>
                                                </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                `;
                        row.innerHTML = str2;
                        pagination1.innerHTML = '';
                        // 图片切换
                        // 获取图片的左右按钮
                        var shop_prev = document.querySelector('.shop-prev');
                        var shop_next = document.querySelector('.shop-next');
                        // 获取图片盒子
                        var shop_lists = document.querySelector('.shop-lists');
                        shop_prev.onclick = function() {
                            shop_lists.style = "transform: translate(0px);transition: all .5s linear;"
                        }
                        shop_next.onclick = function() {
                            shop_lists.style = "transform: translate(-916px);transition: all .5s linear;"
                        }
                    }
                }
            })
        })()
    }
};

// 查询
search_shop.onclick = function() {
    var search_val = search_shops.value;
    var row = document.querySelector('.rows');
    var pagination1 = document.querySelector('.pagination');
    (async function() {
        var dt = await promiseAjax({
                url: 'php/search.php',
                data: `name=${search_val}`,
                datatype: 'json'
            })
            //创建分页器对象
        new Pagination(pagination1, {
            pageInfo: {
                pagenum: 1,
                pagesize: 32,
                totalsize: dt.length,
                totalpage: Math.ceil(dt.length / 32)
            },
            textInfo: {
                first: '首页',
                prev: "上一页",
                next: "下一页",
                last: "尾页"
            },
            cb(m) {
                //获取当前页需要显示的数据
                var ar1 = dt.slice((m - 1) * 32, m * 32);
                if (ar1.length > 0) {
                    //创建拼接所有数据的字符串
                    var len = dt.length;
                    var str1 = `<div id="sNub">共找到产品：${len}件</div>`;
                    var str = ''
                        // 遍历当前ar1数组中所有的数据
                    ar1.forEach(item => {
                        str += `
                    <div class="main-box">
                    <div class="main-shop-pic">
                        <a href="details.html?id=${item.id}" target="_blank">
                            <img src="${item.pic}" alt="">
                        </a>
                    </div>
                    <div class="main-shop-title">
                        <a href="${item.titleURL}">
                            <h3>${item.title}</h3>
                        </a>
                        <p>${item.textbox}</p>
                    </div>
                    <div class="main-shop-price">
                        <p class="jiage">
                            <span>参考价：</span><span class='c005aaa f14'>￥${item.price}</span>
                        </p>
                        <a href="${item.interactionURL}">
                        <em><span class='c005aaa'>${item.interaction}</span><i class="iconfont icon-xiaoxi"></i><span class='c005aaa'></span></em>
                        </a>
                    </div>
                </div>  
                `
                    })
                    row.innerHTML = str1 + str
                } else {
                    var str2 = `
                    <div id="shopNo">
                        <div id="noshop">
                            <img src="img/shop-kong.webp">
                            <p>抱歉，没有找到相关产品</p>
                        </div>
                        <div id="silimarPro">
                            <h2>相似产品</h2>
                            <div class="silimar-shop">
                            <div class="shop-prev"><span class="iconfont">&#xe732;</span></div>
                            <div class="shop-next"><span class="iconfont">&#xe731;</span></div>
                                <ul class="shop-lists">
                                    <div class="silimarPro-list shows">
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='1'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201028383683175204_350.png" alt="">
                                            </a>
                                            <h3>496升风冷变频十字对开门冰箱<h3>
                                            <p>BCD-496WSEBU1<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='2'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201109359844883083_350.png" alt="">
                                            </a>
                                            <h3>331升风冷变频多门冰箱<h3>
                                            <p>BCD-331WLHFD78D9U1<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='3'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201027342998469012_350.png" alt="">
                                            </a>
                                            <h3>481升风冷变频十字对开门冰箱<h3>
                                            <p>BCD-481WGHTDD9D9U1<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='4'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201027507635559778_350.png" alt="">
                                            </a>
                                            <h3>506升风冷变频多门冰箱<h3>
                                            <p>BCD-506WSEBU1<p>
                                        </div>
                                    </li>
                                    </div>
                                    <div class="silimarPro-list">
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='5'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201029478664582110_350.png" alt="">
                                            </a>
                                            <h3>601升风冷变频对开门冰箱<h3>
                                            <p>BCD-601WLHSS17B2U1<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='6'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201027356125879334_350.png" alt="">
                                            </a>
                                            <h3>651升风冷变频对开门冰箱<h3>
                                            <p>BCD-651WLHSS6ED9<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='7'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201110485942108837_350.png" alt="">
                                            </a>
                                            <h3>376升风冷变频多门冰箱<h3>
                                            <p>BCD-376WFPB<p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="box">
                                            <a href="details.html?id='8'" target="_blank" class="imgbox">
                                                <img src="https://image.haier.com/cn/cooling/W020201127339900910258_350.png" alt="">
                                            </a>
                                            <h3>486升风冷变频多门冰箱<h3>
                                            <p>BCD-486WFBG<p>
                                        </div>
                                    </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `;
                    row.innerHTML = str2;
                    pagination1.innerHTML = '';
                    // 图片切换
                    // 获取图片的左右按钮
                    var shop_prev = document.querySelector('.shop-prev');
                    var shop_next = document.querySelector('.shop-next');
                    // 获取图片盒子
                    var shop_lists = document.querySelector('.shop-lists');
                    shop_prev.onclick = function() {
                        shop_lists.style = "transform: translate(0px);transition: all .5s linear;"
                    }
                    shop_next.onclick = function() {
                        shop_lists.style = "transform: translate(-916px);transition: all .5s linear;"
                    }
                }
            }
        })
    })()
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