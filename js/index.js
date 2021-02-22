window.onload = function() {
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
    // （心选精品）获取所有的标题的li
    var boutique_list = document.querySelectorAll('.boutique-list .lists li');
    // （心选精品）获取所有li下的span标签
    var boutique_span = document.querySelectorAll('.boutique-list .lists li span');
    // （心选精品）获取所有的商品
    var boutique_article = document.querySelectorAll('.boutique-article');
    for (let i = 0; i < boutique_list.length; i++) {
        boutique_list[i].onclick = function() {
            for (let j = 0; j < boutique_span.length; j++) {
                boutique_span[j].className = ''
            }
            for (let k = 0; k < boutique_article.length; k++) {
                boutique_article[k].className = 'boutique-article'
            }
            boutique_span[i].className = 'cur'
            boutique_article[i].className = 'boutique-article show'
        }
    }
    // （人气排行）获取所有的商品
    var ranking_shops = document.querySelectorAll('.ranking-shops');
    // （人气排行）获取所有的li
    var ranking_list = document.querySelectorAll('.ranking-list .sons li');
    // （人气排行）获取所有li下的span标签
    var ranking_span = document.querySelectorAll('.ranking-list .sons li span');
    for (let i = 0; i < ranking_list.length; i++) {
        ranking_list[i].onclick = function() {
            for (let j = 0; j < ranking_span.length; j++) {
                ranking_span[j].className = ''
            }
            for (let k = 0; k < ranking_shops.length; k++) {
                ranking_shops[k].className = 'ranking-shops'
            }
            ranking_span[i].className = 'curs'
            ranking_shops[i].className = 'ranking-shops shows'
        }
    }
    // 显示二维码
    var ewm = document.querySelector('.ewm');
    var erweima = document.querySelector('.erweima');
    ewm.onmouseover = function() {
        erweima.style.display = 'block';
    };
    ewm.onmouseout = function() {
        erweima.style.display = 'none';
    };
    // 获取Swiper大盒子
    var swiper_container = document.querySelector('.swiper-container');
    // 获取Swiper大盒子左右按钮
    var swiper_btn_r = document.querySelector('.swiper-container .swiper-button-next');
    var swiper_btn_l = document.querySelector('.swiper-container .swiper-button-prev');
    var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    swiper_container.onmouseover = function() {
        swiper_btn_r.style.display = 'block';
        swiper_btn_l.style.display = 'block';
        mySwiper.autoplay.stop();
    }
    swiper_container.onmouseout = function() {
        swiper_btn_r.style.display = 'none';
        swiper_btn_l.style.display = 'none';
        mySwiper.autoplay.start();
    };
}