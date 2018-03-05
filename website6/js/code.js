/*=============================================
=                   Menu開關                   =
=============================================*/

function openMenu() {
    document.getElementById("menu").classList.toggle("change");
    document.getElementById("navbar").classList.toggle("show-nav");
}

/*=====  End of        Menu開關         ======*/


/*=============================================
=                  燈箱設定開始                 =
=============================================*/

function openModal() {
    document.getElementById('my-light-box').style.display = "flex";
}

function closeModal() {
    document.getElementById('my-light-box').style.display = "none";
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");

    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

/*=====  End of       燈箱設定結束       ======*/