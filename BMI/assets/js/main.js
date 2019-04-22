var submitBtn = document.querySelector('.submit-btn');
var returnBtn = document.querySelector('.return');
var resultsEl = document.querySelector('.results-block');
var list = document.querySelector('.data-list');
var data = JSON.parse(localStorage.getItem('BMIList')) || [{}];
updateList();
// 判斷BMI值，並顯示於下方清單
function checkBMI() {
    var heightEl = document.getElementById('heightEl');
    var widthEl = document.getElementById('widthEl');
    var num = parseInt(widthEl.value) / ((parseInt(heightEl.value) / 100) * (parseInt(heightEl.value) / 100));
    var results = num.toFixed(1);
    var resultsType = document.querySelector('.results-block>h1');
    var BMIType;
    var BMITypeEn;
    var dataStr=JSON.stringify(data);
    // 取得輸入時的時間
    var d = new Date();
    var getNewDate = (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear();
    resultsEl.style.display = 'flex';
    submitBtn.style.display = 'none';
    document.querySelector('.results h1').textContent = results;
    // 判斷BMI值
    if (results >= 18.5 && results < 24) {
        resultsEl.classList.add('ideal');
        resultsType.textContent = '理想';
        BMIType = '理想';
        BMITypeEn = 'ideal';
    } else if (results < 18.5) {
        resultsEl.classList.add('underweight');
        resultsType.textContent = '過輕';
        BMIType = '過輕';
        BMITypeEn = 'underweight';
    } else if (results >= 24 && results < 27) {
        resultsEl.classList.add('overweight');
        resultsType.textContent = '過重';
        BMIType = '過重';
        BMITypeEn = 'overweight';
    } else if (results >= 27 && results < 30) {
        resultsEl.classList.add('Mild-obesity');
        resultsType.textContent = '輕度肥胖';
        BMIType = '輕度肥胖';
        BMITypeEn = 'Mild-obesity';
    } else if (results >= 30 && results < 35) {
        resultsEl.classList.add('Moderate-obesity');
        resultsType.textContent = '中度肥胖';
        BMIType = '中度肥胖';
        BMITypeEn = 'Moderate-obesity';
    } else {
        resultsEl.classList.add('Severe-obesity');
        resultsType.classList.add('Severe-obesity');
        resultsType.textContent = '重度肥胖';
        BMIType = '重度肥胖';
        BMITypeEn = 'Severe-obesity';
    }
    data.push({
        width: parseInt(widthEl.value),
        height: parseInt(heightEl.value),
        BMI: results,
        type: BMIType,
        typeEn: BMITypeEn,
        time: getNewDate
    });
    localStorage.setItem('BMIList',dataStr);
    updateList();
}

// 顯示於下方清單
function updateList() {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += '<ul class="list-unstyled ' + data[i].typeEn + '" data-num="'+ i +'"><li><span class="BMI-type">' + data[i].type + '</span></li><li>BMI<span class="BMI">' + data[i].BMI + '</span></li><li>weight<span class="weight">' + data[i].width + 'kg</span></li><li><span class="height">' + data[i].height + 'cm</span></li><li class="time">' + data[i].time + '</li></ul>';
    }
    list.innerHTML = str;
}
// 回到檢測按鈕，並清除檢測結果的class
function returnForm() {
    resultsEl.style.display = 'none';
    submitBtn.style.display = 'block';
    resultsEl.classList.remove(resultsEl.classList[1]);
}
// 刪除清單
function deleteList(e){
    if(e.target.nodeName !== 'UL'){
        return
    }
    var number =e.target.dataset.num;
    data.splice(number,1);
    var dataStr=JSON.stringify(data);
    localStorage.setItem('BMIList',dataStr);
    updateList();
}
submitBtn.addEventListener('click', checkBMI, false);
returnBtn.addEventListener('click', returnForm, false);
list.addEventListener('click',deleteList,false);