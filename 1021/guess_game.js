function playGuessingGame() {
  var answer = Math.floor(Math.random() * 100) + 1;
  var count = 0;
  var guess;
  var message = '';

  do {
    guess = parseInt(prompt('請猜一個 1 到 100 的數字：'), 10);
    count++;

    if (isNaN(guess)) {
      message = '請輸入有效數字';
    } else if (guess < answer) {
      message = '再大一點！';
    } else if (guess > answer) {
      message = '再小一點！';
    } else {
      message = '🎉 恭喜你猜中了！總共猜了 ' + count + ' 次。';
    }

    alert(message);
  } while (guess !== answer);

  document.getElementById('result').textContent = message;
}
