var data = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];
var length = data.length;
for (var i = length; i > 1; i--) {
  for (var j = 0; j < i - 1; j++) {
    var a = data[j];
    var b = data[j + 1];
    if (a > b) {
      data[j + 1] = a;
      data[j] = b;
    }
  }
}
console.log(data);
