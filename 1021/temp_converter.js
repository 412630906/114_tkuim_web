function convertTemperature() {
  var input = prompt('請輸入溫度（例如 30C 或 86F）：');
  var result = '';

  if (!input || input.length < 2) {
    result = '輸入格式錯誤';
  } else {
    var unit = input.slice(-1).toUpperCase();
    var value = parseFloat(input.slice(0, -1));

    if (isNaN(value)) {
      result = '溫度數值無效';
    } else if (unit === 'C') {
      var f = value * 9 / 5 + 32;
      result = value + '°C = ' + f.toFixed(2) + '°F';
    } else if (unit === 'F') {
      var c = (value - 32) * 5 / 9;
      result = value + '°F = ' + c.toFixed(2) + '°C';
    } else {
      result = '請輸入 C 或 F 結尾的溫度值';
    }
  }

  document.getElementById('result').textContent = result;
}
