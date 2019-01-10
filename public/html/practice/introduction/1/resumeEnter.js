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
    // 左右滑块颜色
    controlArrowColor:'#16BA9D',

    // 定义用于垂直和水平滚动的过渡效果。 它需要文件easings.min.js
    easing: 'easeInOut',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    //-----------------------------------------------------回调
    // 这个回调在页面结构生成后立即被触发
    afterRender: function () {
      // page4 透明背景
    },
    // 一旦用户离开某个节，过渡到新节，就会触发此回调。 返回“false”将在移动发生之前取消移动。
    onLeave: function (index, nextIndex, direction) {

    },

    // 滚动结束之后，一旦加载了节，就会触发回调
    afterLoad: function (anchorLink, index) {

    },

    // 一旦用户离开幻灯片转到另一个幻灯片，就会触发此回调，返回false将在移动发生之前取消移动。
    onSlideLeave: function (anchorLink,index,slideIndex,direction) {

    },

    // 滚动结束后，加载一个节的幻灯片后触发回调。
    afterSlideLoad: function (anchorLink,index,slideIndex) {
    }
  })
})