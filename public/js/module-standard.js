/**
 * @DateTime.js
 * @author zhangxinxu
 * @version
 * Created: 15-07-03
 */

(function (global, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory)
  } else {
    global.DateTime = factory()
  }
}(this, function (require) {
  //插件依赖
  /*if (typeof require == 'function') {
    require('common/ui/Follow')
  } else if (!$().follow) {
    if (window.console) {
      window.console.error('need Follow.js')
    }

    return {}
  }*/

}))
