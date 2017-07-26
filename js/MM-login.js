$(window).load(function () {
  //手机号登录跳转
  function phoneLogin () {
    //手机号登录跳转到登录页面
    $(".phone-login").on('click', function () {
      $(".login-container").css("transform","rotateY(-90deg)");
      $(".phone-login>p").css({
        "color":"#fff",
        "backgroundColor":"#d33a31"
      })
      $(".login-title").html("手机号登录");
      $(".input-password").attr("placeholder","请输入密码");
      $(".login-code").css("display","none");
      $(".login-input").eq(2).css("display","none");
      $(".login-button").html("登录");
      $(".login-button").removeClass("register-button");
    })
    //登录页面跳转到手机号登录
    $(".fa-long-arrow-left").on("click", function () {
      $(".login-container").css("transform","rotateY(0)");
      $(".login-register p").css({
        "color":"#d33a31",
        "backgroundColor":"#fff"
      })
      });
    //手机号注册跳转到注册页面（登录页面内容修改）
    $(".phone-register").on('click', function () {
      $(".login-container").css("transform","rotateY(-90deg)");
//       console.log("123");
      $(".phone-register>p").css({
        "color":"#fff",
        "backgroundColor":"#d33a31"
      })
      //修改登录页面内容变为注册页面
      $(".login-title").html("手机号注册");
      $(".input-password").eq(0).attr("placeholder","请设置密码(至少六位数)");
      console.log($(".input-password"));
      $(".input-password").eq(1).attr("placeholder","请再次输入密码)");
      $(".login-code").css("display","block");
      $(".login-input").eq(2).css("display","block");
      $(".login-button").html("注册");
      $(".login-button").addClass("register-button");
    })

    //点击其他登录方式图标的动态效果 已CSS样式
  }
  phoneLogin();

  //注册登录
  /**
   * 需求：
   * 1、判断是否是登录页面
   *    失去焦点判断手机号是否在已经储存的phone.json中
   *    失去焦点判断密码是否在储存的password.json中
   *    如果返回的都是true，那么允许登录跳转到主页面
   * 2、判断不是登录页面的话、
   *    失去焦点判断手机是否存在数据库中，否则继续
   *    输入密码、验证码，并将手机号和密码分别储存在数据库
   *    第一个输入密码储存，第二个输入密码，失去焦点后判断是否存在数据库中
   *    注册成功并返回登录页面
   */

  function loginRegister() {
    var flag = true;
    $(".phone-login").on("click", function () {
      flag = false;
      //     输入手机号验证
//       $(".login-button").unbind("click");


      $(".login-button").on("click", function () {
//       console.log($(".input-phone").val());
        if(flag == false) {
          $.ajax({
            url:"./_api/checkPhone.php",
            data:{
              phone:$(".input-phone").val()
            },
            success: function (res) {
//               console.log(res);
              if(res) {
                $.ajax({
                  url:"../_api/checkPassword.php",
                  data: {
                    password:$(".password-one").val(),
                  },
                  success: function (res2) {
//                     console.log(res2);
                    if(res2) {
                      ani("登录成功")
                      //预留接口，使登录标签可用
                    }
                    else {
                      ani("密码错误，请重新输入")
                    }
                  }
                })
              }
              else {
               ani("手机号尚未注册")
              }
            }
          })


        }
      })
    })
    $(".fa-long-arrow-left").on("click", function () {
      flag = true;
      $(".login-button").unbind("click");
    })



    //注册手机号，输出验证码，记录密码
    //首先验证手机号是否可用
    $(".phone-register").on("click", function () {
      if(flag){
        $(".input-phone").on("blur", function () {
          $.ajax({
            url:"../_api/checkPhone.php",
            data:{
              phone:$(".input-phone").val()
            },
            success: function (res3){
              if(!res3){
                ani("手机号尚未注册，可以使用")
                $(".login-button").on("click", function () {
                  $.ajax({
                    url:"../_api/passwordregister.php",
                    data:{
                      password:$(".password-one").val()
                    },
                    type:"post",
                    success: function (res5) {
                      if(res5){
                        $.ajax({
                          url:"../_api/checkPassword.php",
                          data:{
                            password:$(".password-two").val()
                          },
//                          type:"post",
                          success: function (res6) {
                            if(res6){
                              $.ajax({
                                url:"../_api/phoneregister.php",
                                data:{
                                  phoneNum:$(".input-phone").val()
                                },
                                type:"post",
                                success: function (res4) {
                                  console.log(res4);
                                  console.log("手机号注册已成功");
                                }
                              })
                              ani("恭喜您，注册成功")
                            }
                            else {
                              ani("两次密码不一致，请重新输入")
                            }
                          }
                        })
                      }
                    }


                  })
                })
              }
              else{
                ani("手机号已注册")
              }
            }
          })
        })

      }




    })

    //获取验证码
    $(".login-code .get-code").on("click",function(){
      var arr=[0,1,2,3,4,5,6,7,8,9];
      var ma="";
      for(var i=0;i<4;i++){
        ma+=arr[Math.floor(Math.random()*10)];
      }
      $(".login-code .code").val(ma);
    })




  }
  loginRegister();


  function ani(text){
    $(".login-in>p").html(text).addClass("cover");
    setTimeout(function(){
      $(".login-in>p").removeClass("cover");
    },3000)
  }
})