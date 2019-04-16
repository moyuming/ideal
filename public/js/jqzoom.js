(function ($) {
  $.fn.jqueryzoom = function (options) {
    var settings = {
      xzoom: 200,		//zoomed width default width
      yzoom: 200,		//zoomed div default width
      offset: 10,		//zoomed div default offset
      position: "right"  //zoomed div default position,offset position is to the right of the image
    }
    if (options) {
      $.extend(settings, options)
    }
    $(this).hover(function () {
      var imageLeft = $(this).get(0).offsetLeft
      var imageTop = $(this).get(0).offsetTop
      var imageWidth = $(this).get(0).offsetWidth
      var imageHeight = $(this).get(0).offsetHeight
      var imageStyle = document.defaultView.getComputedStyle(this)
      var imageBorderTopWidth = parseInt(imageStyle.borderTop.replace('px', ''))
      var imageBorderLeftWidth = parseInt(imageStyle.borderLeft.replace('px', ''))
      var imagePaddingTopWidth = parseInt(imageStyle.paddingTop.replace('px', ''))
      var imagePaddingLeftWidth = parseInt(imageStyle.paddingLeft.replace('px', ''))
      var bigimage = $(this).parent().attr("href")
      if ($("span.zxx_image_zoom_div").get().length == 0) {
        $(this).after("<span class='zxx_image_zoom_div'><img class='bigimg' src='" + bigimage + "'/></span>")
      }
      // 左边偏移
      if (settings.position == "right") {
        leftpos = imageLeft + imageWidth + settings.offset
      } else {
        // 在左边
        leftpos = imageLeft - settings.xzoom - settings.offset
      }
      $("span.zxx_image_zoom_div").css({top: imageTop, left: leftpos})
      $("span.zxx_image_zoom_div").width(settings.xzoom)
      $("span.zxx_image_zoom_div").height(settings.yzoom)
      $("span.zxx_image_zoom_div").show()
      $(document.body).mousemove(function (e) {
        // 计算宽高和倍数
        var bigwidth = $(".bigimg").get(0).offsetWidth
        var bigheight = $(".bigimg").get(0).offsetHeight
        var scaley = 'x'
        var scalex = 'y'
        if (isNaN(scalex) | isNaN(scaley)) {
          scalex = Math.round(bigwidth / imageWidth)
          scaley = Math.round(bigheight / imageHeight)
        }
        mouse = new MouseEvent(e)
        var scrolly = mouse.y - imageTop -imageBorderTopWidth - imagePaddingTopWidth - ($("span.zxx_image_zoom_div").height()*1/scaley)/2
        var scrollyMax = imageHeight - ($("span.zxx_image_zoom_div").height()*1/scaley)
        $("span.zxx_image_zoom_div").get(0).scrollTop = Math.min(scrollyMax, scrolly)*scaley
        var scrollx = mouse.x - imageLeft  - imageBorderLeftWidth - imagePaddingLeftWidth - ($("span.zxx_image_zoom_div").width()*1/scalex)/2
        var scrollxMax = imageWidth - ($("span.zxx_image_zoom_div").width()*1/scalex)
        $("span.zxx_image_zoom_div").get(0).scrollLeft = Math.min(scrollxMax, scrollx)*scalex
      })
    }, function () {
      $("span.zxx_image_zoom_div").hide()
      $(document.body).unbind("mousemove")
      $("span.zxx_image_zoom_div").remove()
    })
    //阻止默认点击事件
    $(this).click(function (e) {
      e.preventDefault()
    })
  }
})(jQuery)

function MouseEvent(e) {
  this.x = e.pageX
  this.y = e.pageY
}


