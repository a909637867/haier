// 透明度轮播
(function() {
    // 切换的前一张图片
    var prevIndex;
    // 切换的后一张图片
    var nextIndex;
    // 图片的长度
    var len;
    // 设置定时器
    var id;
    // 调用init函数
    init();
    // 封装初始化函数
    function init() {
        // 将图片初始下标设置为0
        prevIndex = nextIndex = 0;
        // 获取图片的长度
        len = document.querySelectorAll('.list .item').length;
        // prev按钮
        document.querySelector('.prev').onclick = function() {
            slidePrev();
        };
        // next按钮
        document.querySelector('.next').onclick = function() {
            slideNext();
        };
        // 获取所有的bullet
        var bullets = document.querySelectorAll('.slider .pagination .bullet');
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].index = i;
            bullets[i].onclick = function() {
                prevIndex = nextIndex;
                nextIndex = this.index;
                slideTo(prevIndex, nextIndex);
            }
        }
        var slider = document.querySelector('.slider');
        var btns = document.querySelectorAll('.slider button');
        slider.onmouseover = function() {
            for (var i = 0; i < btns.length; i++) {
                btns[i].style.display = 'block';
            }
            stop();
        };
        slider.onmouseout = function() {
            for (var i = 0; i < btns.length; i++) {
                btns[i].style.display = 'none';
            }
            auto();
        };
        // 调用自动轮播auto函数
        auto();
    }
    // 处理点击prev按钮的动作
    function slidePrev() {
        prevIndex = nextIndex;
        nextIndex--;
        if (nextIndex === -1) {
            nextIndex = len - 1;
        };
        slideTo(prevIndex, nextIndex);
    }
    // 处理点击next按钮的动作
    function slideNext() {
        prevIndex = nextIndex;
        nextIndex++;
        if (nextIndex === len) {
            nextIndex = 0;
        };
        slideTo(prevIndex, nextIndex);
    }
    // 切换图片的核心内容
    function slideTo(prev, next) {
        // 焦点切换
        var lis = document.querySelectorAll('.list .item');
        var bullets = document.querySelectorAll('.slider .pagination .bullet');
        bullets[prev].className = 'bullet iconfont';
        bullets[next].className = 'bullet iconfont icon-double-circle';
        animate(lis[prev], {
            opacity: 0
        });
        animate(lis[next], {
            opacity: 100
        });
    }
    // 自动轮播
    function auto() {
        clearInterval(id);
        id = setInterval(function() {
            slideNext();
        }, 3000)
    }
    // 停止自动轮播
    function stop() {
        clearInterval(id);
    }
})()