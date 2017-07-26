/**
 * Created by tyh on 2017/7/4.
 */
//优惠券子页面js--刘剑隆
$(function(){

    //获取url ?后面的值
    var countid= location.search.replace(/\?/ig,"").split("=")[1];
    console.log(countid);

    //跳转到优惠券闲情页面，根据传过来的couponid 发送ajax请求
    $.ajax({
        url:"http://139.199.192.48:9090/api/getcouponproduct",
        type:"get",
        data:{couponid:countid},
        success:function(data){
            console.log(data);
            var result=template("tickets-son-list",data);
            //根据请求的数据写入列表
            $("#MM-tickets-son .contain-bottom .items").append(result);
            //根据请求的数据生成轮播图
            var result2=template("tickets-son-banner",data)
            $(".tickets-son-banner .swiper-wrapper").append(result2);
        }


    })
    $.ajax({
        url:"http://139.199.192.48:9090/api/getcoupon",
        success:function(data){
            //console.log(data);
            //console.log(data.result[countid]);
            $("#MM-tickets-son .contain-top >p").html(data.result[countid].couponTitle+"优惠券");
            $("#MM-tickets-son .contain-bottom .bottom-nav a:eq(2)").html(data.result[countid].couponTitle+"优惠券")
        },

    })



})