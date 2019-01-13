/*!
 *@Auther: moyumin
 *@Date: 2019/1/9
 **/
$(function () {
  // 淫贱的阻止页面选中效果
  document.onmousedown=function () {
    document.onmousemove=function () {
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
  }
  document.onmouseup=function () {
    document.onmousemove = null;
  }
  var $container = $('.portfolio-items');
  setTimeout(function () {
      //isotope分类过滤和排序插件
      $container.isotope({
          itemSelector : '.portfolio-items > div',
          animationOptions: {
              duration: 750,
              easing: 'linear',
              queue: true
          }
      });
  },1000)
  project_info();
  // 文档：https://github.com/alvarotrigo/fullPage.js/tree/master/lang/chinese
  $('#resume').fullpage({
    // -------------导航
    // 导航条显示
    navigation: true,
    // html中导航条的id
    menu: '#menu',
    // 导航栏锚点设置
    anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],

    // --------------设计
    // 每页的背景颜色
    sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],

    // --------------滚动
    // 滚动转换的速度（以毫秒为单位）
    scrollingSpeed: 700,
    // 定义html节点树的跳数阈值,Fullpage将测试normalScrollElement是否匹配，以允许在触摸设备上的div的滚动功能。
    normalScrollElementTouchThreshold: 5,
    // 定义在内容大于它的高度的情况下是否为节/幻灯片创建滚动。 当设置为true时，您的内容将被插件包装。 考虑使用委托或在afterRender回调中加载其他脚本。 如果设置为true，则需要库scrolloverflow.min.js
    scrollOverflow: false,
    // 定义水平滑块是否在到达上一张或上一张幻灯片后循环
    loopHorizontal: false,
    controlArrows: true,
    // 左右滑块颜色
    controlArrowColor:'#16BA9D',

    // 定义用于垂直和水平滚动的过渡效果。 它需要文件easings.min.js
    easing: 'easeInOut',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    //-----------------------------------------------------回调
    // 这个回调在页面结构生成后立即被触发
    afterRender: function () {
      // page4 透明背景
      $('item-4').css('background', 'rgba(255, 255, 255, .1)');
      //侧边导航事件
      var Tooltips = ['个人简历', '基本资料', '专业技能', '工作经历', '项目经验', '自我评价'];
      $("#fp-nav ul li").each(function (index) {
        this.dataset['toggle'] = 'tooltip';
        this.dataset['placement'] = 'left';
        $(this).attr('title', Tooltips[index])
      })
      $('[data-toggle="tooltip"]').tooltip();

      // 顶部导航栏自动会拉事件(移動端)
      if ($('.navbar-toggle').css('display') == 'block') {
        $('.navbar-collapse li').on('click', function () {
          $('.navbar-toggle').trigger('click');
        });
      }

      $('.item-1 .next-page').on('click', function () {
        $.fn.fullpage.moveSectionDown();
      });
      setTimeout(function () {
        $('.item-1 .corner').show();
        $('.resume-hide').show();
      }, 500);
    },
    // 一旦用户离开某个节，过渡到新节，就会触发此回调。 返回“false”将在移动发生之前取消移动。
    onLeave: function (from, to, direction) {
      var index = from.index
      var nextIndex = to.index
      if(nextIndex==3){
        $('.sky').show();
      }else{
        setTimeout(function () {
          $('.sky').hide();
        },500)
      }

      if(nextIndex==5){
        $('.pure').show();
        $('.item-6 .top').animate({'height': '50%'},400);
        $('.item-6 .foot').animate({'height': '50%'},400);
      }else {
        setTimeout(function () {
          $('.pure').hide();
        },500)

      }


      switch (index) {
        case 0:
          $('.item-1 .corner').hide();
          $('.resume-hide').hide();
          $('.navbar').removeClass('black');

          break;

        case 1:
          setTimeout(function () {
            $('.item-2 .container').hide();
          }, 500);
          break;

        case 2:
          setTimeout(function () {
            $('.item-3 .container').hide();
          }, 500);
          $('.navbar').removeClass('blue');
          break;

        case 3:
        {
          setTimeout(function () {
            $('.item-4 .container').hide();
          }, 500);
          break;
        }
      }
    },

    // 滚动结束之后，一旦加载了节，就会触发回调
    afterLoad: function (from, to) {
      var index = to.index
      var anchorLink = to.anchor
      if(index==5)
        $('.pure').show();

      switch (anchorLink) {
        case 'page1':
          $('.item-1 .corner').show();
          $('.resume-hide').show();
          $('.navbar').addClass('black');
          break;
        case 'page2':
          $('.item-2 .container').show();
          break;
        case 'page3':
          $('.navbar').addClass('blue');
          $('.item-3 .container').show();

          break;
        case 'page4':
          $('.item-4 .container').show();
          break;

        case 'page5':
          break;

        case 'page6':
          setTimeout(function () {
            $('.item-6 .top').animate({'height': '30%'},400);
            $('.item-6 .foot').animate({'height': '30%'},400);
          },500)

          break;
      }
    },

    // 一旦用户离开幻灯片转到另一个幻灯片，就会触发此回调，返回false将在移动发生之前取消移动。
    onSlideLeave: function (anchorLink,index,slideIndex,direction) {

    },

    // 滚动结束后，加载一个节的幻灯片后触发回调。
    afterSlideLoad: function (anchorLink,index,slideIndex) {
    }
  })
})