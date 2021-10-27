class person { //构造
	constructor(tag) {
		this.tag = tag;
	};
}
let Main = new person({ //实例化
	"go": document.getElementById("go"), //存放标签
	"difficulty": document.getElementsByName("difficulty"),
	"container": document.getElementById("container"),
	"burrows": document.getElementsByClassName("burrows"),
	"body": document.getElementsByTagName("body")[0],
	"susliks": document.getElementsByClassName("susliks"),
	"initial":document.getElementById("initial"),
	"wrapLife":document.getElementById("wrapLife"),
	"life":document.getElementById("life"),
	"h1":document.getElementById("h1"),
	"wrapMark":document.getElementById("wrapMark"),
	"mark":document.getElementById("mark"),
	"endBox":document.getElementById("endBox"),
	"wrap":document.getElementById("wrap"),
	"timing":document.getElementById("timing"),
	"finishMarkWrap":document.getElementById("finishMarkWrap"),
	"timingT":"time",
	"susliksTime":0,
	"markNum":0,
	"MarkNum":0,
	"InfiniteNum":0,
	"mod":"默认",
});
Object.assign(person.prototype,{
	createHole(size) { //地洞
		Main.tag.container.innerHTML = "";
		for (; size--;) {
			let divObj = document.createElement("div");
			divObj.className = "burrows";
			Main.tag.container.appendChild(divObj);
			divObj.onclick=function(){
				this.firstChild!=null?Main.susliksRemove(this.firstChild):false;
			}
		}
	},
	hammerMove() { //锤子
		let hammerObj=document.createElement("div");
		hammerObj.id="hammer";
		document.body.appendChild(hammerObj);
		document.getElementsByTagName("html")[0].style.cursor="none"; 
		return Main.tag.body.onmousemove = function() {
			let X = event.clientX,
				Y = event.clientY;
			hammerObj.style.top = `${Y-(hammerObj.clientWidth)/5}px`;
			hammerObj.style.left = `${X-(hammerObj.clientHeight/3)}px`;
		}
	},
	susliksHole(HoleTime) { //创建地鼠
	let arrJudge=[0,1,2],
	susliksT;
		return susliksT=setInterval(() => {
			let len = Main.tag.burrows.length,
			ran = Math.floor(Math.random() * len),
			divObj,
			immortal;
			if(Main.tag.timing.innerText<=0 || Main.tag.life.innerText<=0){
				clearInterval(susliksT)
			}else{
				if(Main.tag.burrows[ran].firstChild==null){
					if(arrJudge[Math.floor(Math.random()*3)]){
						divObj = document.createElement("div")
						divObj.className = "susliks";
						Main.tag.burrows[ran].appendChild(divObj);
					}else{
						immortal = document.createElement("div")
						immortal.className = "immortal";
						Main.tag.burrows[ran].appendChild(immortal);
					}
				}
			}
		}, HoleTime)
	},
	susliksMove(mode) { //地鼠动
	let susliksMoveT;
		return susliksMoveT=setInterval(() => {
			let burrows=Main.tag.burrows,
			len = burrows.length;
			for (; len--;) {
				if(burrows[len].firstChild!==null){
					burrows[len].firstChild.style.animation=`susliksMove ${Main.tag.susliksTime}s`;
					if(burrows[len].firstChild.offsetTop>65){
						burrows[len].firstChild.className=="susliks"?Main.tag.life.innerText--:false;
						burrows[len].firstChild.remove();
						if(mode=="无尽"){
							Main.end(susliksMoveT);
						}
					}
				}
			}
		}, 5)
	},
	susliksRemove(This){ //删除地鼠
		if(This.className=="susliks"){
			Main.tag.MarkNum+=Main.tag.markNum;
			This.style.backgroundImage="url(img/地鼠被打.png)";
			Main.tag.life.innerText++
			Main.litMark("+"+Main.tag.markNum);
		}else{
			This.style.backgroundImage="url(img/仙女被打.gif)";
			Main.tag.MarkNum-=Main.tag.markNum*2;
			Main.tag.life.innerText--;
			Main.litMark("-"+Main.tag.markNum*2);
		};
		setTimeout(()=>{
			This.remove()
		},120);
		Main.tag.mark.innerHTML=Main.tag.MarkNum;
	},
	go(){ //开始
		this.tag.initial.style.display="none";
		this.tag.wrapLife.style.display="flex";
		this.tag.h1.style.display="none";
		this.tag.wrapMark.style.display="flex";
		this.tag.timing.style.display="block";
		Main.tag.markNum=10;
		Main.tag.timing.innerText=50;
		Main.tag.life.innerText=10;
		Main.tag.finishMarkWrap.style.display="none"
		document.getElementById("explain").style.display="none"
	},
	litMark(num){ //锤子打击出现分数
		let goMrak=document.createElement("p"),
		X = event.clientX,
		Y = event.clientY;
		goMrak.className="goMrak";
		goMrak.innerHTML=`${num}`;
		goMrak.style.top=`${Y+10}px`;
		goMrak.style.left=`${X+10}px`;
		goMrak.style.animation="goMrak 0.5s";
		document.body.appendChild(goMrak);
		parseInt(num)>0?goMrak.style.color="red":goMrak.style.color="#000";
		setTimeout(()=>{
			goMrak.remove();
		},500);
	},
	lit(){ // 锤子打击动画
		let count=0;
		return document.body.onclick=function(){
			count++
			if(document.getElementById("hammer")){
				let hammer=document.getElementById("hammer");
				if(count!=1){
					hammer.style.animation="lit 0.3s";
					setTimeout(()=>{
						hammer.style.animation="";
					},300);
				}
			}
		}
	},
	
	timingInfinite(){ //无尽模式定时
		let timingInfiniteT;
		return timingInfiniteT=setInterval(()=>{
			Main.tag.InfiniteNum++
			if(Main.tag.life.innerText<=0){
				clearInterval(timingInfiniteT);
			}else{
				if(Main.tag.InfiniteNum==10){
					Main.susliksHole(500);
					Main.tag.susliksTime=1.4;
				}else if(Main.tag.InfiniteNum==20){
					Main.susliksHole(450);
					Main.tag.susliksTime=1.3;
				}else if(Main.tag.InfiniteNum==40){
					Main.susliksHole(430);
					Main.tag.susliksTime=1.2;
				}else if(Main.tag.InfiniteNum==60){
					Main.susliksHole(420);
					Main.tag.susliksTime=1.1;
				}else if(Main.tag.InfiniteNum==80){
					Main.susliksHole(400);
					Main.tag.susliksTime=1;
				}else if(Main.tag.InfiniteNum==100){
					Main.susliksHole(380);
				}else if(Main.tag.InfiniteNum==200){
					Main.susliksHole(350);
				}else if(Main.tag.InfiniteNum==300){
					Main.susliksHole(330);
					Main.tag.susliksTime=0.9;
				}else if(Main.tag.InfiniteNum==400){
					Main.susliksHole(300);
				}else if(Main.tag.InfiniteNum==500){
					Main.susliksHole(250);
					Main.tag.susliksTime=0.8;
				}else if(Main.tag.InfiniteNum==600){
					Main.susliksHole(200);
					Main.tag.susliksTime=0.8;
				}
			}
		},1000)
	},
	finishMark(){
		let li=document.createElement("li");
		li.innerHTML=`模式：<p class='mod'>${Main.tag.mod}</p>分数：<p class='finishMark'>${Main.tag.mark.innerText}</p>`
		Main.tag.finishMarkWrap.appendChild(li)
	},
	timing(){ //普通模式定时
		let timingT;
		return timingT=setInterval(()=>{
			Main.tag.timing.innerText--
			Main.end(timingT);
			if(Main.tag.timing.innerText==40){
				Main.susliksHole(500);
				Main.tag.susliksTime=1.1;
			}else if(Main.tag.timing.innerText==20){
				Main.susliksHole(400);
				Main.tag.susliksTime=0.9;
			}
		},1000)
	},
	end(T){ //结束
		if(Main.tag.life.innerText<=0 || Main.tag.timing.innerText<=0){
			Main.finishMark()
			clearInterval(T);
			Main.tag.container.innerHTML="";
			Main.tag.initial.style.display="block";
			Main.tag.timing.style.display="none"
			Main.tag.wrapLife.style.display="none";
			Main.tag.h1.style.display="block";
			Main.tag.wrapMark.style.display="none";
			document.getElementById("hammer").remove();
			document.getElementsByTagName("html")[0].style.cursor="auto"; 
			Main.tag.MarkNum=0;
			Main.tag.markNum=0;
			Main.tag.mark.innerText=0;
			Main.tag.wrap.style.display="none";
			Main.tag.endBox.style.display="block"
			Main.tag.finishMarkWrap.style.display="block"
			document.getElementById("explain").style.display="block"
			Main.tag.InfiniteNum=0;
			setTimeout(()=>{
				Main.tag.wrap.style.display="block";
				Main.tag.endBox.style.display="none";
			},1000)
		}
	}
})
Main.tag.go.onclick = function() { // 开始
	Main.hammerMove();
	Main.go();
	Main.lit();
	Main.tag.difficulty.forEach((v, i, arr) => {
		if (v.checked) {
			Main.createHole(12) //创建地洞
			if(v.value==0){ //无尽
				Main.susliksHole(600); //创建地鼠时间
				Main.susliksMove("无尽"); //地鼠移动时间
				Main.tag.timing.style.display="none";
				Main.tag.susliksTime=1.5;
				Main.timingInfinite();
				Main.tag.mod="无尽"
			}else{ //普通
				Main.tag.wrapLife.style.display="none";
				Main.timing()
				Main.tag.life.innerText=100;
				Main.susliksHole(600);
				Main.susliksMove("普通");
				Main.tag.susliksTime=1.2;
				Main.tag.mod="普通"
			}
		}
	});
}




