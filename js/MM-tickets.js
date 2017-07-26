

//优惠券页面js--刘剑隆
$(function(){
    //打开优惠券页面，放送ajax请求显示的数据
    //申明countid

    $.ajax({
        url:"http://139.199.192.48:9090/api/getcoupon",
        success:function(data){
            var result=template("tickets-header",data);
            //console.log(result);
            //console.log(data);
            //追加到ul里面
            $(".contain-header >ul").append(result);
        },

    })

})


