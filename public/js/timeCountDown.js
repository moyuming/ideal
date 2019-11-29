/* by zhangxinxu 2010-07-27
* http://www.zhangxinxu.com/
* 用例：https://www.zhangxinxu.com/wordpress/2010/07/%E5%9B%A2%E8%B4%AD%E7%B1%BB%E7%BD%91%E7%AB%99%E5%80%92%E8%AE%A1%E6%97%B6%E7%9A%84js%E5%AE%9E%E7%8E%B0/
* 倒计时的实现，每个月的秒数以平均值来计算，满足大部分情况下使用，如果要精确显示还剩多少年月日，可以配合moment.js的时差diff函数计算
*/
/**
 * @param d 将来的某个时间
 * @param o 倒计时dom对象
 */
var fnTimeCountDown = function (d, o) {
  var f = {
    zero: function (n) {
      //转十进制
      var n = parseInt(n, 10)
      if (n > 0) {
        if (n <= 9) {
          n = "0" + n
        }
        return String(n)
      } else {
        return "00"
      }
    },
    /**
     * 解析时间对象
     * @returns {{sec: string, mini: string, hour: string, day: string, month: string, year: string}}
     */
    dv: function () {
      d = d || Date.UTC(2050, 0, 1) //如果未定义时间，则我们设定倒计时日期是2050年1月1日
      var future = new Date(d), now = new Date()
      //将来现在的秒差值，处理时间差
      var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60, pms = {
        sec: "00",
        mini: "00",
        hour: "00",
        day: "00",
        month: "00",
        year: "0"
      }
      if (dur > 0) {
        pms.sec = f.zero(dur % 60)
        pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math.floor((dur / 60)) % 60) : "00"
        pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math.floor((dur / 3600)) % 24) : "00"
        // 每月固定30天计算，永远不会超过31
        pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math.floor((dur / 86400)) % 30) : "00"
        //月份，以实际平均每月秒数计算
        pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math.floor((dur / 2629744)) % 12) : "00"
        //年份，按回归年365天5时48分46秒算
        pms.year = Math.floor((dur / 31556926)) > 0 ? Math.floor((dur / 31556926)) : "0"
      }
      return pms
    },
    ui: function () {
      if (o.sec) {
        o.sec.innerHTML = f.dv().sec
      }
      if (o.mini) {
        o.mini.innerHTML = f.dv().mini
      }
      if (o.hour) {
        o.hour.innerHTML = f.dv().hour
      }
      if (o.day) {
        o.day.innerHTML = f.dv().day
      }
      if (o.month) {
        o.month.innerHTML = f.dv().month
      }
      if (o.year) {
        o.year.innerHTML = f.dv().year
      }
      setTimeout(f.ui, 1000)
    }
  }
  f.ui()
}