$(function () {
    searchProduct(1);
});
var pageid=1;
var totalPage;
function searchProduct(pageid){
    $.ajax({
        url: "http://139.199.192.48:9090/api/getmoneyctrl",
        type: 'get',
        async: 'false',
        data:{'pageid':pageid},
        success: function (data) {
            totalPage=Math.ceil(data.totalCount / data.pagesize);
            $("#totalPage").val(pageid+"/"+totalPage);
            $.each(data.result, function (i, item) {
                var html = ' <li id="' + item.productId + '">';
                html += '<a>';
                html += '<div class="pro_pic">' + item.productImgSm + '</div>';
                html += '<div class="pro_info">';
                html += '<p class="pro_title">' + item.productName + '</p>';
                html += ' <p class="pro_price">' + item.productPinkage + '</p>';
                html += '<div class="other">';
                html += '<span>' + item.productFrom + '&nbsp;|&nbsp' + item.productTime + '</span>';
                html += '<span><i class="fa fa-commenting-o"></i>' + item.productComCount + '</span>';
                html + '</div></div></a></li>';
                $("#productList").append(html);
            })

            $('#productList li').click(function () {
                var $this = $(this);
                var productsId = $this.attr("id");
                window.location.href="more_info.html?id="+productsId;
            })

        }

    })
}
function changgePage(param){
    if(param=='next'){
        pageid++;
        if(pageid==totalPage){
            $('.save_footer div:last-child').css('color','black').attr("disabled");
        }
        $('.save_footer div:first-child').css('color','#32cd32').removeAttr('disabled');
    }else{

        pageid--;
        if(pageid==1){
            $('.save_footer div:first-child').css('color','black').attr("disabled");
        }
        if(pageid!=totalPage){
            $('.save_footer div:last-child').css('color','#32cd32').removeAttr('disabled');
        }
    }
    $("#productList").empty();
    searchProduct(pageid);
}

$('.save_header span').click(function () {
    $('.save_update').show();
})
$('.save_update ul li').click(function () {
    location.reload();
})
//back to top;
$('.footer-top a:eq(2)').on('click', function () {
    document.body.scrollTop = 0;
})

