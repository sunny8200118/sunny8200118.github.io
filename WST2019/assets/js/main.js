// ajax 配合JQ3 引入設置
// $(document).ready(function () {
//     $("#ID").load("url/html");
// });

// 手機版header選單開合
var header = document.getElementById('header');
var navBtn = document.querySelector('#header nav .menu-btn');
var nav = document.querySelector('#header nav');

function toggleNav(e) {
    header.classList.toggle('open');
}

function closeNav(e) {
    if (e.target.nodeName == 'A') {
        header.classList.remove('open');
    }
}
navBtn.addEventListener('click', toggleNav, false);
nav.addEventListener('click', closeNav, false);

// 控制about透明背景
// $(document).ready(function () {
//     var opacityBgStyle = document.getElementById('opacityBg');

//     function kvScrollTS() {
//         var helloHeight = document.getElementById('hello').offsetHeight;
//         if (window.pageYOffset >= helloHeight) {
//             opacityBgStyle.textContent = '.opacity-bg::before{opacity: .85;}';
//         }
//     }
//     window.addEventListener('scroll', kvScrollTS, false);
// });