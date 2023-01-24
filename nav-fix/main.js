'use strict';

var breakpoint = 1000;
var videoId = '_K_9cCT3-eo';

var tl = new TimelineMax();
TweenMax.set($('.kv_titleImg'), { scale: 0 });
TweenMax.set($('.kv_hero'), { y: "150%" });
//landing ��閧𧞄
function intro() {
	tl.to($('.kv_titleImg'), 1, { scale: 1, ease: Power4.easeInOut });
	tl.staggerTo($('.kv_hero'), 0.5, { y: "0%", ease: Power4.easeInOut }, 0.5, "-=0.5");
}

//loading
$(window).on("load", function () {
	$(".loader").removeClass('active');
	setTimeout(function () {
		intro();
	}, 1500);
});

var imgs = $("img");
var imgLoadingCount = 0;
for (var i = 0; i < imgs.length; i++) {
	if (imgs[i].complete) {
		imgLoadingCount++;
		loading();
	} else {
		imgs[i].addEventListener("load", function () {
			imgLoadingCount++;
			loading();
		}, false);
	}
}

function loading() {
	var progress = parseInt(imgLoadingCount * 100 / imgs.length);
	$(".logo-progress").css('height', progress - 2 + "%");
	$(".progress").html(progress);
}

//��𧢲�麘enu�㮾���
$(".m-menu-opener").on("click", function () {
	$(".menu").toggleClass('active');
	$(".m-menu-opener").toggleClass('close');
});

$(".menu-btn").on("click", function () {
	$(".menu").removeClass('active');
	$(".m-menu-opener").removeClass('close');
});

//������

//LazyLoad
var myLazyLoad = new LazyLoad({
	container: document.getElementsByClassName('product-lightbox')[0]
});

var nowScrollTop;
$(".product>.section-wrapper").on("click", function () {
	nowScrollTop = $(window).scrollTop();
	$(".product-lightbox").addClass('active');
	TweenMax.set($(".page-wrapper"), { className: "-=active", delay: 0.5 });
	toProd($(this).data("prod"), false);
});

$(".close-btn").on("click", function () {
	$(".page-wrapper").addClass('active');
	$(window).scrollTop(nowScrollTop);
	$(".product-lightbox").removeClass('active');
});

$(".next-btn").on("click", function () {
	toProd($(this).data("to"), true);
});

var nowProdIndex = 1;
function toProd(index, isAnimate) {
	if (window.innerWidth > breakpoint) {
		for (var i = 0; i < $(".product-lightbox .section-wrapper").length; i++) {
			var sectionWrapper = $(".product-lightbox .section-wrapper").eq(i);
			var minHeight = sectionWrapper.find(".product-info").height() + sectionWrapper.find(".product-gallery").height() + 131;
			sectionWrapper.css('min-height', minHeight);
		}
	} else {
		$(".product-lightbox .section-wrapper").css('min-height', '');
	}

	var scrolltop = $(".product-lightbox").scrollTop() + $("#prod" + index + "-detail").position().top;
	// console.log(scrolltop);
	if (isAnimate) {
		$(".product-lightbox").animate({
			scrollTop: scrolltop
		}, 400);
		$("#prod" + index + "-detail").scrollTop(0);
	} else {
		$(".product-lightbox").scrollTop(scrolltop);
		$("#prod" + index + "-detail").scrollTop(0);
	}
	nowProdIndex = index;
	ga('send', 'event', 'product', 'click', 'btn_to_detail_' + index);
}

$(window).on("resize load", function () {
	var scrolltop = $(".product-lightbox").scrollTop() + $("#prod" + nowProdIndex + "-detail").position().top;
	$(".product-lightbox").scrollTop(scrolltop);
});

setInterval(function () {
	if (!$(".product-lightbox").hasClass('active')) return;
	var scrolltop = $(".product-lightbox").scrollTop() + $("#prod" + nowProdIndex + "-detail").position().top;
	$(".product-lightbox").scrollTop(scrolltop);

	if (window.innerWidth > breakpoint) {
		for (var i = 0; i < $(".product-lightbox .section-wrapper").length; i++) {
			var sectionWrapper = $(".product-lightbox .section-wrapper").eq(i);
			var minHeight = sectionWrapper.find(".product-info").height() + sectionWrapper.find(".product-gallery").height() + 131;
			sectionWrapper.css('min-height', minHeight);
		}
	} else {
		$(".product-lightbox .section-wrapper").css('min-height', '');
	}
}, 100);

$(".lightbox-btn").on("click", function () {
	$(this).parents("section").find(".prod-lightbox").toggleClass('active');
	myLazyLoad.update();
});

$(".prod-lightbox").on("click", function (e) {
	if ($(e.target).hasClass('prod-lightbox')) {
		$(this).toggleClass('active');
	}
});

// youtube
if (videoId) {
	var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
			height: $(".youtube").outerHeight(),
			width: $(".youtube").outerWidth(),
			videoId: videoId,
			// playerVars: { 'autoplay': 0, 'controls': 1,'showinfo':0,'rel':0,'modestbranding':1,'loop':1},
			events: { 'onStateChange': onPlayerStateChange }
		});
	};

	var onPlayerStateChange = function onPlayerStateChange(event) {
		if (event.data == 1) {
			if (!isPlaying) {
				ga('send', 'event', 'landing', 'click', 'btn_tvc_play');
			}
			isPlaying = true;
		}
	};

	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;

	var isPlaying = false;

	$(".tvc-btn").on("click", function () {
		player.loadVideoById($(this).data("url"));
	});
}

//slide�㮾���
var slides = [];

$(window).ready(function () {
	for (var i = 0; i < $(".slide-layout").length; i++) {
		slides.push($($(".slide-layout")[i]));
		var slide = slides[i].children('.slide-container').children();
		slides[i].children('.slide-container').css("width", 100 * slide.length + "%");
		slides[i].find('.dot').first().addClass('active');
		slides[i].find('.slide').first().addClass('active');
	}
});

setInterval(function () {
	for (var i = 0; i < slides.length; i++) {
		if ($(".product-lightbox").hasClass('active')) {
			if (slides[i].hasClass('autoplay')) {
				var slideLength = slides[i].find('.dot').length;
				var nowIndex = slides[i].find('.dot.active').data("dot");
				var nextIndex = (nowIndex + 1) % slideLength || slideLength;
				slideChange(slides[i], nextIndex);
			}
		}
	}
}, 3000);

$(".slide-layout .arrow-left").on("click", function (argument) {
	var nowIndex = $(this).parents(".slide-layout").find(".dot.active").data("dot");
	if (nowIndex != 1) {
		slideChange($(this).parents(".slide-layout"), nowIndex - 1);
	}
});

$(".slide-layout .arrow-right").on("click", function (argument) {
	var nowIndex = $(this).parents(".slide-layout").find(".dot.active").data("dot");
	if (nowIndex != $(this).parents(".slide-layout").find(".dot").length) {
		slideChange($(this).parents(".slide-layout"), nowIndex + 1);
	}
});

$(".slide-layout .dot").on("click", function (argument) {
	slideChange($(this).parents(".slide-layout"), $(this).data("dot"));
});

function slideChange(slideLayout, slideIndex) {
	// console.log(slideIndex);
	var slideLength = slideLayout.find('.dot').length;
	if (slideIndex == 1) {
		slideLayout.find('.arrow-left').addClass('disable');
	} else {
		slideLayout.find('.arrow-left').removeClass('disable');
	}
	if (slideIndex == slideLength) {
		slideLayout.find('.arrow-right').addClass('disable');
	} else {
		slideLayout.find('.arrow-right').removeClass('disable');
	}
	slideLayout.find('.dot').removeClass('active');
	slideLayout.find('.slide').removeClass('active');
	slideLayout.find('.dot[data-dot=' + slideIndex + ']').addClass('active');
	slideLayout.find('.slide:nth-child(' + slideIndex + ')').addClass('active');
	slideLayout.find('.slide-container').animate({ "margin-left": -slideLayout.width() * (slideIndex - 1) }, 400);
	myLazyLoad.update();
}

$(window).on("resize", function () {
	slides.forEach(function (slideLayout) {
		var slideIndex = slideLayout.find('.dot.active').data("dot");
		slideLayout.find('.slide-container').css({ "margin-left": -slideLayout.width() * (slideIndex - 1) });
		myLazyLoad.update();
	});
});

//info���㮾���
var infos = [];
var infoOpenTime = 500;
var headerHeight = $("header").height();
var infoStickyOffset = $("header").height() + 30;

$(window).ready(function () {
	for (var i = 0; i < $(".info-container").length; i++) {
		infos.push($($(".info-container")[i]));
		$(".info-header").css("width", infos[i].width());
	}
});

var isInfoChanging = false;
$(".info-header").on("click", function (argument) {
	if ($(this).parent().index() === 0) {
		window.open('http://event.family.com.tw/2018_Point/');
		return;
	} else if ($(this).parent().index() === 1) {
		window.open('https://www.family.com.tw/Marketing/Integration/Default.aspx?ID=731');
		return;
	}
	if (!isInfoChanging) {
		var container = $(this).parents(".info-container");
		var wrapper = container.children('.info-content-wrapper');
		var content = container.find('.info-content');

		var contentHeight = content.height() + 50;

		container.toggleClass('active');
		if (container.hasClass('active')) {
			ga('send', 'event', 'info', 'click', 'btn_' + container.attr("id"));
			var infoHeightCanSee = window.innerHeight - content.offset().top + $(window).scrollTop();
			if ($(window).scrollTop() >= $("body").height() - window.innerHeight) {
				$(window).scrollTop($("body").height() - window.innerHeight + headerHeight - 1);
			}
			isInfoChanging = true;
			wrapper.animate({ "height": infoHeightCanSee + "px" }, infoOpenTime, "linear", function () {
				isInfoChanging = false;
				wrapper.css("height", contentHeight + "px");
			});
		} else {
			infoCut(container);
			isInfoChanging = true;
			wrapper.animate({ "height": "0" }, infoOpenTime, "linear", function () {
				isInfoChanging = false;
				content.css("margin-top", "");
				container.find(".info-header").removeClass('sticky');
				container.find(".info-header").css("width", infos[0].width());
			});
		}
	}
});

function infoCut(container) {
	var wrapper = container.find('.info-content-wrapper');
	var content = container.find('.info-content');
	var scrolltop = $(window).scrollTop();
	var windowHeight = window.innerHeight;
	var contentTopOffset = content.offset().top;
	var contentHeight = content.height();

	var topCut = Math.max(scrolltop + headerHeight - contentTopOffset, 0);
	var bottomCut = Math.max(contentHeight - scrolltop + contentTopOffset - windowHeight, 0);
	var viewHeight = contentHeight - topCut - bottomCut;
	// console.log(topCut);
	// console.log(bottomCut);
	wrapper.css("height", viewHeight + "px");
	content.css("margin-top", -topCut + "px");
	$(window).scrollTop(scrolltop - topCut);
}

$(window).on("scroll", function () {
	var scrolltop = $(window).scrollTop();
	for (var i = 0; i < infos.length; i++) {
		//銝羓楠�ế�𪃾
		var upTrigger = infos[i].offset().top - infoStickyOffset;
		if (infos[i].hasClass('active') && scrolltop >= upTrigger) {
			infos[i].children('.info-header').css("width", "");
			infos[i].children('.info-header').addClass('sticky');
		} else if (scrolltop < upTrigger) {
			infos[i].children('.info-header').removeClass('sticky');
			infos[i].children('.info-header').css("width", infos[i].width());
		}

		//銝羓楠�ế�𪃾
		var downTrigger = infos[i].offset().top + infos[i].height() - infos[i].find(".info-header").height() - infoStickyOffset - 30;
		if (infos[i].hasClass('active') && scrolltop >= downTrigger) {
			//閬���嗘�衤�
			infos[i].children('.info-header').addClass('stay');
		} else if ((infos[i].hasClass('active') || isInfoChanging) && scrolltop < downTrigger) {
			//��硺�鈭�
			infos[i].children('.info-header').removeClass('stay');
		}
	}
});

//smooth scroll
var isScrolling = false;
//皛曉�訫�讐宏���
var scrollOffset = $("header").height();
$(function () {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				ga('send', 'event', 'menu', 'click', 'menu_' + $(this).attr('href').substring(1));
				isScrolling = true; // 蝣箔�犏nimate撠梁�堒���𡁜嘑銵� 銋煺�齿��𡁜�灍a
				$('html, body').animate({
					scrollTop: target.offset().top - scrollOffset
				}, 400, function () {
					isScrolling = false;
				});
				return false;
			}
		}
	});
});

//ga
var sections = $(".page-wrapper>section");
var nowSectionID = -1;

$(window).on("scroll", scrollHandler);

function scrollHandler() {
	if (isScrolling == true) return; //�踹�滚�䔶��𨈇ection��惩翰�煺���墧遝��閗���堒�𡁏活 true���凒�𦻖�𣪧���

	var nowScrollTop = $(window).scrollTop();
	for (var i = sections.length - 1; i >= 0; i--) {
		if (nowScrollTop + $(window).height() >= sections.eq(i).offset().top + 50) {
			if (nowSectionID !== i) {
				ga('send', 'pageview', 'page_' + sections.eq(i).attr("id"));
				//�銁��䔶�擃睃漲��閬�銝�韏瑕��
				if (i > 0 && sections.eq(i).offset().top == sections.eq(i - 1).offset().top) {
					ga('send', 'pageview', 'page_' + sections.eq(i - 1).attr("id"));
				}
				nowSectionID = i;
			}
			break;
		}
	}
}

$("#to-boutique").on("click", function () {
	ga('send', 'event', 'menu', 'click', 'menu_boutique');
});