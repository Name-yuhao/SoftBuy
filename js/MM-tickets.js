

//�Ż�ȯҳ��js--����¡
$(function(){
    //���Ż�ȯҳ�棬����ajax������ʾ������
    //����countid

    $.ajax({
        url:"http://139.199.192.48:9090/api/getcoupon",
        success:function(data){
            var result=template("tickets-header",data);
            //console.log(result);
            //console.log(data);
            //׷�ӵ�ul����
            $(".contain-header >ul").append(result);
        },

    })

})


