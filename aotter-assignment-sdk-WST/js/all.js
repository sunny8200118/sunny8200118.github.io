var xhr = new XMLHttpRequest();
xhr.open('get', '../mock-data.json', true);
xhr.send(null);
console.log(xhr);
xhr.onload = function () {
    const xhrArr = JSON.parse(xhr.responseText);
    const lgAd = document.querySelector('.lg-ad a');
    const adList = document.getElementById('ad-list');
    const lgAdContent = document.createElement('img');
    const lgAdVideo = document.createElement('iframe');
    const AdTitle = document.createElement('h2');
    const AdText = document.createElement('p');
    // 隨機置入大廣告 //
    const num = Math.floor(Math.random() * xhrArr.length);
    lgAd.setAttribute('style', `width:${window.innerWidth / 2}px;height:${window.innerWidth / 2 / 16 * 9}px;`);
    // 判斷大廣告是否置入成功
    if (xhrArr[num].success == true) {
        console.log(`on-ad-loaded:${xhrArr[num].id}`);
    } else {
        console.log('on-ad-failed');
    }
    // 判斷type種類，並置入頁面
    function checkType(href, src, append) {
        lgAd.setAttribute('href', href);
        lgAdContent.setAttribute('src', src);
        lgAd.appendChild(append);
    }
    if (xhrArr[num].type == 'BANNER') {
        checkType(xhrArr[num].image, xhrArr[num].image, lgAdContent);
        lgAd.appendChild(lgAdContent);
    } else if (xhrArr[num].type == 'VIDEO') {
        checkType('javascript:void(0);', xhrArr[num].video_url, lgAdVideo);
        lgAd.appendChild(lgAdVideo);
    } else {
        checkType('javascript:void(0);', '../img/default.png', lgAdContent);
        lgAd.appendChild(lgAdContent);
    }
    // 置入標題
    AdTitle.setAttribute('style', `width:${window.innerWidth / 2}px`);
    AdTitle.textContent = xhrArr[num].title;
    // 置入文字
    AdText.setAttribute('style', `width:${window.innerWidth / 2}px`);
    AdText.textContent = xhrArr[num].description;

    lgAd.appendChild(AdTitle);
    lgAd.appendChild(AdText);
    const closeBtn = document.getElementById('close');

    function showCloceBtn() {
        closeBtn.style.opacity = '1';
        if (xhrArr[num].success == true) {
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
            if (xhrArr[i].type == 'BANNER') {
                str += `<a href="${xhrArr[i].url}">
                <img src="${xhrArr[i].image}" alt="${xhrArr[i].title}" class="img-fluid">
                <h2>${xhrArr[i].title}</h2>
                <p>${xhrArr[i].description}</p>
                </a>`;
            } else if (xhrArr[i].type == 'VIDEO') {
                str += `<a href="${xhrArr[i].video_url}">
                <img src="${xhrArr[i].image}" alt="${xhrArr[i].title}" class="img-fluid">
                <h2>${xhrArr[i].title}</h2>
                <p>${xhrArr[i].description}</p>
                </a>`;
            }
        }
    }
    adList.innerHTML = str;
    // END 置入側邊廣告 //
}