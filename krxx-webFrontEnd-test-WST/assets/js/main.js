// ajax 配合JQ3 引入設置
// $(document).ready(function () {
//     $("#ID").load("url/html");
// });

// header選單開合
var menu = document.querySelector('.menu');
var navBtn = document.querySelector('.menu .menu-btn');
var nav = document.querySelector('.menu .nav');

function toggleNav(e) {
    menu.classList.toggle('open');
}

function closeNav(e) {
    if (e.target.nodeName == 'A') {
        menu.classList.remove('open');
    }
}
navBtn.addEventListener('click', toggleNav, false);
nav.addEventListener('click', closeNav, false);
