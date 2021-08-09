function swiper(){
	var btn1=document.getElementById("btn1");
	var btn2=document.getElementById("btn2");	
	var swiper1=document.getElementById("swiper1");
	var swiper2=document.getElementById("swiper2");
	var swiper3=document.getElementById("swiper3");
	var swiper4=document.getElementById("swiper4");
	btn2.onclick=function(){
		swiper2.className="swiper-container swiper-container2"
		swiper1.className="swiper-container swiper-container2 show"
		this.className="btn active"
		btn1.className="btn"
		swiper4.style.height="auto"
		swiper4.style.paddingBottom="50px"
		swiper3.style.height="0"
		swiper3.style.paddingBottom="0"
		
	}
	btn1.onclick=function(){
		swiper1.className="swiper-container swiper-container2"
		swiper2.className="swiper-container swiper-container2 show"
		this.className="btn active"
		btn2.className="btn"
		swiper3.style.height="auto"
		swiper3.style.paddingBottom="50px"
		swiper4.style.height="0"
		swiper4.style.paddingBottom="0"
	}
	
}
swiper()