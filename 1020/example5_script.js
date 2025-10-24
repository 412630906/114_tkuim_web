// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表

var output = '';
for (var i = 1; i <= 9; i++) {
  for (var j = 1; j <= 9; j++) {
    output += i + 'x' + j + '=' + (i * j) + '\t';
  }
  output += '\n';
}

// 讓使用者輸入範圍
var start = parseInt(prompt('請輸入起始數字（例如 2）：'), 10);
var end = parseInt(prompt('請輸入結束數字（例如 5）：'), 10);

var output = '【乘法表：' + start + ' 到 ' + end + '】\n\n';

// 範圍檢查
if (isNaN(start) || isNaN(end) || start < 1 || end > 9 || start > end) {
  output = '輸入錯誤，請輸入 1 到 9 之間的有效範圍，且起始值不得大於結束值。';
} else {
  for (var i = start; i <= end; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }
}

document.getElementById('result').textContent = output;
