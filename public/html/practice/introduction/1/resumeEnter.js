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
  $('#resume').fullpage({
      sectionsColor: ['transparent', 'transparent', '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],

      scrollingSpeed: 700,
      // 是否首尾相接
      // continuousVertical: true,
      normalScrollElementTouchThreshold: 5,
      // 导航条显示
      navigation: true,

      // 内容超出后是否出现滚动条
      scrollOverflow: false,
      // // 左右滑块循环
      loopHorizontal: false,
      // 左右滑块颜色
      controlArrowColor:'#16BA9D',
      // 导航栏设置
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
      menu: '#menu',
      easing: 'easeInOut',
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',

      // 页面渲染后回调
      afterRender: function () {
        // page4 透明背景
      },
      // 滚动触发后结束前回调
      onLeave: function (index, nextIndex, direction) {
      },

      // 滚动结束后回调
      afterLoad: function (anchorLink, index) {

      },

      // 水平滑块回调
      onSlideLeave: function (anchorLink,index,slideIndex,direction) {

      },

      // 水平滑块回调
      afterSlideLoad: function (anchorLink,index,slideIndex) {
      }
    }
  )
})