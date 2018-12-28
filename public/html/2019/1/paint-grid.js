// 第三部：transparent-grid命名和CSS中的对应
registerPaint('custom-grid', class {
  // 获取3个变量
  static get inputProperties() {
    return [
      '--color1',
      '--color2',
      '--units'
    ]
  }
  paint(context, size, properties) {
    // 两个格子颜色
    var color1 = properties.get('--color1').toString();
    var color2 = properties.get('--color2').toString();
    // 格子尺寸
    var units = Number(properties.get('--units'));
    // 横轴数轴循环遍历下
    for (var x = 0; x < size.width; x += units) {
      for (var y = 0; y < size.height; y += units) {
        context.fillStyle = (x + y) % (units * 2) === 0 ? color1 : color2;
        context.fillRect(x, y, units, units);
      }
    }
  }
});