$ (function () {

  var swiperone = null;
// 主页面的3D swiper效果
  (function () {
    swiperone = new Swiper ('.index-container', {
      pagination: '#MM-bottomNav',
	  onTransitionEnd: function (swiper) {
 //       var spanIndex = swiper.activeIndex;
			console.log(swiper.activeIndex);
			$ ("#nav-ico>span").eq (swiper.activeIndex).addClass ("swiper-pagination-bullet-active").siblings ().removeClass ("swiper-pagination-bullet-active");		
//     防止在其他页面调出返回顶部按钮后，又左右滑到其他页面，该按钮应该消失
        $ (".back-top").css ("display", "none");
        //
        $ (".MM-Parity-com").css ({
          "transform": "translateX(100%)"
        });
      },
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      paginationClickable: true,
//       initialSlide :3
    });
	
  }) ();

  var loadingcount = sessionStorage.getItem ('loadingcount');
  //   倒计时
  (function () {

    function countDown () {
      var timeCount = +$ (".countDown").html ();
      $ (".jump").on ("click", function () {
        $ (".loading").css ("display", "none");

      })
      var countDownId1 = setInterval (function () {
        timeCount--;
        if (timeCount >= 1) {
          $ (".countDown").html (timeCount);
        }
        else {
          $ (".loading").css ("display", "none");
          clearInterval (countDownId1);
        }
      }, 1000)
    }

//   倒计时调用
    console.log (loadingcount);
    if (!loadingcount) {
      console.log ("123");
      countDown ();
      setTimeout (function () {
        sessionStorage.setItem ('loadingcount', 1);
//         sessionStorage.removeItem('loadingcount');
        loadingcount = sessionStorage.getItem ('loadingcount');
        console.log (loadingcount);
      }, 8000)
    }
    else {
      $ (".loading").css ("display", "none");
    }
  }) ();

//首页分类导航模板
  (function () {
    //底部导航默认增加样式
    $ ("#nav-ico>span").eq (0).addClass ("swiper-pagination-bullet-active")
    var flag = true;
    $ (".classify-item").eq (7).on ("click", function () {
      if (flag) {
        $ (".home-classify").addClass ("addHeight");
        flag = false;
      }
      else {
        $ (".home-classify").removeClass ("addHeight");
        flag = true;
      }
    })


  }) ();

//首页超值推荐加载请求
  (function () {
    function addrecomcontent () {
      $.ajax ({
        url: "http://139.199.192.48:9090/api/getmoneyctrl",
        data: {},
        success: function (data) {
          console.log (data.result);
          var result1 = template ("rContent", data);
          $ (".recom-items").append (result1);
        },
      })
    }

    addrecomcontent ();

  }) ();

//返回顶部按钮
  /*
    objDomStr:"类名或者id名的字符串
    哪里需要返回顶部，就添加哪个页面
   */
  function backTop (objDomStr) {

    $ (objDomStr).scroll (function () {
      var homescroll = $ (objDomStr).scrollTop ();
      //返回顶部按钮display
      console.log ($ (objDomStr).scrollTop ());
      var windowHeight = $ ("body").height () * 0.6;
//     console.log(windowHeight);
      if (homescroll >= windowHeight) {
        $ (".back-top").css ("display", "block");
        console.log ("33333");
      }
      else {
        $ (".back-top").css ("display", "none");
      }
      if (objDomStr === "#homePage") {
        //搜索框浮动
        var logoHeight = $ (".headerlogo").height ();
//     console.log(logoHeight);
        if (homescroll >= logoHeight) {
          var serTop = homescroll - logoHeight;
          $ ("#search-container").css ({
            "float": "left",
            'top': serTop,
            'left': '0',
          })
        }
        else {
          $ ("#search-container").css ({
            "float": "none",
            'top': 0,
            'left': '0',
          })
        }

      }


    })

    $ (".back-top").on ("click", function () {
      $ (objDomStr).animate ({scrollTop: 0}, 'ease');
    })
  }

  backTop ("#homePage");
  backTop ("#MM-countPage");


//点击搜索框弹出搜索页面
  function showSearch () {
    $ ("#search-container>input").on ("focus", function () {
      $ (".MM-searchPage").css ("display", "block");
    })
    $ (".backpre").on ("click", function () {
      $ (".MM-searchPage").css ("display", "none");
    })
  }

  showSearch ();

  function showSearchagain () {
    $ (".MM-searchPage").css ("display", "block");
  }

  if (loadingcount == 2) {
    showSearchagain ();
    loadingcount = 1;
  }


  // 比价搜索&白菜价部分 end  by-谢建军

  categoryList ()

// 封装的比价搜索左侧列表大分类内容的函数 start
  function categoryList () {
    $.ajax ({
      url: 'http://139.199.192.48:9090/api/getcategorytitle',
      success: function (data) {
        var result = template ('categorytitle', data);
        $ ('.Parity-categorytitle').html (result);
        $ ('.Parity-categorytitle li').eq (0).addClass ('curr');
        category (0)
        var ParityBodyLeft = null;
        ParityBodyLeft = new Swiper ('.MM-Parity-body-left', {
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
  function category (_id) {
    $.ajax ({
      url: 'http://139.199.192.48:9090/api/getcategory',
      data: {
        titleid: _id
      },
      success: function (data) {
        var result = template ('category', data);
        $ ('.Parity-category').html (result)
        var ParityBodyRight = null;
        ParityBodyRight = new Swiper ('.MM-Parity-body-right', {
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
  $ ('.Parity-categorytitle').on ('click', 'li', function () {
    category (this.dataset.id);
    $ (this).addClass ('curr').siblings ().removeClass ('curr');
    $ ('.category-title').html ($ (this).children ('a').text ());
  })
// 分类列表，点击加载该分类商品分类列表 end

// 商品分类列表点击跳转商品列表 start
  $ ('.Parity-category').on ('click', 'li', function () {
    $ ('.prev-page').attr ('data-categoryid', this.dataset.id);
    $ ('.next-page').attr ('data-categoryid', this.dataset.id);
    addShopList (this.dataset.id, 1);
  })
// 商品分类列表点击跳转商品列表 end

// 事件委托的方式实现商品列表底部的翻页器功能 start
  $ ('.page-container').on ('click', 'div', function () {
    var $this = $ (this);
    var changeNo = $ ('.page-num span').eq (0).text ();
    var totalNo = $ ('.page-num span').eq (1).text ();
    if ($this.hasClass ('prev-page')) {
      changeNo--;
      if (changeNo < 1) return;
      $ ('.page-num span').eq (0).text (changeNo);
      addShopList (this.dataset.categoryid, changeNo)
    } else {
      changeNo++;
      if (changeNo > totalNo) return;
      $ ('.page-num span').eq (0).text (changeNo);
      addShopList (this.dataset.categoryid, changeNo)
    }
  })
// 事件委托的方式实现商品列表底部的翻页器功能 start

// 商品列表翻页并请求内容的函数 start
  function addShopList (_id, pageSize) {
    $.ajax ({
      url: 'http://139.199.192.48:9090/api/getproductlist',
      data: {
        categoryid: _id,
        pageid: pageSize
      },
      success: function (data) {
        $ ('.page-num span').eq (1).html (Math.ceil (data.totalCount / 10))
        console.log (data);
        var result = template ('MM-Parity-com-body-ul', data)
        $ ('.MM-Parity-com-body-ul').html (result)
        $ ('.MM-Parity-com').css ({
          transform: 'none'
        })
        var ParityBodyRight = null;
        ParityBodyRight = new Swiper ('.MM-Parity-com', {
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
  cabbageTitle ();

// 顶部分类栏目ajax请求 start
  function cabbageTitle () {
    $.ajax ({
      url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
      success: function (data) {
        var result = template ('cabbageTitle', data)
        // console.log(result);
        $ ('.mm-cabbage-nav .swiper-wrapper').html (result).children ('.swiper-slide').eq (0).addClass ('curr');
        var mmCabbageNav = null;
        mmCabbageNav = new Swiper ('.mm-cabbage-nav', {
          slidesPerView: 5,
          paginationClickable: true,
          freeMode: true
        });
      }
    })
  }

// 顶部分类栏目ajax请求 end

  $ ('.fa-chevron-left').on ('click', function () {
    window.history.back ();
    loadingcount = sessionStorage.setItem ('loadingcount', 1);
  })
  $ ('.fa-search').on ('click', function () {
    loadingcount = sessionStorage.setItem ('loadingcount', 2);
    location.href = '../index.html';
  })


// 顶部分类栏点击实现 请求该目录下对应的商品列表信息
  $ ('.mm-cabbage-nav').on ('click', '.cabbage-title-nav', function () {
    $ (this).addClass ('curr').siblings ().removeClass ('curr')
    cabbageLister (this.dataset.id)
  })

// 封装的 ajax请求商品列表信息 start
  cabbageLister (0)

  function cabbageLister (_id) {
    $.ajax ({
      url: 'http://139.199.192.48:9090/api/getbaicaijiaproduct',
      data: {
        titleid: _id
      },
      success: function (data) {
        var result = template ('mm-cabbage-template', data)
        $ ('.mm-cabbage-list .swiper-slide').html (result)
        var mmCabbageList = null;
        mmCabbageList = new Swiper ('.mm-cabbage-list', {
          direction: 'vertical',
          slidesPerView: 'auto',
          mousewheelControl: true,
          freeMode: true,
          roundLengths: true, //防止文字模糊
          observer: true
        });
      }
    })
  }

// 封装的 ajax请求商品列表信息 start

// 白菜价部分 end

// 比价搜索&白菜价部分 end  by-谢建军

  (function () {
    $ (function () {
      $.ajax ({
        url: "http://139.199.192.48:9090/api/getbrandtitle",
        success: function (data) {
          var res = template ("brand-list", data);
          $ (".brand-nav .content").append (res);
          $ (".brand-nav .content a").on ("click", function () {
            //封装品牌内容的业务逻辑
            var $index = $ (this).index ();
            window.productIndex = $index;
            //修改热门title为对应品牌名字
            $ (".detail-page-tit h2").html (brandName[ $index ] + "哪个牌子好");
            // $(".detail-page-tit h2").html(data);
            (function () {
              $.ajax ({
                url: "http://139.199.192.48:9090/api/getbrand",
                data: {
                  brandtitleid: data.result[ $index ].brandTitleId
                },
                success: function (brandData) {
                  console.log ("以下是首页数据");
                  console.log (brandData);
                  $ (".brand-tit-list").addClass ("brand-hide");
                  $ (".brand-detail-page").removeClass ("brand-hide");
                  var id = data.result[ $index ].brandTitleId;
                  tenBrands (id, $index);
                }
              })
            } ())
          })
        }
      })

    })

    //封装十大品牌业务逻辑
    function tenBrands (id, index) {
      $.ajax ({
        url: "http://139.199.192.48:9090/api/getbrand",
        data: {
          brandtitleid: id
        },
        success: function (tenBrandsData) {
          console.log ("以下是十大品牌数据");
          console.log (tenBrandsData);
          var res = template ("tenBrands", tenBrandsData);
          $ (".detail-page-cont").append (res);
          rankingModify ();
          $ (".brand-ranking").removeClass ("brand-hide");
          rankingProduct (index);
          addIndex ();
        }
      })
    }

    //品牌排名修改
    function rankingModify () {
      var numBox = document.querySelectorAll (".num");
      for (var i = 0; i < numBox.length; i++) {
        numBox[ i ].innerHTML = i + 1;
      }
      numBox[ 1 ].style.backgroundColor = "#FF9314";
      numBox[ 2 ].style.backgroundColor = "#8ADF5B";
      for (var i = 3; i < 10; i++) {
        numBox[ i ].style.backgroundColor = "#C9C9C9";
      }
    }

    //渲染产品销量排行版块
    function rankingProduct (index) {
      $ (".ranking-title h2").html (brandName[ index ] + "产品销量排行");
      $ (".comment-title h3").html (brandName[ index ] + "产品最新评论");
      //ajax获取数据渲染
      $.ajax ({
        url: "http://139.199.192.48:9090/api/getbrandproductlist",
        data: {
          brandtitleid: index,
          limit: 4
        },
        success: function (data) {
          console.log ("以下是渲染产品销量排行的数据");
          console.log (data);
          var res = template ("brank-ranking-model", data);
          $ (".brand-ranking .ranking-content").append (res);
          picModify (data);
          data.result.length != 0 ? data.result : data.result = [ {
            productId: 2
          } ];
          //函数执行顺序是先读取形参，再执行函数体；
          data.result.length != 1 ? index : index = 0;
          commentRender (data.result[ index ].productId);
          window.ajaxAata = data;
        }
      })

    }

    //渲染产品销量排行----产品图片对应修复
    function picModify (picData) {
      var picBoxes = document.querySelectorAll (".item-pic");
      var len = picData.result.length;
      for (var i = 0; i < len; i++) {
        picBoxes[ i ].innerHTML = picData.result[ i ].productImg;
      }
    }

    //渲染评论列表
    function commentRender (productId) {
      // console.log(productId);
      //show the comment part
      $ (".brank-comment").removeClass ("brand-hide");
      $.ajax ({
        url: "http://139.199.192.48:9090/api/getproductcom",
        data: {
          productid: productId
        },
        success: function (data) {
          console.log ("以下是渲染评论的数据");
          console.log (data);
          var res = template ("comment-list", data);
          $ (".comment-content").append (res);
          productCommentTitleModify (window.ajaxAata);
          conmmentPicModify (window.ajaxAata);
        }
      })
    }

    //评论模块产品标题修改
    function productCommentTitleModify (backData) {
      var modifyTitleBoxes = document.querySelectorAll (".content-tit");
      for (var i = 0; i < 5; i++) {
        modifyTitleBoxes[ i ].innerHTML = backData.result[ i ].productName;
      }
    }

    //评论模块产品图片修改
    function conmmentPicModify (picData) {
      var picBox = document.querySelectorAll (".pic");
      for (var i = 4; i >= 0; i--) {
        picBox[ i ].innerHTML = picData.result[ i ].productImg;
      }
    }

    //模拟数据//////其实也可以用JS拆分字符串，好蠢
    var brandName = [ "平板电视", "液晶电视", "LED电视", "等离子电视", "3D电视", "智能电视", "网络电视", "空调", "变频空调", "中央空调", "移动空调", "嵌入式空调", "冷暖空调", "挂壁式空调", "单冷空调", "风管式空调", "家庭影院", "冰箱", "对开门冰箱", "迷你冰箱", "双门冰箱", "三门冰箱", "DVD高清播放器", "蓝光DVD播放器", "音响/音箱", "洗衣机", "滚筒洗衣机", "全自动洗衣机", "迷你洗衣机", "干衣机", "波轮洗衣机", "脱水机", "双缸洗衣机", "热水器", "燃气热水器", "空气能热水器", "电热水器", "电热水龙头", "即热式热水器", "太阳能热水器", "酒柜/冰吧/冷柜", "酒柜", "消毒柜", "手机", "智能手机", "直板手机", "翻盖手机", "安卓手机", "滑盖手机", "数码相机", "单反相机", "长焦相机", "单电相机" ]

    //获取商品详情页后台数据
    // function detailPageRender(indexNum) {
    //     $.ajax({
    //         url: "http://139.199.192.48:9090/api/getproduct",
    //         data: indexNum,
    //         success: function (data) {
    //             console.log("这是商品详情页后台数据");
    //             console.log(data);
    //         }
    //     })
    // }
    //
    // console.log("------------------------------------");
    // console.log(window.ajaxAata);
    // detailPageRender(indexNum);

    //cookies
    //包含商品ID
    // stor.cookie("ajaxData", window.ajaxAata, 3);
    // //包含被点击的商品索引
    // window.localStorage.setItem('hah', 'asdasd')
    // stor.cookie("ajaxClickedIndex", window.productIndex)

    //首页返回功能
    function addIndex () {
      var $tit =
          $ (".page-nav ul")
    }
  } ());

//品牌大全
//   点击返回首页
  $ ("#returnIndex").on ("click", function () {
    swiperone.slideTo (0, 500);
  })
//比价搜索链接
  $ (".compreprice").on ("click", function () {
    swiperone.slideTo (1, 500);
  })
//   链接到品牌大全
  $ (".brandTitle").on ("click", function () {
    swiperone.slideTo (2, 500);
  })
//   搜索框获得焦点
  $ ("input[type='search']").on ("focus", function () {
    showSearchagain ();
  })

//   登陆页面
  $ (window).load (function () {
    //手机号登录跳转
    //手机号登录跳转
    function phoneLogin () {
      //手机号登录跳转到登录页面
      $ (".phone-login").on ('click', function () {
        $ (".login-container").css ("transform", "translateZ(-5rem) rotateY(-90deg)");
        console.log ("2222");
        $ (".phone-login>p").css ({
          "color": "#fff",
          "backgroundColor": "#d33a31"
        })
        $ (".login-title").html ("手机号登录");
        $ (".input-password").attr ("placeholder", "请输入密码");
        $ (".login-code").css ("display", "none");
        $ (".login-input").eq (2).css ("display", "none");
        $ (".login-button").html ("登录");
        $ (".login-button").removeClass ("register-button");
      })
      //登录页面跳转到手机号登录
      $ (".fa-long-arrow-left").on ("click", function () {
        $ (".login-container").css ("transform", "rotateY(0) translateZ(-5rem)");
        $ (".login-register p").css ({
          "color": "#d33a31",
          "backgroundColor": "#fff"
        })
      });
      //手机号注册跳转到注册页面（登录页面内容修改）
      $ (".phone-register").on ('click', function () {
        $ (".login-container").css ("transform", "translateZ(-5rem) rotateY(-90deg)");
//       console.log("123");
        $ (".phone-register>p").css ({
          "color": "#fff",
          "backgroundColor": "#d33a31"
        })
        //修改登录页面内容变为注册页面
        $ (".login-title").html ("手机号注册");
        $ (".input-password").eq (0).attr ("placeholder", "请设置密码(至少六位数)");
        console.log ($ (".input-password"));
        $ (".input-password").eq (1).attr ("placeholder", "请再次输入密码)");
        $ (".login-code").css ("display", "block");
        $ (".login-input").eq (2).css ("display", "block");
        $ (".login-button").html ("注册");
        $ (".login-button").addClass ("register-button");
      })

      //点击其他登录方式图标的动态效果 已CSS样式
    }

    phoneLogin ();


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

    function loginRegister () {
      var flag = true;
      $ (".phone-login").on ("click", function () {
        flag = false;
        //     输入手机号验证
//       $(".login-button").unbind("click");


        $ (".login-button").on ("click", function () {
//       console.log($(".input-phone").val());
          if (flag == false) {
            $.ajax ({
              url: "./_api/checkPhone.php",
              data: {
                phone: $ (".input-phone").val ()
              },
              success: function (res) {
//               console.log(res);
                if (res) {
                  $.ajax ({
                    url: "../_api/checkPassword.php",
                    data: {
                      password: $ (".password-one").val (),
                    },
                    success: function (res2) {
//                     console.log(res2);
                      if (res2) {
                        ani ("登录成功")
                        //预留接口，使登录标签可用
                      }
                      else {
                        ani ("密码错误，请重新输入")
                      }
                    }
                  })
                }
                else {
                  ani ("手机号尚未注册")
                }
              }
            })


          }
        })
      })
      $ (".fa-long-arrow-left").on ("click", function () {
        flag = true;
        $ (".login-button").unbind ("click");
      })


      //注册手机号，输出验证码，记录密码
      //首先验证手机号是否可用
      $ (".phone-register").on ("click", function () {
        if (flag) {
          $ (".input-phone").on ("blur", function () {
            $.ajax ({
              url: "../_api/checkPhone.php",
              data: {
                phone: $ (".input-phone").val ()
              },
              success: function (res3) {
                if (!res3) {
                  ani ("手机号尚未注册，可以使用")
                  $ (".login-button").on ("click", function () {
                    $.ajax ({
                      url: "../_api/passwordregister.php",
                      data: {
                        password: $ (".password-one").val ()
                      },
                      type: "post",
                      success: function (res5) {
                        if (res5) {
                          $.ajax ({
                            url: "../_api/checkPassword.php",
                            data: {
                              password: $ (".password-two").val ()
                            },
//                          type:"post",
                            success: function (res6) {
                              if (res6) {
                                $.ajax ({
                                  url: "../_api/phoneregister.php",
                                  data: {
                                    phoneNum: $ (".input-phone").val ()
                                  },
                                  type: "post",
                                  success: function (res4) {
                                    console.log (res4);
                                    console.log ("手机号注册已成功");
                                  }
                                })
                                ani ("恭喜您，注册成功")
                              }
                              else {
                                ani ("两次密码不一致，请重新输入")
                              }
                            }
                          })
                        }
                      }


                    })
                  })
                }
                else {
                  ani ("手机号已注册")
                }
              }
            })
          })

        }


      })

      //获取验证码
      $ (".login-code .get-code").on ("click", function () {
        var arr = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
        var ma = "";
        for (var i = 0; i < 4; i++) {
          ma += arr[ Math.floor (Math.random () * 10) ];
        }
        $ (".login-code .code").val (ma);
      })


    }

    loginRegister ();


    function ani (text) {
      $ (".login-in>p").html (text).addClass ("cover");
      setTimeout (function () {
        $ (".login-in>p").removeClass ("cover");
      }, 3000)
    }
  })


})