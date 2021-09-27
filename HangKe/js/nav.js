$(function() {
	$(".staff").hover(function() { //员工入口出现消失
		$(this).find("ul").stop().fadeIn()
	}, function() {
		$(this).find("ul").stop().fadeOut()
	})
	$("header .contacts div").hover(function() { //联系方式二级导航出现消失
		$(this).find("ul").stop().fadeIn()
	}, function() {
		$(this).find("ul").stop().fadeOut()
	})
	$(".nav").click(function() { //导航按钮
		$(this).find("img").toggleClass("nav_acrive")
	})
	var num = 0; //大屏导航出现消失动画
	$(".nav").click(function() { 
		num++
		if (num % 2 == 1) { 
			$(".back").css({ 
				transform: 'translate(50%,-50%) scale(1)', //点击放大,层级升高
				zIndex: '1000',
			}).animate({ //这里是为了有个过渡显得导航出现不是那么突兀，因为animate不支持transform
				padding: "0"
			}, 400, function() {
				$(this).siblings("nav").css({ //导航出现
					zIndex: "1000"
				}).animate({
					opacity: "1",
				})
			})
		} else {
			$("nav").animate({ //导航消失
				opacity: "0"
			}, 100, function() {
				$(this).css({
					zIndex: "-1000"
				}).siblings(".back").css({ //背景缩小
					transform: 'translate(50%,-50%) scale(0)',
				})
			})
		}
	})
	var ArrNavImg=["20190806221239_1417.jpg","20190806202020_3312.jpg","20190807092856_8007.jpg","20190806211049_0595.jpg","20190806200532_4102.jpg","20190806204744_0580.jpg","20190806204838_3651.jpg","20190806204931_5982.jpg"]; //存放nav背景图片
	$.each(ArrNavImg,function(i,v){ //插入背景图
	var son=$("header").attr("class");
		if(son=="son"){ //判断是否是子页面
			$("#nav_img").append("<div class='img' style='background: url(../../img/index/"+ v +") center /100% 100%;'></div>");
		}else{
			$("#nav_img").append("<div class='img' style='background: url(img/index/"+ v +") center /100% 100%;'></div>");
		}
	})
	$("nav ul li").hover(function(){ //鼠标经过li让背景图出现
		$("#nav_img .img:eq("+ ($(this).index()-1) +")").addClass("nav_img_active");
	},function(){
		$("#nav_img .img:eq("+ ($(this).index()-1) +")").removeClass("nav_img_active");
	})
	
	// 小屏导航
	$("#nav_lt>li>p").click(function(){ //导航列表显示隐藏
		$(this).toggleClass("nav_lt-Imgactive").siblings("ul").stop(true).slideToggle()
		.parent().siblings().children("ul").slideUp().siblings().removeClass("nav_lt-Imgactive");
	});
	$("#nav_menu").click(function(){ //来
		$("#back_lt").removeClass("back_lt_active");
		$("#nav_lt").removeClass("nav_lt_active");
	})
	$("#back_lt").click(function(){ //回
		$("#back_lt").addClass("back_lt_active");
		$("#nav_lt").addClass("nav_lt_active");
	})
	$("title").html("杭可科技")
})
