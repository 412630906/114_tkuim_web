const form = document.querySelector('#signup-form');
const submitBtn = form.querySelector('button[type="submit"]');
const resultEl = document.querySelector('#result');
const listBtn = document.querySelector('#view-list-btn'); // 新增的按鈕

// ------------------------------
// POST：送出報名資料
// ------------------------------
async function submitSignup(data) {
  const res = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || '報名失敗');
  }
  return payload;
}

// ------------------------------
// GET：查看所有報名資料
// ------------------------------
async function fetchSignupList() {
  const res = await fetch('http://localhost:3001/api/signup');

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.error || '取得清單失敗');
  }
  return payload;
}

// ------------------------------
// 表單送出事件（含 Loading、防重複）
// ------------------------------
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 收集資料
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  // 目前是作業示範用固定值
  payload.password = payload.confirmPassword = "demoPass88";
  payload.interests = ["後端入門"];
  payload.terms = true;

  try {
    submitBtn.disabled = true;
    submitBtn.textContent = "送出中...";
    resultEl.textContent = "送出中...";

    const result = await submitSignup(payload);

    resultEl.textContent = `成功：\n${JSON.stringify(result, null, 2)}`;
    form.reset();

  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;

  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "送出";
  }
});

// ------------------------------
// 查看報名清單按鈕事件
// ------------------------------
listBtn.addEventListener('click', async () => {
  try {
    listBtn.disabled = true;
    listBtn.textContent = "載入中...";
    resultEl.textContent = "讀取中...";

    const list = await fetchSignupList();

    resultEl.textContent = `報名清單：\n${JSON.stringify(list, null, 2)}`;

  } catch (error) {
    resultEl.textContent = `錯誤：${error.message}`;

  } finally {
    listBtn.disabled = false;
    listBtn.textContent = "查看報名清單";
  }
});
