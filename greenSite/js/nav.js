var nav = document.getElementById("nav");
var nav30 = document.getElementById("nav30");
var navz = document.getElementById("navz-in");
var nav31 = document.getElementById("nav31");

function vanish() {
	navz.style.left = "100%"
	nav.style.left = "100%"
	nav31.style.opacity = "0"
	nav31.style.zIndex = "-100"
}
function show() {
	nav30.style.display = "block"
	navz.style.left = "0%"
	nav.style.left = "0%";
	nav31.style.opacity = "1"
	nav31.style.zIndex = "10000"
}


function height() {
	var navHeight = document.getElementById("nav-height");
	var navObj = document.getElementById("active-warp").children;
	var activeNav = document.getElementById("active-nav");
	scrHeight(navHeight) //滚动
	for (i = 0; i < navObj.length; i++) {
		// 索引
		navObj[i].index = i
		// 鼠标经过
		activeNav.className="active"
		navObj[i].onmouseover = function() {
			if (this.id != "active-nav") {
				activeNav.className=null
				if (this.index == 1 || this.index == 2 || this.index == 4 || this.index == 5 || this.index == 6) {
					//判断展开，让指定的li展开
					navHeight.style.height = "64px"
					navHeight.style.transition = ".8s"
				}
			} else {
				activeNav.className="active"
				// 追加的判断 不然会出bug
				if(this.index!=0 && this.index!=3){
					navHeight.style.height = "64px"
					navHeight.style.transition = ".8s"
				}
			}
		}
		// 鼠标移出
		navObj[i].onmouseout = function() {
			if (this.id != "active-nav") {
				activeNav.className="active"
				if (this.index == 1 || this.index == 2 || this.index == 4 || this.index == 5 || this.index == 6) {
					navHeight.style.height = "0"
					navHeight.style.transition = ".8s"
				}
			}else{
				// 追加的判断
				if(this.index!=0 && this.index!=3){
					navHeight.style.height = "0"
					navHeight.style.transition = ".8s"
				}
			}
		}
	}
}
height()

function navbar(){
	var nav=document.getElementsByClassName("navbar");
	var nav_1=document.getElementsByClassName("panel");
	for(var i=0;i<nav.length;i++){
		nav[i].index=i
		nav[i].onclick=function(){
			Nav_1(nav_1)
			if(nav_1[this.index].className=="navli-box panel"){
				nav_1[this.index].className="navli-box panel nav-line"
				if(this.index==0){
					nav_1[this.index].style.height="170px"
				}else if(this.index==1){
					nav_1[this.index].style.height="130px"
				}else if(this.index==2){
					nav_1[this.index].style.height="270px"
				}else{
					nav_1[this.index].style.height="80px"
				}
				
			}else{
				nav_1[this.index].style.height="0"
				nav_1[this.index].className="navli-box panel"
			}
		}
		nav[0].childNodes[1].href="##"
		nav[1].childNodes[1].href="##"
	}
}	
navbar()
function Nav_1(pav_1){
	for(i=0;i<pav_1.length;i++){
		if(pav_1[i].className=="navli-box panel nav-line"){
			pav_1[i].style.height="0"
			pav_1[i].className="navli-box panel Active"
		}else{
			pav_1[i].className="navli-box panel"
		}
	}
}


// 鼠标滚动导航
function scrHeight(NavHeight){
window.onscroll=function(){
	var scrollBody = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	var aObj=document.getElementById("header").getElementsByTagName("a");
	var logo=document.getElementById("logo");
	if(scrollBody!=0){
		for(i=0;i<aObj.length;i++){
			aObj[i].style.padding="20px 0"
			aObj[i].style.transition=".5s"
			aObj[i].className="after"
		}
		NavHeight.style.top="61px"
		logo.style.padding="8.555px 0"
	}else{
		for(i=0;i<aObj.length;i++){
			aObj[i].style.padding="30px 0"
			aObj[i].style.transition=".5s"
			aObj[i].className="huifu"	
		}
		NavHeight.style.top="81px"
		logo.style.padding="18.555px 0"
	}
}
}


