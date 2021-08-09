var num1=0;
function show1(){
	var detail=document.getElementById("detail");
	var back1=document.getElementById("back1");
	var btn=document.getElementById("btn");
	var p=back1.getElementsByTagName("p");
	num1++	
	funSon(num1,detail,back1,btn,p)
}
var num2=0
function show2(){
	var detai2=document.getElementById("detai2");
	var back2=document.getElementById("back2");
	var btn2=document.getElementById("btn2")
	var p=back2.getElementsByTagName("p");
	num2++	
	funSon(num2,detai2,back2,btn2,p)
}


function funSon(Num,Detail,Back,Btn,p){
	console.log(Num)
	var len=p.length;
	if(Num%2!=1){
		Detail.className="detail"
		Detail.style.padding="0"
		Btn.style.transform="rotate(0)"
		Btn.className="btn"
		Back.style.background="#fff"
		Back.style.border="1px solid #ccc"
		Back.style.borderBottom="none"
		for(;len--;){
			p[len].style.color="#343434"
		}
	}else{
		Detail.className="detail tr_height"
		Detail.style.padding="30px 110px"
		Btn.style.transform="rotate(3959deg)"
		Btn.className="btn active"
		Back.style.border="none"
		Back.style.background="#095dc1"
		for(;len--;){
			p[len].style.color="#fff"
		}
	}
}