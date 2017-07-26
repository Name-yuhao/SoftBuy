/**
 * Created by qinnv on 2017/7/4.
 */
$(window).load(function(){
    $("#MM-nav>a:nth-child(1)").on("click",function(){
        history.back();
    })
   $.ajax({
            url:"http://139.199.192.48:9090/api/getsitenav",
            dataType:"json",
            success:function(data){
                $(".mm-nav").removeClass("cover");
                var navresult=template("MMnav",data);
                $("#MM-nav .mm-nav").html(navresult);
                var ndiv=$(".mm-nav>div");
                for(var i=0;i<ndiv.length;i++){
                    ndiv.eq(i).attr("index",i);
                }
                var sn=0;
                $(".mm-nav").on("click","div>span",function(){
                    sn++;
                    $(".shoucang").append($(this).parent().clone());
                    $(this).html("√").css("backgroundColor","gray").prop("disabled",true);
                    $(".shoucang>p").hide();
                    $(".shoucang>.qiuqiu").hide();
                    $(".shoucang div>span").html("x");
                })
                $(".shoucang").on("click","div>span",function(){
                    sn--;
                    $(this).parent().remove();
                    if(sn==0){
                        $(".shoucang>p").show();
                        $(".shoucang>.qiuqiu").show();
                    }
                    for(var i=0;i<ndiv.length;i++){
                        if(ndiv.eq(i).attr("index")==$(this).parent().attr("index")){
                            ndiv.eq(i).find("span").html("+").css("backgroundColor","#8caa31").prop("disabled",false);
                        }
                    }
                });
            }
        });
    var navSwiper = new Swiper ('#MM-nav .swiper-container', {
        pagination: '.nav-pagination',
    });
    $(".nav-pagination span").eq(0).html("商城");
    $(".nav-pagination span").eq(1).html("收藏");
    $("footer p a:nth-of-type(3)").on("click",function(){
        $("body").scrollTop(0);
    });
//球球永动机
    var lis=document.querySelectorAll(".qiuqiu ul li");
    var arr=["red","orange","yellow","green","blue","aqua","purple","#000"];
    var lih=lis[0].offsetHeight;
    var w=Math.sin(3.5*2*Math.PI/360)*lih+0.5;
    var spans=document.querySelectorAll(".qiuqiu span");
    for(var i=0;i<spans.length ;i++){
        spans[i].style.width=w*2+"px";
        spans[i].style.height=w*2+"px";
        spans[i].style.left=-w+"px";
        spans[i].style.bottom=-w+"px";
        spans[i].style.background="radial-gradient(at center,#fff,"+arr[i]+","+arr[i]+","+arr[i]+")";
        lis[i].style.transform="rotate("+(24.5-i*7)+"deg)";
        lis[i].style.animation="ani"+i+" 8s linear infinite";
        lis[i].style.borderColor=arr[i];
    }
})