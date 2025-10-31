document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const inputs = form.querySelectorAll("input[required]");
  const submitBtn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");
  const interests = document.getElementById("interests");
  const password = document.getElementById("password");
  const strengthBar = document.getElementById("strength-bar");
  
  // 恢復暫存資料
  inputs.forEach(i => {
    if (localStorage[i.id]) i.value = localStorage[i.id];
  });

  // 若已有密碼則初始化強度條
  if (password.value) updateStrength(password.value);

  // 即時暫存
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      localStorage[input.id] = input.value;
      validateField(input);
      if (input.id === "password") updateStrength(input.value);
    });
  });

  // blur 後顯示錯誤訊息
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
  });

  // 興趣標籤事件委派
  interests.addEventListener("change", () => {
    const checked = interests.querySelectorAll("input[type=checkbox]:checked");
    const error = document.getElementById("err-interest");
    if (checked.length === 0) {
      error.textContent = "請至少選擇一項興趣";
    } else {
      error.textContent = "";
    }
  });

  // 驗證邏輯
  function validateField(input) {
    const error = document.getElementById(`err-${input.id}`);
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity("此欄位為必填");
    } else if (input.type === "email" && input.validity.typeMismatch) {
      input.setCustomValidity("請輸入有效的 Email 格式");
    } else if (input.id === "phone" && !/^\d{10}$/.test(input.value)) {
      input.setCustomValidity("手機需為 10 位數字");
    } else if (input.id === "password" && !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(input.value)) {
      input.setCustomValidity("密碼需至少 8 碼，含英文字母與數字");
    } else if (input.id === "confirm" && input.value !== document.getElementById("password").value) {
      input.setCustomValidity("密碼不一致");
    }

    error.textContent = input.validationMessage;
  }

  // 密碼強度條
  function updateStrength(value) {
    // 計分項目：長度、長度更長、大小寫混合、數字、特殊字元
    let score = 0;
    if (!value) {
      strengthBar.dataset.level = 0;
      strengthBar.style.width = '0%';
      strengthBar.classList.remove('weak','fair','good','strong');
      strengthBar.setAttribute('aria-valuenow', 0);
      return;
    }

    if (value.length >= 8) score++;
    if (value.length >= 12) score++; // 更長的密碼給額外分
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    // 將分數映射到 0..4 的等級（視覺化用）
    const level = Math.min(4, score);
    strengthBar.dataset.level = level;
    strengthBar.setAttribute('aria-valuenow', level);

    // 寬度與顏色等級（可搭配 CSS .weak/.fair/.good/.strong）
    const pct = Math.round((level / 4) * 100);
    strengthBar.style.width = pct + '%';

    strengthBar.classList.remove('weak','fair','good','strong');
    if (level <= 1) strengthBar.classList.add('weak');
    else if (level === 2) strengthBar.classList.add('fair');
    else if (level === 3) strengthBar.classList.add('good');
    else strengthBar.classList.add('strong');
  }

  // 送出攔截
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstInvalid = null;

    // 驗證所有欄位
    inputs.forEach(input => {
      validateField(input);
      if (!input.checkValidity() && !firstInvalid) firstInvalid = input;
    });

    const checked = interests.querySelectorAll("input[type=checkbox]:checked");
    const interestErr = document.getElementById("err-interest");
    if (checked.length === 0) {
      interestErr.textContent = "請至少選擇一項興趣";
      if (!firstInvalid) firstInvalid = interests;
    } else {
      interestErr.textContent = "";
    }

    if (!document.getElementById("terms").checked) {
      document.getElementById("err-terms").textContent = "請勾選同意服務條款";
      if (!firstInvalid) firstInvalid = document.getElementById("terms");
    } else {
      document.getElementById("err-terms").textContent = "";
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // 模擬送出過程
    submitBtn.disabled = true;
    status.textContent = "資料送出中...";
    setTimeout(() => {
      status.textContent = "註冊成功！";
      submitBtn.disabled = false;
      localStorage.clear();
      form.reset();
      strengthBar.dataset.level = 0;
    }, 1000);
  });

  // 重設按鈕
  document.getElementById("resetBtn").addEventListener("click", () => {
    form.reset();
    inputs.forEach(i => {
      document.getElementById(`err-${i.id}`).textContent = "";
    });
    document.getElementById("err-interest").textContent = "";
    document.getElementById("err-terms").textContent = "";
    strengthBar.dataset.level = 0;
    localStorage.clear();
    status.textContent = "";
  });
});
