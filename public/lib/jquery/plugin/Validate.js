/**
 * @Follow.js
 * @author zhangxinxu
 * @version
 * @Created: 15-06-25
 * @edited:  17-06-19
 */

(function (global, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory)
  } else {
    global.Follow = factory()
  }
}(this,
  function (require) {
    if (typeof require == 'function') {
      require('common/ui/Enhance')
    }

    /**
     * 绝对定位元素的定位效果
     * 针对所有浏览器
     * 自动含边界判断
     * 可用在DropDown, Tips等组件上
     * 支持链式调用和模块化调用
     * @example
     * $().follow(trigger, options);
     * new Follow(trigger, target, options);

     * 文档见：http://www.zhangxinxu.com/wordpress/?p=1328 position()方法
     **/

    $.fn.follow = function (trigger, options) {
      var defaults = {
        offsets: {
          x: 0,
          y: 0
        },
        // trigger-target
        position: '4-1',
        // 边缘位置自动调整
        edgeAdjust: true
      }

      var params = $.extend({},
        defaults, options || {})

      return $(this).each(function () {
        var target = $(this)

        if (trigger.length == 0) {
          return
        }
        var pos, triL, triT, tarL, tarT
        var triH = 0
        var triW = 0
        var tarH = target.data('height')
        var tarW = target.data('width')
        //缓存目标对象高度，宽度，提高鼠标跟随时显示性能，元素隐藏时缓存清除
        if (!tarH) {
          tarH = target.outerHeight()
        }
        if (!tarW) {
          tarW = target.outerWidth()
        }

        var st = $(window).scrollTop()
        var sl = $(window).scrollLeft()

        var offX = parseInt(params.offsets.x, 10) || 0
        var offY = parseInt(params.offsets.y, 10) || 0

        var winWidth = $(window).width()
        var winHeight = $(window).height()

        var position = params.position
        if (typeof position != 'string' && position.length == 2) {
          var left = position[0] + offX
          var top = position[1] + offY
          if (params.edgeAdjust == true) {
            if (left + tarW > winWidth + sl - 5) {
              left = winWidth + sl - 5 - tarW
            }
            if (top + tarH > winHeight + st - 5) {
              top = winHeight + st - 5 - tarH
            }
          }
          //浮动框显示
          target.css({
            position: 'absolute',
            left: left,
            top: top
          }).attr('data-align', '3-1')

          // z-index自动最高
          if (target.zIndex) {
            target.zIndex()
          }
          return
        }

        pos = trigger.offset()
        triH = trigger.outerHeight()
        triW = trigger.outerWidth()
        triL = pos.left
        triT = pos.top

        // 合法的位置关系数据
        var arrLegalPos = ['4-1', '1-4', '5-7', '2-3', '2-1', '6-8', '3-4', '4-3', '8-6', '1-2', '7-5', '3-2']
        // 设定的对齐关系
        var align = params.position
        // 是否对齐匹配的标志量
        var alignMatch = false
        // 确定定位的方向
        var strDirect

        // 遍历，以确定设定的对齐是否有匹配
        $.each(arrLegalPos,
          function (i, n) {
            if (n === align) {
              alignMatch = true

              return false
            }
          })

        // 如果没有匹配的对齐方式，使用默认的对齐方式
        if (!alignMatch) {
          align = defaults.position
        }

        // 确定定位方位，是上下左右的哪个
        var funDirect = function (a) {
          var dir = 'bottom'
          //确定方向
          switch (a) {
            case '1-4':
            case '5-7':
            case '2-3': {
              dir = 'top'
              break
            }
            case '2-1':
            case '6-8':
            case '3-4': {
              dir = 'right'
              break
            }
            case '1-2':
            case '8-6':
            case '4-3': {
              dir = 'left'
              break
            }
            case '4-1':
            case '7-5':
            case '3-2': {
              dir = 'bottom'
              break
            }
          }

          return dir
        }

        // 居中判断
        var funCenterJudge = function (a) {
          if (a === '5-7' || a === '6-8' || a === '8-6' || a === '7-5') {
            return true
          }

          return false
        }

        // 是否超出边界的判断
        var funJudge = function (dir) {
          var totalHeight = 0
          var totalWidth = 0

          // 4个方位分别判断
          if (dir === 'right') {
            totalWidth = triL + triW + tarW + offX
            if (totalWidth > $(window).width()) {
              return false
            }
          } else if (dir === 'bottom') {
            totalHeight = triT + triH + tarH + offY
            if (totalHeight > st + $(window).height()) {
              return false
            }
          } else if (dir === 'top') {
            totalHeight = tarH + offY
            if (totalHeight > triT - st) {
              return false
            }
          } else if (dir === 'left') {
            totalWidth = tarW + offX
            if (totalWidth > triL) {
              return false
            }
          }

          return true
        }

        //此时的方向
        strDirect = funDirect(align)

        //边缘过界判断
        if (params.edgeAdjust) {
          //根据位置是否溢出显示界面重新判定定位
          if (funJudge(strDirect)) {
            //该方向不溢出
            (function () {
              if (funCenterJudge(align)) {
                return
              }
              var obj = {
                top: {
                  right: '2-3',
                  left: '1-4'
                },
                right: {
                  top: '2-1',
                  bottom: '3-4'
                },
                bottom: {
                  right: '3-2',
                  left: '4-1'
                },
                left: {
                  top: '1-2',
                  bottom: '4-3'
                }
              }
              var o = obj[strDirect]
              var name
              if (o) {
                for (name in o) {
                  if (!funJudge(name)) {
                    align = o[name]
                  }
                }
              }
            })()
          } else {
            //该方向溢出
            (function () {
              if (funCenterJudge(align)) {
                var center = {
                  '5-7': '7-5',
                  '7-5': '5-7',
                  '6-8': '8-6',
                  '8-6': '6-8'
                }
                align = center[align]
              } else {
                var obj = {
                  top: {
                    left: '3-2',
                    right: '4-1'
                  },
                  right: {
                    bottom: '1-2',
                    top: '4-3'
                  },
                  bottom: {
                    left: '2-3',
                    right: '1-4'
                  },
                  left: {
                    bottom: '2-1',
                    top: '3-4'
                  }
                }
                var o = obj[strDirect]
                var arr = []
                for (var name in o) {
                  arr.push(name)
                }
                if (funJudge(arr[0]) || !funJudge(arr[1])) {
                  align = o[arr[0]]
                } else {
                  align = o[arr[1]]
                }
              }
            })()
          }
        }

        // 是否变换了方向
        var strNewDirect = funDirect(align)
        var strFirst = align.split('-')[0]

        //确定left, top值
        switch (strNewDirect) {
          case 'top': {
            tarT = triT - tarH
            if (strFirst == '1') {
              tarL = triL
            } else if (strFirst === '5') {
              tarL = triL - (tarW - triW) / 2
            } else {
              tarL = triL - (tarW - triW)
            }
            break
          }
          case 'right': {
            tarL = triL + triW
            if (strFirst == '2') {
              tarT = triT
            } else if (strFirst === '6') {
              tarT = triT - (tarH - triH) / 2
            } else {
              tarT = triT - (tarH - triH)
            }
            break
          }
          case 'bottom': {
            tarT = triT + triH
            if (strFirst == '4') {
              tarL = triL
            } else if (strFirst === '7') {
              tarL = triL - (tarW - triW) / 2
            } else {
              tarL = triL - (tarW - triW)
            }
            break
          }
          case 'left': {
            tarL = triL - tarW
            if (strFirst == '2') {
              tarT = triT
            } else if (strFirst === '6') {
              tarT = triT - (tarW - triW) / 2
            } else {
              tarT = triT - (tarH - triH)
            }
            break
          }
        }

        if (params.edgeAdjust && funCenterJudge(align)) {
          // 是居中定位
          // 变更的不是方向，而是offset大小
          // 偏移处理
          if (align == '7-5' || align == '5-7') {
            // 左右是否超出
            if (tarL - sl < 0.5 * winWidth) {
              // 左半边，判断左边缘
              if (tarL - sl < 0) {
                tarL = sl
              }
            } else if (tarL - sl + tarW > winWidth) {
              tarL = winWidth + sl - tarW
            }
            // 下面两个else if 判断上下是否超出
          } else if (tarT - st < 0.5 * winHeight) {
            // 左半边，判断左边缘
            if (tarT - st < 0) {
              tarT = st
            }
          } else if (tarT - st + tarH > winHeight) {
            tarT = winHeight + st - tarH
          }
        }

        if (strNewDirect == 'top' || strNewDirect == 'left') {
          tarL = tarL - offX
          tarT = tarT - offY
        } else {
          tarL = tarL + offX
          tarT = tarT + offY
        }

        //浮动框显示
        target.css({
          position: 'absolute',
          left: Math.round(tarL),
          top: Math.round(tarT)
        }).attr('data-align', align)

        // z-index自动最高
        if (target.zIndex) {
          target.zIndex()
        }
      })
    }

    var Follow = function (trigger, target, options) {
      target.follow(trigger, options)
    }

    // Follow.prototype.hide = function() {
    //  target.remove();
    // };
    return Follow
  }))
!function (i, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define(e) : i.ErrorTip = e()
  }(this,
    function (require) {
      if ("function" == typeof require) require("common/ui/Follow");
      else if (!$().follow) return window.console && window.console.error("need Follow.js"),
        {}
      $.fn.errorTip = function (e, t) {
        return $(this).each(function () {
          new i($(this), e, t)
        })
      }
      var i = function (i, e, t) {
        var r = {
            unique: !0,
            align: "center",
            onShow: $.noop,
            onHide: $.noop
          },
          n = $.extend({},
            r, t || {})
        if ($.isFunction(e) && (e = e()), "string" != typeof e) return this
        var o, a, s, d = this,
          l = i
        return 1 == n.unique && window.errorTip ? o = window.errorTip.data("trigger", l) : 0 == n.unique && l.data("errorTip") ? o = l.data("errorTip") : (o = $('<div class="ui-tips-x ui-tips-error"></div>'), a = $("<span></span>").addClass("ui-tips-before"), s = $("<i></i>").addClass("ui-tips-after"), $(document.body).append(o.append(a).append(s)), 1 == n.unique ? window.errorTip = o.data("trigger", l) : l.data("errorTip", o), $(document).bind({
          keydown: function (i) {
            16 != i.keyCode && 17 != i.keyCode && d.hide()
          },
          mousedown: function (i) {
            var e = document.activeElement,
              t = o.data("trigger"),
              r = i.target
            e && t && e == r && e == t.get(0) && 0 == t.data("focus") || d.hide()
          }
        }), $(window).bind({
          resize: function () {
            d.hide()
          }
        })),
          this.el = {
            trigger: i,
            tips: o,
            before: a || o.find("span"),
            after: s || o.find("i")
          },
          this.callback = {
            show: n.onShow,
            hide: n.onHide
          },
          this.cl = "ui-tips",
          this.align = n.align,
          this.show(e),
          this
      }
      return i.prototype.show = function (i) {
        var e = this.el,
          t = e.tips,
          r = e.trigger,
          n = e.before,
          o = e.after
        n.html(i)
        var a = this.align,
          s = 0
        return "left" == a ? s = -.5 * n.width() + parseInt(n.css("padding-left")) || 0 : "right" == a ? s = .5 * n.width() - parseInt(n.css("padding-right")) || 0 : "number" == typeof a && (s = a),
          o.css({
            left: s
          }),
          t.follow(r, {
            align: a,
            position: "5-7",
            edgeAdjust: !1
          }),
          t.show(),
          r.attr("aria-label", "错误提示：" + i),
        this.callback && this.callback.show && this.callback.show.call(r.addClass("error valided"), t),
          this
      },
        i.prototype.hide = function () {
          var i = this.el.tips,
            e = this.el.trigger
          return e.removeAttr("aria-label"),
          "none" != i.css("display") && (i.hide(), this.callback && this.callback.hide && this.callback.hide.call((i.data("trigger") || e).removeClass("error"), i)),
            this
        },
        i
    })
!function (t, e) {
    "function" == typeof define && (define.amd || define.cmd) ? define(e) : t.Validate = e()
  }(this,
    function (require) {
      if ("function" == typeof require) require("common/ui/ErrorTip");
      else if (!$().follow) return window.console && window.console.error("need ErrorTip.js"),
        {}
      $.fn.validate = function (e, r) {
        return $(this).each(function () {
          $(this).data("validate", new t($(this), e, r))
        })
      },
        $.fn.selectRange = function (t, e) {
          var r = $(this).get(0)
          if (r.createTextRange) {
            var a = r.createTextRange()
            a.collapse(!0),
              a.moveEnd("character", e),
              a.moveStart("character", t),
              a.select()
          } else r.focus(),
            r.setSelectionRange(t, e)
          return $(this)
        },
        $.fn.isProp = function (t) {
          var e = $(this).prop(t) || $(this).attr(t)
          return !(!e && "string" != typeof e)
        },
        $.dbc2sbc = function (t) {
          var e, r, a = ""
          for (e = 0; e < t.length; e++) a += (r = t.charCodeAt(e)) >= 65281 && r <= 65373 ? String.fromCharCode(t.charCodeAt(e) - 65248) : 12288 == r ? String.fromCharCode(t.charCodeAt(e) - 12288 + 32) : t.charAt(e)
          return a
        },
        $.getType = function (t) {
          var e = t.getAttribute("type"),
            r = e || t.type || ""
          if (r = r.toLowerCase().replace(/\W+$/, ""), e && e != r && $('<input type="' + r + '">').attr("type") == r) try {
            t.type = r
          } catch (a) {
          }
          return r.replace(/_/g, "")
        },
        $.getLength = function (t, e) {
          if ("password" == t.type) return e || t.value.length
          var r = t.getAttribute("lang"),
            a = $.trim(t.value)
          if (!r) return e || a.length
          if ("" == a) return 0
          var i = 1,
            n = 1
          if (/zh/i.test(r) ? n = .5 : /en/i.test(r) && (i = 2), !e) {
            var o = a.replace(/[\x00-\xff]/g, "").length,
              l = a.length - o
            return Math.ceil(l * n) + Math.ceil(o * i)
          }
          var s = 0,
            u = e
          return $.each(a.split(""),
            function (t, r) {
              s >= e || (/[\x00-\xff]/.test(r) ? s += n : s += i, s >= e && (u = t + 1))
            }),
            u
        },
        $.telFilter = function (t) {
          return t = t || "",
          (t = t.replace("+86", "")).match(/\d/) && 11 == t.match(/\d/g).length && (t = t.replace(/\D/g, "")),
            t
        },
        $.validate = {
          reg: {
            email: "^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
            number: "^\\-?\\d+(\\.\\d+)?$",
            url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
            tel: "^1\\d{10}$",
            zipcode: "^\\d{6}$",
            date: "^\\d{4}\\-(0\\d|1[0-2])\\-([0-2]\\d|3[0-1])$",
            time: "^[0-2]\\d\\:[0-5]\\d$",
            hour: "^[0-2]\\d\\:00$",
            minute: "^[0-2]\\d\\:[0-5]\\d$",
            "date-range": "^\\d{4}(\\-\\d{2}){2}\\s至\\s\\d{4}(\\-\\d{2}){2}$",
            "month-range": "^\\d{4}\\-\\d{2}\\s至\\s\\d{4}\\-\\d{2}$"
          },
          prompt: function (t, e, r) {
            var a = {
              name: $.extend({},
                {
                  email: "邮箱",
                  tel: "手机号码",
                  url: "网址",
                  zipcode: "邮编",
                  password: "密码",
                  number: "数值",
                  range: "数值",
                  date: "日期",
                  year: "年份",
                  month: "月份",
                  hour: "小时",
                  minute: "分钟",
                  time: "时间",
                  datetime: "日期时间",
                  "date-range": "日期范围",
                  "month-range": "月份范围"
                },
                $.validate.name || {}),
              ignore: {
                radio: "请选择一个选项",
                checkbox: "如果要继续，请选中此框",
                select: "请选择列表中的一项",
                "select-one": "请选择列表中的一项",
                empty: "请填写此字段"
              },
              unmatch: {
                pattern: "内容格式不符合要求",
                multiple: "某项内容格式不符合要求"
              },
              out: {
                min: "值偏小",
                max: "值偏大",
                step: "值不符合要求"
              },
              overflow: {
                minlength: "内容长度偏小",
                maxlength: "内容长度偏大"
              }
            }
            if (t) {
              var i = "",
                n = e.id,
                o = "",
                l = t.error
              e && (o = e.getAttribute("type") || e.type || "", "select-one" == (o = $.trim(o)) && (o = "select"))
              var s = (r = r || {}).prompt || r
              n && $.isArray(r) && $.each(r,
                function (t, e) {
                  e.id == n && (s = e.prompt)
                })
              var u = a.name[o] ||
                function () {
                  if (r.label && n && !/checkbox|radio/.test(o)) {
                    var t = ""
                    return $("label[for=" + n + "]").each(function () {
                      var e = $(this).clone()
                      e.children().remove()
                      var r = $.trim(e.html()).replace(/\d/g, "").replace("：", "")
                      r.length > t.length && (t = r)
                    }),
                      t.length >= 2 ? t : void 0
                  }
                }()
              switch (t.type) {
                case "ignore":
                  (i = s.ignore) || (i = (i = o && u ? "select" != o ? u + "不能为空" : a.ignore[o] = "您尚未选择" + u : a.ignore[l]) || a.ignore.empty)
                  break
                case "unmatch":
                  (i = s.unmatch) || (i = (i = o && u ? u + "格式不符合要求" : a.unmatch[l] || a.unmatch.pattern) || a.ignore.empty)
                  break
                case "out":
                  if (!(i = s.out && s.out[l])) if (o && u) {
                    var c = e.getAttribute("min"),
                      d = e.getAttribute("max"),
                      h = 1 * e.getAttribute("step") || 1
                    "month-range" == o && (c = c.slice(0, 7), d = d.slice(0, 7))
                    var p = "必须要大于或等于" + c,
                      m = "必须要小于或等于" + d
                    "min" == l ? (i = u + p, "-range" == o.slice(-6) && (i = "起始日期" + p)) : "max" == l ? (i = u + "必须要小于或等于" + d, "-range" == o.slice(-6) && (i = "结束日期" + m)) : "min-max" == l ? i = "起始日期" + p + "，结束日期" + m : "step" == l && (i = "number" == o || "range" == o ? "请输入有效的值。两个最接近的有效值是" +
                      function () {
                        c *= 1,
                          d *= 1
                        for (var t = 1 * $.trim(e.value), r = c, a = c; a < d; a += h) if (a < t && a + h > t) {
                          r = a
                          break
                        }
                        return [r, r + h].join("和")
                      }() : "请选择有效的值。" + u + "间隔是" + h)
                  } else i = a.out[l]
                  i = i || a.out.step
                  break
                case "overflow":
                  if (!(i = s.overflow && s.overflow[l])) {
                    var f = e.getAttribute("minlength"),
                      g = e.maxlength || e.getAttribute("maxlength"),
                      v = e.getAttribute("lang"),
                      b = "";
                    /zh/i.test(v) ? b = "个汉字(2字母=1汉字)" : /en/i.test(v) && (b = "个字符(1汉字=2字符)"),
                      "minlength" == l ? i = "内容长度不能小于" + f + b : "maxlength" == l && (i = "内容长度不能大于" + g.replace(/\D/g, "") + b)
                  }
                  i = i || a.overflow[l]
              }
              return $.isFunction(i) && (i = i.call(e, $(e))),
                i
            }
          },
          isIgnore: function (t) {
            if (!t || t.disabled) return !1
            var e = $.getType(t),
              r = $(t),
              a = t.value
            if (r.isProp("required")) {
              if ("radio" == e) {
                var i = self,
                  n = r.parents("form")
                t.name && n.length && (i = n.find("input[type='radio'][name='" + t.name + "']"))
                var o = !1
                return i.each(function () {
                  0 == o && $(this).prop("checked") && (o = !0)
                }),
                0 == o && {
                  type: "ignore",
                  error: "radio"
                }
              }
              if ("checkbox" == e) return 0 == r.prop("checked") && {
                type: "ignore",
                error: "checkbox"
              }
              if (/select/.test(e) && "" == a) return {
                type: "ignore",
                error: "select"
              }
              if ("password" != e && (a = $.trim(a)), "" == a) return history.pushState && (t.value = ""),
                {
                  type: "ignore",
                  error: "empty"
                }
            }
            return !1
          },
          isUnmatch: function (t, e, r) {
            if (!t || t.disabled) return !1
            var a = $(t),
              i = t.value,
              n = i,
              o = $.getType(t)
            if (/^radio|checkbox|select$/i.test(o)) return !1
            if ("password" != o && (n = $.trim(i)), 0 == /^text|textarea|password$/i.test(o) && (n = $.dbc2sbc(n)), "tel" == o && (n = $.telFilter(n)), !1 !== $.validate.focusable && 0 !== $.validate.focusable && n != i && (t.value = n), "" == n) return !1
            if (!(e = e || a.attr("pattern") || o && $.map(o.split("|"),
              function (t) {
                var e = $.validate.reg[t]
                if (e) return e
              }).join("|"))) return !1
            var l = a.isProp("multiple"),
              s = new RegExp(e, r || "i")
            if (l && 0 == /^number|range$/i.test(o)) {
              var u = !0
              if ($.each(n.split(","),
                function (t, e) {
                  e = $.trim(e),
                  u && !s.test(e) && (u = !1)
                }), 0 == u) return {
                type: "unmatch",
                error: "multiple"
              }
            } else if (0 == s.test(n)) return {
              type: "unmatch",
              error: "pattern"
            }
            return !1
          },
          isOut: function (t) {
            if (!t || t.disabled || /^radio|checkbox|select$/i.test(t.type)) return !1
            var e = $(t),
              r = e.attr("min"),
              a = e.attr("max"),
              i = Number($(t).attr("step")) || 1,
              n = $.getType(t),
              o = t.value
            if ("-range" != n.slice(-6)) {
              if ("0" != o && Number(o) != o || (o *= 1), r && o < r) return {
                type: "out",
                error: "min"
              }
              if (a && o > a) return {
                type: "out",
                error: "max"
              }
              if (("number" == n || "range" == n) && i && r && !/^\d+$/.test(Math.abs(o - r) / i)) return {
                type: "out",
                error: "step"
              }
              if (("hour" == n || "minute" == n || "time" == n) && r && i) {
                var l = o.split(":")[1],
                  s = r.split(":")[1]
                if ("hour" == n && (l != s || (o.split(":")[0] - r.split(":")[0]) % i != 0)) return {
                  type: "out",
                  error: "step"
                }
                if ((l - s) % i != 0) return {
                  type: "out",
                  error: "step"
                }
              }
            } else {
              var u = o.split(" "),
                c = []
              if ("month-range" == n && (r = r && r.slice(0, 7), a = a && a.slice(0, 7)), 3 == u.length && (r && u[0] < r && c.push("min"), a && u[2] > a && c.push("max"), c.length)) return {
                type: "out",
                error: c.join("-")
              }
            }
            return !1
          },
          isOverflow: function (t) {
            if (!t || t.disabled || /^radio|checkbox|select$/i.test(t.type)) return !1
            var e = $(t),
              r = e.attr("minlength"),
              a = t.maxlength || e.attr("maxlength")
            if ("" == t.value) return !1
            var i = $.getLength(t)
            return r && i < r ? {
              type: "overflow",
              error: "minlength"
            } : !!(a && (a = a.replace(/\D/g, ""), i > a)) && {
              type: "overflow",
              error: "maxlength"
            }
          },
          isError: function (t) {
            if (!t || t.disabled) return !1
            var e = t.getAttribute("type") || t.type,
              r = t.tagName.toLowerCase()
            return 1 != /^button|submit|reset|file|image$/.test(e) && "button" != r && ($.validate.isIgnore(t) || $.validate.isUnmatch(t) || $.validate.isOut(t) || $.validate.isOverflow(t) || !1)
          },
          isAllPass: function (t, e) {
            if (!t) return !0;
            (t = $(t)).is("form") && (t = t.find(":input"))
            var r = !0
            return t.each(function () {
              var t = this,
                a = t.getAttribute("type") || t.type,
                i = t.getAttribute("pattern")
              if (!i && a && (i = $.validate.reg[a]) && t.setAttribute("pattern", i), 0 != r && !t.disabled && "submit" != a && "reset" != a && "file" != a && "image" != a) {
                var n = $.validate.isError(t)
                n && !1 !== e && ($.validate.errorTip(t, $.validate.prompt(n, t, e)), r = !1)
              }
            }),
              r
          },
          count: function (t) {
            if (!t) return this
            var e
            t.get ? e = t.get(0) : (e = t, t = $(t))
            var r = e.tagName.toLowerCase()
            if ("input" != r && "textarea" != r) return this
            var a = t.attr("minlength") || 0,
              i = e.maxlength || t.attr("maxlength")
            if (!a && !i) return this
            i = i.replace(/\D/g, "")
            var n, o, l = "ui-" + r,
              s = l + "-x",
              u = l + "-count"
            if (t.hasClass(l)) return this
            if (0 == t.parent("." + s).length) return this
            var c = e.id
            c || (c = "id" + (Math.random() + "").replace(/\D/g, ""), e.id = c),
              0 == (n = t.parent().find("." + u)).length ? (n = $('<label for="' + c + '" class="ui-' + r + '-count">                    <span>' + a + "</span>/<span>" + i + "</span>                </label>"), t.parent().append(n)) : n.attr("for", c),
              o = n.find("span").eq(0)
            var d = function () {
              var t = $.getLength(e)
              o.html(t),
                t > i ? o.addClass("red") : o.removeClass("red")
            }
            return t.data("countBind") || ("oninput" in document.createElement("div") ? t.bind("input",
              function () {
                d()
              }) : e.attachEvent("onpropertychange",
              function (t) {
                t && "value" == t.propertyName && d()
              }), t.data("countBind", !0)),
              d(),
              this
          },
          errorTip: function (t, e) {
            var r = $.validate.getTarget(t)
            if (0 == r.length) return this
            var a = function () {
              if (r.errorTip(e, {
                onShow: function (t) {
                  .5 * (t.width() - r.width()) < 0 ? t.css("margin-left", .5 * (t.width() - r.width())) : t.css("margin-left", 0),
                    !1 === $.validate.focusable ? t.addClass("none") : t.removeClass("none")
                },
                onHide: function () {
                  if (r.parents("form").data("immediate")) {
                    var t = $.validate.el.control.data("customValidate"),
                      e = t && t($.validate.el.control);
                    ($.validate.isError($.validate.el.control.get(0)) || "string" == typeof e && e.length) && $.validate.el.target.addClass("error"),
                      r.removeAttr("aria-label")
                  }
                }
              }), !1 !== $.validate.focusable && 0 !== $.validate.focusable) {
                $.validate.focusable = null
                var t = $.validate.el.control,
                  a = t.get(0)
                if (a.getAttribute("type") || a.type) if (-1 != e.indexOf("内容长度") && -1 != e.indexOf("大")) {
                  var i = t.val().length,
                    n = a.maxlength || t.attr("maxlength").replace(/\D/g, "")
                  i && n && t.selectRange($.getLength(a, n), i)
                } else t.select()
              }
            }
            $.validate.el = {
              control: $(t),
              target: r
            }
            var i = r.get(0).getBoundingClientRect()
            return i.top < 50 ? $("html, body").animate({
                "scrollTop": $(window).scrollTop() - (50 - i.top)
              },
              200, a) : i.bottom > $(window).height() ? $("html, body").animate({
                "scrollTop": $(window).scrollTop() + (i.bottom - $(window).height())
              },
              200, a) : a(),
              this
          },
          getTarget: function (t) {
            var e = t
            if (!t) return $()
            if (t.get ? e = t.get(0) : t = $(t), 0 != t.length) {
              var r = t,
                a = e.getAttribute("type") || e.type,
                i = e.id,
                n = e.tagName.toLowerCase()
              return "radio" == a ? r = t.parent().find("label.ui-radio[for=" + i + "]") : "checkbox" == a ? r = t.parent().find("label.ui-checkbox[for=" + i + "]") : "select" == a || "select" == n ? r = t.next(".ui-select") : "range" == a ? r = t.prev(".ui-range") : "hidden" == a || "none" == t.css("display") ? t.data("target") && t.data("target").size && (r = $.validate.getTarget(t.data("target"))) : "textarea" == a || "textarea" == n ? t.nextAll(".ui-textarea").length ? r = t.nextAll(".ui-textarea").eq(0) : !document.querySelector && t.parent(".ui-textarea").length && (r = t.parent(".ui-textarea")) : "input" == n && (t.nextAll(".ui-input").length ? r = t.nextAll(".ui-input").eq(0) : !document.querySelector && t.parent(".ui-input").length && (r = t.parent(".ui-input"))),
                r
            }
          }
        }
      var t = function (t, e, r) {
        t.eq || (t = $()),
          e = e || $.noop,
          t.attr("novalidate", "novalidate")
        var a = {
            multiple: !0,
            immediate: !0,
            label: !1,
            validate: [],
            onError: $.noop,
            onSuccess: $.noop
          },
          i = $.extend({},
            a, r || {})
        t.find(":disabled").each(function () {
          / ^image | submit$ /
          i.test(this.type) && $(this).removeAttr("disabled")
        })
        var n = this
        return t.on("submit",
          function (t) {
            if (!n.stopValidate) return t.preventDefault(),
            n.isAllPass() && $.isFunction(e) && e.call(this, n),
              !1
          }),
          this.el = {
            form: t
          },
          this.callback = {
            error: i.onError,
            success: i.onSuccess
          },
          this.data = i.validate,
          this.boo = {
            multiple: i.multiple,
            immediate: i.immediate,
            label: i.label
          },
          this.count(),
          this.enhance(),
          this
      }
      return t.prototype.count = function () {
        var t = this
        return this.el.form.find(".ui-input-x > input, .ui-textarea-x > textarea").each(function () {
          var t = this,
            e = $(t),
            r = e.attr("maxlength")
          if (r) try {
            e.attr("maxlength", "_" + r + "_")
          } catch (a) {
            e.removeAttr("maxlength")[0].maxlength = r
          }
          $.validate.count(e)
        }),
          t
      },
        t.prototype.enhance = function () {
          this.el.form.find(":input").each(function () {
            var t = this,
              e = t.getAttribute("type")
            t.addEventListener && 0 == /^checkbox|radio|range$/i.test(e) && t.addEventListener("paste",
              function (e) {
                var r = this.getAttribute("type") || this.type,
                  a = e.clipboardData || window.clipboardData,
                  i = ""
                if (a && 1 != t.disabled) {
                  var n = ""
                  window.getSelection ? n = this.value.slice(t.selectionStart, t.selectionEnd) : document.selection && (n = document.selection.createRange().text),
                  "" != this.value.trim() && n !== this.value || (e.preventDefault(), e.stopPropagation(), i = a.getData("text") || "", "password" != r && (i = i.trim()), "email" == r ? i = i.replace("#", "@") : "tel" == r && (i = $.telFilter(i)), this.value = i),
                    $(t).trigger("input")
                }
              })
          })
        },
        t.prototype.immediate = function () {
          var t = this,
            e = this.el.form
          return e.data("immediate") ? this : (e.find(":input").each(function () {
            var e = this,
              r = $(e),
              a = e.type,
              i = e.getAttribute("type")
            "button" != a && "submit" != a && "reset" != a && "file" != a && "image" != a && ("radio" == a || "checkbox" == a ? r.on("click",
              function () {
                0 != t.boo.immediate && t.isPass($(this)) && t.isError($(this), !1)
              }) : /select/.test(a) || /range|date|time|hour|minute|hidden/.test(i) ? r.on("change",
              function () {
                0 != t.boo.immediate && t.isPass($(this)) && t.isError($(this), !1)
              }) : (r.on({
              focus: function () {
                t.boo.immediate && setTimeout(function () {
                    $.validate.focusable = 0,
                    t.isPass(r) && t.isError(r, !1)
                  },
                  20)
              },
              input: function () {
                0 != t.boo.immediate && (document.msHidden == undefined || "" != this.value || this.lastvalue || !$(this).attr("placeholder") ? ($.validate.focusable = !1, t.isPass($(this)) && (t.isError($(this), !1), window.errorTip && window.errorTip.hide()), this.lastvalue = this.value) : this.lastvalue = this.value)
              }
            }), "oninput" in document.createElement("div") == 0 && e.attachEvent("onpropertychange",
              function (r) {
                r && "value" == r.propertyName && t.boo.immediate && ($.validate.focusable = !1, t.isPass($(e)) && t.isError($(e), !1), $.validate.focusable = !0)
              })))
          }), e.data("immediate", !0), this)
        },
        t.prototype.isError = function (t, e) {
          if (!t || !t.get || !t.length) return this
          var r = t.get(0),
            a = e
          if (void 0 === e && 0 == t.is(":disabled")) {
            var i = t.data("customValidate")
            a = $.validate.isError(r) || i && i(t)
          }
          var n = $.validate.getTarget(t)
          return a ? n.addClass("error") : "radio" == r.type && r.name ? this.el.form.find('input[type=radio][name="' + r.name + '"]').each(function () {
            $.validate.getTarget($(this)).removeClass("error").removeAttr("aria-label")
          }) : n.removeClass("error").removeAttr("aria-label"),
            a
        },
        t.prototype.isPass = function (t) {
          if (!t || !t.get || !t.length) return this
          var e = t.get(0),
            r = e.id,
            a = this.boo.label,
            i = {
              label: a
            }
          r && this.data && this.data.length && $.each(this.data,
            function (t, e) {
              e.id == r && ("undefined" != typeof e.label && (e.label = a), i = e)
            })
          var n = $.validate.isAllPass(t, i)
          if (1 == n && i && i.method) {
            var o = i.method.call(e, t)
            "string" == typeof o && "" !== o && (this.errorTip(t, o), n = !1),
              t.data("customValidate", i.method)
          }
          return this.callback[n ? "success" : "error"].call(this, t),
            n
        },
        t.prototype.isAllPass = function () {
          var t = this,
            e = this.el.form,
            r = !0
          return $.validate.focusable = !0,
            e.find(":input").each(function () {
              if (1 == r && 0 == t.isPass($(this)) && (r = !1), t.boo.multiple) {
                var a = this
                e.data("immediate") || $.each(t.data,
                  function (t, e) {
                    e.id == a.id && e.method && $(a).data("customValidate", e.method)
                  }),
                  t.isError($(this))
              }
            }),
          !e.data("immediate") && t.boo.immediate && t.immediate(),
            r
        },
        t.prototype.errorTip = function (t, e) {
          return $.validate.errorTip(t, e),
            this
        },
        t
    })