import $ from 'src/common/script/jquery.min.js'
$(document).ready(function() {
  var del=document.documentElement;
  var dialogdivcss=document.getElementsByClassName('dialog-1')[0].style;
  var navdivcss=document.getElementById('nav');
  var domCanHui = document.getElementsByClassName("canhui")[0];
  var computeRight = (domCanHui.currentStyle&&domCanHui.currentStyle.right) || document.defaultView.getComputedStyle(domCanHui,null).right;
  changePosition()
  //让顶部导航随滚动条一起滚动
  window.onscroll=function(){
    if(del.scrollLeft){
      var sl=-del.scrollLeft;
      navdivcss.style.left=sl+'px';
      dialogdivcss.left=sl+'px';
    }
  }
  window.onresize=function(){
    changePosition();
  }
  function changePosition() {
    var domWidth = document.documentElement.getBoundingClientRect().width;
    var minus = domWidth - 1920;
    if (minus > 0) {
      $(domCanHui).css({
        'right': 'calc(' + computeRight + ' + ' + 0.5 * minus + 'px)'
      });
      $(navdivcss).css({
        'left': 0.5 * minus + 'px'
      });
      dialogdivcss.left=0.5 * minus+'px';
    } else {
      $(domCanHui).css({
        'right': computeRight
      });
      $(navdivcss).css({
        'left':'0px'
      });
      dialogdivcss.left='0px';
    }
  }
  // 论坛简介事件
  $("#ltjj .tabs").delegate(".tab","click",function(event){
    const tabName=event.target.innerText;
    $(this).addClass('tab-selected').siblings().removeClass('tab-selected')
    if (tabName=='论坛宗旨'){
      $("#zhongzhi").show()
      $("#beijing").hide()

    }else {
      $("#zhongzhi").hide()
      $("#beijing").show()
    }
  });
  // 议程安排事件
  $("#ycan .tabs").delegate(".tab","click",function(event){
    const tabName=event.target.innerText;
    $(this).addClass('tab-selected').siblings().removeClass('tab-selected')
    /*if (tabName=='潮商精英高级研修班'){
      $("#tab1").show().siblings().hide();

    }else */
    if (tabName=='潮商投资发展联谊酒会'){
      $("#tab2").show().siblings().hide();
    }else{
      $("#tab3").show().siblings().hide();
    }
  });
  // 立即参会事件
  $('.join-btn,.canhui').click(function () {
    $('.dialog-1').css({
      visibility: 'visible'
    });
    $('body').css({
      'overflow-y': 'hidden'
    });
  })
  // 关闭对话框事件
  $('.close').click(function () {
    $('.dialog-1 form')[0].reset();
    $('.dialog-1').css({
      visibility: 'hidden'
    });
    $('body').css({
      'overflow-y': 'auto'
    });
  })

// 提交表单
  $('.join-btn-submit').click(function(){
    let url = "/ForumMeeting/dataSubmit.html";

    let _form = $('.dialog-1 form')[0]

    let params = {
      forum_name: '[{"name":"2018（首届）国际潮商投资基金发展论坛","price":1,"count":1}]',
      name: _form.name.value.replace(/\s/g, ''),
      company_name: _form.company_name.value.replace(/^\s+|\s+$/g, ''),
      mobile: _form.mobile.value.replace(/\s/g, ''),
      position: _form.position.value.replace(/\s/g, '')
    }
  })
});