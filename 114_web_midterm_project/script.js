// DOM 元素選取
const calculationType = document.querySelector('#calculationType');
const calculateBtn = document.querySelector('#calculateBtn');
const resultCard = document.querySelector('#resultCard');
const resultValue = document.querySelector('#resultValue');
const resultUnit = document.querySelector('#resultUnit');
const errorMessage = document.querySelector('#errorMessage');

// 所有動態輸入區塊
const allInputSections = document.querySelectorAll('.dynamic-inputs');

// 互動效果1: 根據選擇顯示對應的輸入欄位
calculationType.addEventListener('change', function() {
    // 隱藏所有輸入區塊
    allInputSections.forEach(section => {
        section.classList.remove('show');
    });

    // 清除錯誤訊息和結果
    hideError();
    hideResult();

    // 顯示對應的輸入區塊
    const selectedType = this.value;
    if (selectedType) {
        const targetSection = document.querySelector(`#${selectedType}Inputs`);
        if (targetSection) {
            targetSection.classList.add('show');
        }
    }
});

// 互動效果2: 計算按鈕點擊事件
calculateBtn.addEventListener('click', function() {
    const type = calculationType.value;

    // 表單驗證
    if (!type) {
        showError('請先選擇計算類型！');
        return;
    }

    try {
        let result, unit;

        switch(type) {
            case 'equilateral':
                result = calculateEquilateralTriangle();
                unit = '平方單位';
                break;
            case 'triangle':
                result = calculateTriangle();
                unit = '平方單位';
                break;
            case 'rectangle':
                result = calculateRectangle();
                unit = '平方單位';
                break;
            case 'ellipse':
                result = calculateEllipse();
                unit = '平方單位';
                break;
            case 'polygon':
                result = calculatePolygon();
                unit = '平方單位';
                break;
            case 'distance':
                result = calculateDistance();
                unit = '單位長度';
                break;
        }

        // 顯示結果
        showResult(result, unit);
        hideError();

    } catch(error) {
        showError(error.message);
        hideResult();
    }
});

// 計算函數：正三角形面積
function calculateEquilateralTriangle() {
    const side = getValidatedInput('equilateralSide', '邊長');
    const area = (Math.sqrt(3) / 4) * Math.pow(side, 2);
    return area.toFixed(2);
}

// 計算函數：一般三角形面積
function calculateTriangle() {
    const base = getValidatedInput('triangleBase', '底邊');
    const height = getValidatedInput('triangleHeight', '高');
    const area = (base * height) / 2;
    return area.toFixed(2);
}

// 計算函數：長方形面積
function calculateRectangle() {
    const length = getValidatedInput('rectangleLength', '長');
    const width = getValidatedInput('rectangleWidth', '寬');
    const area = length * width;
    return area.toFixed(2);
}

// 計算函數：橢圓形面積
function calculateEllipse() {
    const a = getValidatedInput('ellipseMajor', '長軸半徑');
    const b = getValidatedInput('ellipseMinor', '短軸半徑');
    const area = Math.PI * a * b;
    return area.toFixed(2);
}

// 計算函數：正多邊形面積
function calculatePolygon() {
    const n = getValidatedInput('polygonSides', '邊數');
    const s = getValidatedInput('polygonSide', '邊長');
    
    if (n < 3) {
        throw new Error('邊數必須大於等於 3！');
    }
    
    const area = (n * Math.pow(s, 2)) / (4 * Math.tan(Math.PI / n));
    return area.toFixed(2);
}

// 計算函數：兩點距離
function calculateDistance() {
    const x1 = getValidatedInput('x1', 'x₁');
    const y1 = getValidatedInput('y1', 'y₁');
    const x2 = getValidatedInput('x2', 'x₂');
    const y2 = getValidatedInput('y2', 'y₂');
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance.toFixed(2);
}

// 輸入驗證函數
function getValidatedInput(id, fieldName) {
    const input = document.querySelector(`#${id}`);
    const value = parseFloat(input.value);

    if (!input.value || isNaN(value)) {
        throw new Error(`請輸入有效的${fieldName}！`);
    }

    if (value <= 0 && id !== 'x1' && id !== 'y1' && id !== 'x2' && id !== 'y2') {
        throw new Error(`${fieldName}必須大於 0！`);
    }

    return value;
}

// UI 更新函數：顯示結果
function showResult(value, unit) {
    resultValue.textContent = value;
    resultUnit.textContent = unit;
    resultCard.classList.add('show');
}

// UI 更新函數：隱藏結果
function hideResult() {
    resultCard.classList.remove('show');
}

// UI 更新函數：顯示錯誤訊息
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// UI 更新函數：隱藏錯誤訊息
function hideError() {
    errorMessage.classList.remove('show');
}

// 即時清除錯誤訊息（當使用者開始輸入時）
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', hideError);
});