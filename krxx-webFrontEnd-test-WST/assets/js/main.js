// header選單開合 //
const menu = document.querySelector('.menu');
const navBtn = document.querySelector('.menu .menu-btn');
const nav = document.querySelector('.menu .nav');

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
// header選單開合 END //

// DISCOGRAPHY圖片更換 //
const data = [{
    num: 0,
    src: 'dis-img1.png',
  },
  {
    num: 1,
    src: 'dis-img2.png',
  },
  {
    num: 2,
    src: 'dis-img3.png',
  }
];
const disLg = document.querySelector('.dis-block-1');
const disSm = document.querySelector('.dis-block-2');
function changeImg(e) {
  if (e.target.nodeName == 'IMG') {
    let str = '';
    disLg.innerHTML = `
    <div class="dis-img">
      <img src="./assets/img/${data[e.target.dataset.num].src}" alt="" class="img-fluid" data-num="${e.target.dataset.num}">
    </div>
    `;
    for (let i = 0; i < data.length; i++) {
      if (i != e.target.dataset.num) {
        str += `
     <div class="dis-img">
       <img src="./assets/img/${data[i].src}" alt="" class="img-fluid" data-num="${data[i].num}">
     </div>
     `;
      }
    }
    disSm.innerHTML = str;
  }
}
disSm.addEventListener('click', changeImg, false);
// DISCOGRAPHY圖片更換 END //
