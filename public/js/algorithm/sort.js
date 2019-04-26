function CArray(elements) {
  this.dataStore = elements
  this.pos = elements.length -1
  this.numElements = elements.length
}
function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
  var rightArr = new Array(stopRight - startRight + 1)
  var leftArr = new Array(stopLeft - startLeft + 1)
  //右数组赋值
  k = startRight
  for (var i = 0; i < (rightArr.length - 1); ++i) {
    rightArr[i] = arr[k]
    ++k
  }
  //左数组赋值
  k = startLeft
  for (var i = 0; i < (leftArr.length - 1); ++i) {
    leftArr[i] = arr[k]
    ++k
  }
  rightArr[rightArr.length - 1] = Infinity // 哨兵值
  leftArr[leftArr.length - 1] = Infinity // 哨兵值
  //排序
  var m = 0
  var n = 0
  for (var k = startLeft; k < stopRight; ++k) {
    if (leftArr[m] <= rightArr[n]) {
      arr[k] = leftArr[m]
      m++
    }
    else {
      arr[k] = rightArr[n]
      n++
    }
  }
}
CArray.prototype = {
  constructor: CArray,
  setData: function () {
    for (var i = 0; i < this.numElements; ++i) {
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
    }
  },
  clear: function () {
    for (var i = 0; i < this.dataStore.length; ++i) {
      this.dataStore[i] = 0
    }
  },
  insert: function (element) {
    this.dataStore[this.pos++] = element
  },
  toString: function () {
    var retstr = ""
    for (var i = 0; i < this.dataStore.length; ++i) {
      retstr += this.dataStore[i] + " "
      if (i > 0 & i % 10 == 0) {
        retstr += "\n"
      }
    }
    return retstr
  },
  swap: function (arr, index1, index2) {
    var temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  },
  /**
   * 冒泡排序法，最慢的排序方式之一
   */
  bubbleSort: function () {
    var numElements = this.dataStore.length
    for (var outer = numElements; outer >= 2; --outer) {
      for (var inner = 0; inner <= outer - 1; ++inner) {
        if (this.dataStore[inner] > this.dataStore[inner + 1]) {
          this.swap(this.dataStore, inner, inner + 1)
        }
      }
    }
    return this.dataStore
  },
  /**
   * 选择排序法
   */
  selectionSort: function () {
    var min
    for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
      min = outer
      for (var inner = outer + 1;
           inner <= this.dataStore.length - 1; ++iner) {
        if (this.dataStore[inner] < this.dataStore[min]) {
          min = inner
        }
        this.swap(this.dataStore, outer, min)
      }
    }
    return this.dataStore
  },
  /**
   * 插入排序法,是基本排序法中速度最快的
   */
  insertionSort: function () {
    var temp, inner
    for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
      temp = this.dataStore[outer]
      inner = outer
      while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
        this.dataStore[inner] = this.dataStore[inner - 1]
        --inner
      }
      this.dataStore[inner] = temp
    }
    return this.dataStore
  },
  /**
   * 希尔排序法，插入排序法的改善，希尔排序的工作原理是，通过定义一个间隔序列来表示在排序过程中进行比较的元素之
   间有多远的间隔。我们可以动态定义间隔序列，不过对于大部分的实际应用场景，算法
   要用到的间隔序列可以提前定义好。有一些公开定义的间隔序列，使用它们会得到不同
   的结果。在这里我们用到了 Marcin  Ciura 在他 2001 年发表的论文“Best  Increments  for  the
   Average  Case  of  Shell  Sort”（http:bit.ly/1b04YFv,2001）中定义的间隔序列。这个间隔序列
   是：701, 301, 132, 57, 23, 10, 4, 1
   */
  shellsort: function () {
    //为了产生动态间隔序列
    var N = this.dataStore.length
    var h = 1
    while (h < N/3) {
      h = 3 * h + 1
    }
    while (h >= 1) {
      for (var i = h; i < N; i++) {
        for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h];
              j -= h) {
          this.swap(this.dataStore, j, j-h)
        }
      }
      h = (h-1)/3
    }
    return this.dataStore
  },
  /**
   * 自底向上归并排序算法
   * 这个算法首先将数据集分解为一组只有一个元素的数组。然后通过创建一组左右子数组将它们慢慢合并起来，每次合
   * 并都保存一部分排好序的数据，直到最后剩下的这个数组所有的数据都已完美排序
   * @param arr
   */
  mergeSort: function () {
    if (this.dataStore.length < 2) {
      return
    }
    var step = 1
    var left, right
    while (step < this.dataStore.length) {
      left = 0
      right = step
      while (right + step <= this.dataStore.length) {
        mergeArrays(this.dataStore, left, left + step, right, right + step)
        left = right + step
        right = left + step
      }
      if (right < this.dataStore.length) {
        mergeArrays(this.dataStore, left, left + step, right, this.dataStore.length)
      }
      step *= 2
    }
  }

}