/**
 * Created by Forever on 2017/7/5.
 */
$(function () {
$("#viewCity").on('click',function () {
    //alert($("#city").html());
    if($('.check_text').html()=='广东：有货'){
        $('.check_text').html($("#city").html());
    }else{
        $('.check_text').html("广东：有货");
    }
})
    //$("#disstorck").on('click',"li", function () {
    //
    //    //$('.check_text').hide();
    //    console.log("hahah");
    //    console.log($(this).html());
    //    //$('.check_text').html($(this).html());
    //})

    $('.footer-top a:eq(2)').on('click', function () {
        document.body.scrollTop = 0;
    })

    var proNum = $('.pro_num .num').html();
    function changeNum(param){
        if(param=='add'){
            proNum++;
            $('.pro_num .num').html(proNum);
        }else{
            proNum--;
            $('.pro_num .num').html(proNum);
        }
        var pro_price = +$('.discount').html().substring(0,4);
        console.log(pro_price);
        $('.pro_kg p:eq(0)').html('￥'+(pro_price*proNum).toFixed(2)+'元')
        $('.pay_left span:eq(0)').html($('.pro_num .num').html());
        $('.total_price').html('￥'+(pro_price*proNum-9.5).toFixed(2)+'元');


    }
    $('.minus').on('click',function () {
        if( proNum >=1){
            $('.minus').removeAttr('disabled');
            changeNum('minus');
        }  else{
            $(this).attr('disabled','true');
        }

    })
    $('.add').on('click',function () {
        changeNum('add');
    })

})