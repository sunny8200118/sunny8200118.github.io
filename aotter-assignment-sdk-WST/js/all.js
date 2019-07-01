var xhr = new XMLHttpRequest();
xhr.open('get', '../mock-data.json', true);
xhr.send(null);
console.log(xhr);
xhr.onload = function () {
    const xhrArr = JSON.parse(xhr.responseText);
    const lgAd = document.querySelector('.lg-ad a');
    const lgAdContent = document.createElement('iframe');
    const AdTitle = document.createElement('h2');
    const AdText = document.createElement('p');
    // 隨機置入大廣告 //
    const num = Math.floor(Math.random() * xhrArr.length);
    lgAd.setAttribute('style',`width:${window.innerWidth / 2}px;height:${window.innerWidth / 2 / 16 * 9}px;`);
    // 判斷大廣告是否置入成功
    if(xhrArr[num].success == true){  
        console.log(`on-ad-loaded:${xhrArr[num].id}`);
    }else{
        console.log('on-ad-failed');
    }
    // 判斷type種類
    if (xhrArr[num].type == 'BANNER') {
        lgAd.setAttribute('href', xhrArr[num].url);
        lgAdContent.setAttribute('src', xhrArr[num].image);
    } else if (xhrArr[num].type == 'VIDEO') {
        lgAd.setAttribute('href', 'javascript:void(0);');
        lgAdContent.setAttribute('src', xhrArr[num].video_url);
    } else {
        lgAd.setAttribute('href', 'javascript:void(0);');
        lgAdContent.setAttribute('src', '../img/default.png');
    }
    // 置入標題
    AdTitle.setAttribute('style', `width:${window.innerWidth / 2}px`);
    AdTitle.textContent = xhrArr[num].title;
    // 置入文字
    AdText.setAttribute('style', `width:${window.innerWidth / 2}px`);
    AdText.textContent = xhrArr[num].description;

    lgAd.appendChild(lgAdContent);
    lgAd.appendChild(AdTitle);
    lgAd.appendChild(AdText);
    const closeBtn = document.getElementById('close');

    function showCloceBtn() {
        closeBtn.style.opacity = '1';
        if (xhrArr[num].success == true){
            console.log(xhrArr[num].impression_url);
        }
    }
    // 關閉按鈕功能
    function closeLgAd() {
        document.querySelector('.lg-ad').style.display = 'none';
    }
    // loading完成大廣告，一秒後才顯示關閉按鈕
    setTimeout(showCloceBtn, 1000);
    closeBtn.addEventListener('click', closeLgAd, false);
    // END 隨機置入大廣告 //
    // 置入側邊廣告 //
    let str = '';
    for (let i = 0; i < xhrArr.length; i++) {
        if (xhrArr[i].success == true) {
            str += `<div class="ad">
            <img src="${xhrArr[i].image}" alt="${xhrArr[i].title}" class="img-fluid">
            <h2>${xhrArr[i].title}</h2>
            <p>${xhrArr[i].description}</p>
            </div>`;
        }
    }
    document.getElementById('ad-list').innerHTML = str;
    // END 置入側邊廣告 //
}