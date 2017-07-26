// 比价搜索&白菜价部分 end  by-谢建军

categoryList()
// 封装的比价搜索左侧列表大分类内容的函数 start
function categoryList() {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcategorytitle',
        success: function (data) {
            var result = template('categorytitle', data);
            $('.Parity-categorytitle').html(result);
            $('.Parity-categorytitle li').eq(0).addClass('curr');
            category(0)
            var ParityBodyLeft = null;
            ParityBodyLeft = new Swiper('.MM-Parity-body-left', {
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊
            });
        }

    })
}
// 封装的比价搜索左侧列表大分类内容的函数 start

// 封装的比价搜索ajax请求商品分类内容的函数 start
function category(_id) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getcategory',
        data: {
            titleid: _id
        },
        success: function (data) {
            var result = template('category', data);
            $('.Parity-category').html(result)
            var ParityBodyRight = null;
            ParityBodyRight = new Swiper('.MM-Parity-body-right', {
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊
            });
        }
    })
}
// 封装的比价搜索ajax请求商品分类内容的函数 start

// 分类列表，点击加载该分类商品分类列表 start
$('.Parity-categorytitle').on('click', 'li', function () {
    category(this.dataset.id);
    $(this).addClass('curr').siblings().removeClass('curr');
    $('.category-title').html($(this).children('a').text());
})
// 分类列表，点击加载该分类商品分类列表 end

// 商品分类列表点击跳转商品列表 start
$('.Parity-category').on('click', 'li', function () {
    $('.prev-page').attr('data-categoryid', this.dataset.id);
    $('.next-page').attr('data-categoryid', this.dataset.id);
    addShopList(this.dataset.id, 1);
})
// 商品分类列表点击跳转商品列表 end

// 事件委托的方式实现商品列表底部的翻页器功能 start
$('.page-container').on('click', 'div', function () {
    var $this = $(this);
    var changeNo = $('.page-num span').eq(0).text();
    var totalNo = $('.page-num span').eq(1).text();
    if ($this.hasClass('prev-page')) {
        changeNo--;
        if (changeNo < 1) return;
        $('.page-num span').eq(0).text(changeNo);
        addShopList(this.dataset.categoryid, changeNo)
    } else {
        changeNo++;
        if (changeNo > totalNo) return;
        $('.page-num span').eq(0).text(changeNo);
        addShopList(this.dataset.categoryid, changeNo)
    }
})
// 事件委托的方式实现商品列表底部的翻页器功能 start

// 商品列表翻页并请求内容的函数 start
function addShopList(_id, pageSize) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getproductlist',
        data: {
            categoryid: _id,
            pageid: pageSize
        },
        success: function (data) {
            $('.page-num span').eq(1).html(Math.ceil(data.totalCount / 10))
            console.log(data);
            var result = template('MM-Parity-com-body-ul', data)
            $('.MM-Parity-com-body-ul').html(result)
            $('.MM-Parity-com').css({
                transform: 'none'
            })
            var ParityBodyRight = null;
            ParityBodyRight = new Swiper('.MM-Parity-com', {
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊

            });
        }
    })
}
// 商品列表翻页并请求内容的函数 start

// 比价搜索部分 end 

// 白菜价部分 start 
cabbageTitle();
// 顶部分类栏目ajax请求 start
function cabbageTitle() {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
        success: function (data) {
            var result = template('cabbageTitle', data)
            // console.log(result);
            $('.mm-cabbage-nav .swiper-wrapper').html(result).children('.swiper-slide').eq(0).addClass('curr');
            var mmCabbageNav = null;
            mmCabbageNav  = new Swiper('.mm-cabbage-nav', {
                slidesPerView: 5,
                paginationClickable: true,
                freeMode: true
            });
        }
    })
}
// 顶部分类栏目ajax请求 end

// 顶部分类栏点击实现 请求该目录下对应的商品列表信息
$('.mm-cabbage-nav').on('click', '.cabbage-title-nav', function () {
    $(this).addClass('curr').siblings().removeClass('curr')
    cabbageLister(this.dataset.id)
})

// 封装的 ajax请求商品列表信息 start
cabbageLister(0)

function cabbageLister(_id) {
    $.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
        data: {
            titleid: _id
        },
        success: function (data) {
            var result = template('mm-cabbage-template', data)
            $('.mm-cabbage-list .swiper-slide').html(result)
            var mmCabbageList = null;
            mmCabbageList = new Swiper('.mm-cabbage-list', {
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                roundLengths: true, //防止文字模糊
                observer:true
            });
        }
    })
}
// 封装的 ajax请求商品列表信息 start

// 白菜价部分 end 

// 比价搜索&白菜价部分 end  by-谢建军