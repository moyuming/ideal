/**
 * 计算n的阶乘，eg：n=5 5*4*3*2*1
 * @param n
 * @returns {*}
 */
function recurFib(n) {
  if (n < 2) {
    return n
  }
  else {
    return recurFib(n-1) + recurFib(n-2)
  }
}

/**
 * 寻找最长公共子串
 * 动态规划思想
 * @param word1
 * @param word2
 * @returns 找到的最长子串
 */
function lcs(word1, word2) {
  var max = 0
  var index = 0
  var lcsarr = new Array(word1.length + 1)
  for (var i = 0; i <= word1.length + 1; ++i) {
    lcsarr[i] = new Array(word2.length + 1)
    for (var j = 0; j <= word2.length + 1; ++j) {
      lcsarr[i][j] = 0
    }
  }
  for (var i = 0; i <= word1.length; ++i) {
    for (var j = 0; j <= word2.length; ++j) {
      if (i == 0 || j == 0) {
        lcsarr[i][j] = 0
      } else {
        if (word1[i - 1] == word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1
        } else {
          lcsarr[i][j] = 0
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j]
        index = i
      }
    }
  }
  var str = ""
  if (max == 0) {
    return ""
  } else {
    for (var i = index - max; i <= max; ++i) {
      str += word2[i]
    }
    return str
  }
}

/**
 * 两数最大值
 * @param a
 * @param b
 * @returns {*}
 */
function max(a, b) {
  return (a > b) ? a : b
}

/**
 * 背包问题动态规划法，。试想你是一个保险箱大盗，打开了一个装满奇珍
 异宝的保险箱，但是你必须将这些宝贝放入你的一个小背包中。保险箱中的物品规格和价
 值不同。你希望自己的背包装进的宝贝总价值最大
 * @param capacity 背包容量
 * @param size     尺寸数组
 * @param value    价值数组
 * @param n        保险箱物品总个数
 * @returns {*}    价值最大
 */
function dKnapsack(capacity, size, value, n) {
  var K = []
  for (var i = 0; i <= capacity + 1; i++) {
    K[i] = []
  }
  for (var i = 0; i <= n; i++) {
    for (var w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0) {
        K[i][w] = 0
      }
      else if (size[i - 1] <= w) {
        K[i][w] = max(value[i - 1] + K[i-1][w-size[i-1]],
          K[i-1][w])
      }
      else {
        K[i][w] = K[i - 1][w]
      }
    }
  }

  return K[n][capacity]
}

/**
 * 贪心算法---找零问题，你从商店购买了一些商品，找零 63 美分，店员要
 怎样给你这些零钱呢？如果店员根据贪心算法来找零的话，他会给你两个 25 美分、一个
 10 美分和三个 1 美分。在没有使用 50 美分的情况下这是最少的硬币数量。
 * @param origAmt 找的零钱
 * @param coins
 * @returns {*}数组，每种小零钱的个数
 */
function makeChange(origAmt, coins) {
  var remainAmt = 0
  if (origAmt % 0.25 < origAmt) {
    coins[3] = parseInt(origAmt/0.25)
    remainAmt = origAmt % 0.25
    origAmt = remainAmt
  }
  if (origAmt % 0.1 < origAmt) {
    coins[2] = parseInt(origAmt/0.1)
    remainAmt = origAmt % 0.1
    origAmt = remainAmt
  }
  if (origAmt % 0.05 < origAmt) {
    coins[1] = parseInt(origAmt/0.05)
    remainAmt = origAmt % 0.05
    origAmt = remainAmt
  }

  coins[0] = parseInt(origAmt/0.01)
  return coins
}
