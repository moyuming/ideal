function qSort(arr) {
  if (arr.length == 0) {
    return []
  }
  var left = []
  var right = []
  var pivot = arr[0]
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  // 递归算法
  return arguments.callee(left).concat(pivot, arguments.callee(right))
}