$(window).load(function(){
    $("#MM-count>a:nth-child(1)").on("click",function(){
        history.back();
    })
    $("footer p a:nth-of-type(3)").on("click",function(){
        $("body").scrollTop(0);
    });
    var countSwiper = new Swiper ('#MM-count .swiper-container', {
        //direction: 'vertical',
        //loop: true,
        // 如果需要分页器
        pagination: '#MM-count .swiper-pagination',
    });
    $("#MM-count .swiper-pagination span").eq(0).html("海淘折扣");
    $("#MM-count .swiper-pagination span").eq(1).html("国内折扣");
    $.ajax({
        url:"http://139.199.192.48:9090/api/getinlanddiscount",
        dataType:"json",
        success:function(data){
            var result=template("mmcount",data);
            $("#MM-count .swiper-slide:nth-of-type(2)").html(result);
        }
    });
    var i=1;
    var totalpage
    $("#MM-count .swiper-slide:nth-of-type(1) li:nth-of-type(1)").on("click",function(){
        if(i<=1){
            $(this).prop("disabled",true).css("opacity",0);
            return;
        }
        i--;
        $(this).next().next().prop("disabled",false).css("opacity",1)
        getmmcount();
    }).next().next().on("click",function(){
        if(i>=totalpage){
            $(this).prop("disabled",true).css("opacity",0);
            return;
        }
        i++;
        $(this).prev().prev().prop("disabled",false).css("opacity",1)
        getmmcount();
    })

    getmmcount();
    function getmmcount(){
        $("body").addClass("cover");
        $.ajax({
            url:"http://139.199.192.48:9090/api/getmoneyctrl",
            dataType:"json",
            data:{pageid:i},
            success:function(data){
                $("body").removeClass("cover");
                var result=template("mmcount1",data);
                result+=result;
                $("#MM-count .swiper-slide1").html(result);
                totalpage=Math.ceil(data.totalCount/10);
                $("#MM-count .swiper-slide:nth-of-type(1) li span:nth-of-type(1)").html(i);
                $("#MM-count .swiper-slide:nth-of-type(1) li span:nth-of-type(2)").html(totalpage);
            }
        })
    }

})