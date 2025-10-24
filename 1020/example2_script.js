// example2_script.js
// 變數宣告與基本型態操作

var text = '123';              // 字串
var num = 45;                  // 數字
var isPass = true;             // 布林
var emptyValue = null;         // 空值
var notAssigned;               // undefined（尚未指定）
var float = 1.1;

// 型態檢查
var lines = '';
lines += 'text = ' + text + '，typeof: ' + (typeof text) + '\n';
lines += 'num = ' + num + '，typeof: ' + (typeof num) + '\n';
lines += 'isPass = ' + isPass + '，typeof: ' + (typeof isPass) + '\n';
lines += 'emptyValue = ' + emptyValue + '，typeof: ' + (typeof emptyValue) + '\n';
lines += 'notAssigned = ' + notAssigned + '，typeof: ' + (typeof notAssigned) + '\n';
lines += 'float = ' + float + '，typeof: ' + (typeof float) + '\n\n';

// 轉型
var textToNumber = parseInt(text, 10); // 將 '123' → 123
lines += 'parseInt(\'123\') = ' + textToNumber + '\n';
lines += 'String(45) = ' + String(num) + '\n';

// 使用 prompt() 讀入兩個數字字串
var input1 = prompt('請輸入第一個數字：');
var input2 = prompt('請輸入第二個數字：');

// 轉成數字並相加
var sum = parseFloat(input1) + parseFloat(input2);

// 顯示結果
lines += '\n你輸入的數字相加結果為：' + sum;

document.getElementById('result').textContent = lines;
