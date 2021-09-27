$(function() { //fullpage插件
	$('#dowebok').fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4',"page5","page6","page7"],
		menu: '#menu',
		onLeave:function(index, nextIndex, direction){ //滚动监听
			if(nextIndex==2){ //当滚到2屏的时候
				setTimeout(function(){
					$("#back_2").addClass("back_active");
				},500)
			}else{
				$("#back_2").removeClass("back_active");
			}
			if(nextIndex==3){ //当滚到2屏的时候
				setTimeout('progress()',800)
			}else{ 
				setTimeout(function(){ //动画清零
					$('.pie_progress1').asPieProgress('reset','0');
					$('.pie_progress2').asPieProgress('reset','0');
					$('.pie_progress3').asPieProgress('reset','0');
				},800)
			}
		},
	});
	$(window).resize(function() {
		autoScrolling();
	});
	function autoScrolling() {
		var $ww = $(window).width();	
		if ($ww < 1025) {
			$.fn.fullpage.setAutoScrolling(false);
		} else {
			$.fn.fullpage.setAutoScrolling(true);
		}
	}
	autoScrolling();
	
	
	var swiper = new Swiper('.swiper-container1', { //二屏轮播
	  slidesPerView: 1,
	  spaceBetween: 30,
	  loop: true,
	  pagination: {
	    el: '.swiper-pagination',
	    clickable: true,
	  },
	});
	var swiper = new Swiper('.swiper-container2', { //六屏轮播
	      slidesPerView: 3,
	      spaceBetween : '3.77%',
	      slidesPerGroup: 3,
	      loop: true,
	      loopFillGroupWithBlank: true,
	});
	$('.pie_progress1').asPieProgress({ //屏3圆形进度条
		namespace: "pie_progress1",
		x1:2800,
	});
	$('.pie_progress2').asPieProgress({
		namespace: "pie_progress2",
		x1:500,
	});
	$('.pie_progress3').asPieProgress({
		namespace: "pie_progress3",
		x1:50,
	});
});

function progress(){
	$('.pie_progress1').asPieProgress('go','100');
	setTimeout(function(){
		$('.pie_progress2').asPieProgress('go','100');
	},300)
	setTimeout(function(){
		$('.pie_progress3').asPieProgress('go','100');
	},500)
}