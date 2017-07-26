/**
 * Created by lihailong on 2017/7/4.
 */
$(function () {
    //        ---------------------封装函数一商铺和地区部分发送ajax请求一------------------------
    var getJson = function (url, callback) {
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data) {
                return callback(data);
            }
        });
    }
//        ---------------------OVER------------------------
    //        ------------------------封装函数一商品列表详细信息发送ajax请求------------------------
    var getGoodsjson = function (url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            dataType: "jsonp",
            success: function (data) {
                return callback(data)
            }
        })
    }
//        ------------------------OVER------------------------

    //-----------------打开页面默认为京东shop  华北area 的商品列表
    getJson('http://139.199.192.48:9090/api/getgsshop', function (data) {
        idshop = data.result[0].shopId;//京东商铺
        console.log(idshop);
        getJson('http://139.199.192.48:9090/api/getgsshoparea', function (data) {
            idarea = data.result[0].areaId;//华北区域
            console.log(idarea);
            getGoodsjson("http://139.199.192.48:9090/api/getgsproduct", {
                shopid: idshop,
                areaid: idarea,
            }, function (data) {
                console.log(data);
                var res = template("singleTemp", data);
                $("#goods-list").append(res);
            })
        })
    })
    //-----------------打开页面默认为京东shop  华北area 的商品列表

//-------------------------------------------------------------------------
    //点击第一个三角形   商铺区域
    $(".single-box-hd li:eq(0) a").on("click", function () {
        $("#search-box").hide();
        $("#shop-list").html("");//点击触发后先清掉之前列表
        //发送ajax请求  数据回来  回调函数处理数据  渲染商铺列表
        getJson('http://139.199.192.48:9090/api/getgsshop', function (data) {
            console.log(data);
            var resShop = template("singleshopTemp", data);
            $("#shop-list").append(resShop);
        })
        //发送ajax请求  数据回来  回调函数处理数据  渲染商铺列表
        if ($(this).hasClass("icon-sort-down")) {
            $(this).removeClass("icon-sort-down").addClass("icon-sort-up");
            $(this).parent().siblings().children("a").removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#jd").fadeIn().siblings().hide();
        } else if ($(this).hasClass("icon-sort-up")) {
            $(this).removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#jd").hide();
        }
    })

    //点击商铺列表下方的列表项----START-----
    var clickShopid = 0;//声明变量 给返回的数据（data.result）作为下标来取对应的商铺/  给shopid赋值 在调用getGoodsjson函数时作为商铺id传进去
    $("#jd").on("click", "#shop-list li", function (e) {
        $(".single-box-hd li:eq(0) a").removeClass("icon-sort-up").addClass("icon-sort-down");
        $("#shop-list").html("");//清空列表
        $("#goods-list").html("");//清空商品内容
        clickShopid = e.target.getAttribute("index");//点哪一项商铺就获取他对应的index值 也正好是请求返回来的result数组的索引值
        getJson('http://139.199.192.48:9090/api/getgsshop', function (data) {
            console.log(data);
            console.log(clickShopid);
            console.log(data.result[clickShopid].shopName);
            console.log(e.target);
            $("#span1").html(data.result[clickShopid].shopName)//切换京东，一号店，天猫超市
        })
        getGoodsjson("http://139.199.192.48:9090/api/getgsproduct", {
            shopid: clickShopid,
            areaid: clickAreaid,
        }, function (data) {
            console.log(data);
            var res = template("singleTemp", data);
            $("#goods-list").append(res);
        })
    })
    //点击商铺列表下方的列表项----OVER-----
//-------------------------------------------------------------------------

    //点击第二个三角形   地方区域
    $(".single-box-hd li:eq(1) a").on("click", function () {
        $("#search-box").hide();
        $("#area-list").html("");//点击触发后先清掉之前列表
        //发送ajax请求  数据回来  回调函数处理数据
        getJson('http://139.199.192.48:9090/api/getgsshoparea', function (data) {
            console.log(data);
            var resArea = template("singleareaTemp", data);
            $("#area-list").append(resArea);
        })
        //发送ajax请求  数据回来  回调函数处理数据
        if ($(this).hasClass("icon-sort-down")) {
            $(this).removeClass("icon-sort-down").addClass("icon-sort-up");
            $(this).parent().siblings().children("a").removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#area").fadeIn().siblings().hide();
        } else if ($(this).hasClass("icon-sort-up")) {
            $(this).removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#area").hide();
        }
    });

    //点击区域列表项-----start-----
    var clickAreaid = 0;//声明变量 给返回的数据（data.result）作为下标来取对应的地区名/  给areaid赋值 在调用getGoodsjson函数时作为地区id传进去
    $("#area").on("click", "#area-list li", function (e) {
        $(".single-box-hd li:eq(1) a").removeClass("icon-sort-up").addClass("icon-sort-down");
        $("#area-list").html("");//清空列表
        $("#goods-list").html("");//清空商品内容
        clickAreaid = e.target.getAttribute("index");//点哪一个区域就获取他对应的index值 也正好是请求返回来的result数组的索引值
        getJson('http://139.199.192.48:9090/api/getgsshoparea', function (data) {
            console.log(data);
            $("#span2").html(data.result[clickAreaid].areaName.substr(0, 2))  //切换区域  注意要截取字符串前两位
        })
        getGoodsjson("http://139.199.192.48:9090/api/getgsproduct", {
            shopid: clickShopid,
            areaid: clickAreaid,
        }, function (data) {
            console.log(data);
            var res = template("singleTemp", data);
            $("#goods-list").append(res);
        })
    })
    //点击区域列表项-----over-----

    //点击第三个三角形  价格一元区域
    $(".single-box-hd li:eq(2) a").on("click", function () {
        $("#search-box").hide();
        if ($(this).hasClass("icon-sort-down")) {
            $(this).removeClass("icon-sort-down").addClass("icon-sort-up");
            $(this).parent().siblings().children("a").removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#price").fadeIn().siblings().hide();
        } else if ($(this).hasClass("icon-sort-up")) {
            $(this).removeClass("icon-sort-up").addClass("icon-sort-down");
            $("#price").hide();
        }
    });
    //页面滚动  触底加载刷新页面
    $(window).scroll(function () {
        var $goTop = $(".goTop");
        var $load = $(".load");
        var scrT = $(window).scrollTop();//页面滚动高度
        console.log(scrT);
        var conH = $(".single-layout").height()  //.layout容器高度  由设备和容器内的内容决定
        // console.log(conH);
        var bodyH = $("body").height()    //body高度   由设备决定
        // console.log(bodyH);
        //页面滚动的高度scrT + body的高度bodyH = 容器的高度conH
        //当 scrT >= conH - bodyH  时   滚动触底
        if (scrT >= conH - bodyH) {
            $load.show();
            $goTop.show();
            getGoodsjson("http://139.199.192.48:9090/api/getgsproduct", {
                shopid: Math.floor(Math.random() * 3),//随机店铺
                areaid: Math.floor(Math.random() * 7),//随机区域
            }, function (data) {
                $load.delay(1000).fadeOut();
                var res = template("singleTemp", data);
                $("#goods-list").append(res);
            })
        }
    })
    //点击箭头回到顶部
    $(".goTop").on("click", function () {
        $(window).scrollTop(0);
        $(this).hide();
    })

    //点击放大镜搜索框  弹出和隐藏搜索盒子
    var f = true;
    $("#searchBtn").on("click", function () {
        if (f) {
            $("#search-box").fadeIn();
            f = false;
        } else {
            $("#search-box").hide();
            f = true;
        }
    })
    //点击搜索  发ajax请求渲染页面
    $("#search-box #search-bar span").on("click", function () {
        $("#search-box").hide();
        $("#goods-list").html("");
        getGoodsjson("http://139.199.192.48:9090/api/getgsproduct", {
            shopid: Math.floor(Math.random() * 3),//随机店铺
            areaid: Math.floor(Math.random() * 7),//随机区域
        }, function (data) {
            var res = template("singleTemp", data);
            $("#goods-list").append(res);
        })
    })
    //点击返回箭头返回上一页
    $("#left").on("click", function () {
        history.back();
    })
})




