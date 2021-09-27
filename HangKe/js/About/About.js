function swiper1(){ //第一个swiper
	var swiper1_1 = new Swiper('.swiper-container1', {
		slidesPerView: 3,
		spaceBetween: "2%",
		centeredSlides: true,
		on: {
			slideChange: function(swiper,event){
				swiper1_2.slideToLoop(swiper.activeIndex, 400, true);
			},
		},
		breakpoints:{
			768:{
				slidesPerView: 7
			}
		}
	});
	var swiper1_2 = new Swiper('.swiper-container-h',{
		spaceBetween: 50,
		on:{
			slideChange: function(swiper,event){ 
				swiper1_1.slideToLoop(swiper.activeIndex, 200, true);
			},
		},
	});
	var swiper1_2_ = new Swiper('.swiper-container-h_',{
		slidesPerView: 1,
		spaceBetween: 30,
		pagination: {
		el: '.swiper-pagination',
		clickable: true,
		},
		navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
		},
	});
	$(function(){
		$('#swiper-container1 .swiper-slide').click(function(){
			swiper1_2.slideToLoop($(this).index(), 200, true);
			swiper1_1.slideToLoop($(this).index(), 200, true);
		})
	})
}
swiper1()
$(function(){	 //tab选项卡
	var arrText=["研发团队规模","六大研究所","技术先进性","技术引领性"]
	$("#tab_nav .btn").click(function(){
		var index=$(this).index()
		$("#tab_text").html(arrText[index]);
		$(this).addClass("tab_nav_active").siblings().removeClass("tab_nav_active");
		$("#tab_box .container:eq("+ index +")")
		.addClass("tab_box_active").siblings("").removeClass("tab_box_active");
	})
})
function swiper2(){ //第二个进度条swiper
	var swiper = new Swiper('.swiper-container2', {
	    pagination: {
	      el: '.swiper-pagination',
	      type: 'progressbar',
	    },
		slidesPerView: 1,
		spaceBetween: "4%",
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    },
		breakpoints:{
			768:{
				slidesPerView: 3
			}
		}
	});
}
swiper2()
function swiper3(){ //第三个swiper
	var swiper = new Swiper('.swiper-containe3', {
	      slidesPerView: 2,
	      spaceBetween: 20,
	      slidesPerGroup: 2,
		  slidesPerColumn: 2,
	      loopFillGroupWithBlank: true,
	      pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	      },
		  breakpoints:{
		  	768:{
		  		slidesPerView: 5,
				spaceBetween: 70,
				slidesPerGroup: 5,
				slidesPerColumn: 2,
		  	}
		  }
	});
}	
swiper3()
$(function(){ //内容6
	$("#About_6 .list").hover(function(){
		$(this).addClass("list_active").siblings().removeClass("list_active")
	})
})





