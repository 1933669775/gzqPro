$(function(){
	var start=false; //开始
	var mainX; //飞机位置 X
	var mainY; //飞机位置 Y
	var mainWidth; //飞机宽度
	var mainHeight; //飞机高度
	var mainTop; //飞机TOP值
	var mainLeft; // 飞机left值
	var cartridgeT; //生成子弹的计时器
	var cartridgeTopT; //子弹前进的计时器
	var foeT; //生成敌人计时器
	var foeBottm; //敌人前进计时器
	var foeTop; //敌人的top位置
	var foeLeft; //敌人的left位置
	var foeHeight; //敌人高度
	var foeWidth; //敌人宽度
	var mark=0; //分数
	var foeLife=5; //敌人生命值
	var num=foeLife; //减少的生命值
	var cartridge; //子弹本弹
	var foeCartridge; //敌人的子弹
	var foeCartridgeTop; //敌人子弹的top值
	var foeCartridgeLeft; //敌人子弹的left值
	var foeCartridgeNum=0; //敌方子弹数量
	var foeCartridgeTopTime; //敌人子弹移动
	var flag=true; //敌人子弹难易度判断
	var foeCartridgeLeftNum=0; //敌人子弹的left值改变 //困难模式专用
	var foeCartridgeTopNum=0; //敌人子弹的top值改变 //困难模式专用
	$(".begin").click(function(){
		start=true;
		if(start==true){
			$(this).hide();
			cartridgeFun();
			foe($(".difficulty input:checked").val()); //敌人
			main();
			$("html").css("cursor","none"); //鼠标箭头消失
			$("h1").remove();
			$(".plan").after("<div class='main'></div>"); //生成飞机
			$(".difficulty").hide()
		}
	})
	function main(){
		$("body").mousemove(function(){ //飞机跟随鼠标移动
			mainX=event.clientX;
			mainY=event.clientY;
			$(".main").css({top:mainY-($(".main").height()/2)+"px",left:mainX-($(".main").width()/2)+"px"}).show();//让飞机保持在鼠标中间
		})
	}
	function cartridgeFun(){ //子弹
		var CrtridgeSpeed=5; //子弹速度
		var CrtridgeAppend=120; // 子弹生成频率
		cartridgeT=setInterval(function(){//生成子弹
			$(".main").before("<p style='top:"+(mainY-($(".main").height()/2))+"px;left:"+mainX+"px;' class='cartridge'></p>");//让子弹每次生成的时候都在飞机最上方
		},CrtridgeAppend);
		cartridgeTopT=setInterval(function(){ //子弹前进
		var cartridgeTop; //子弹的top值
		var cartridgeLeft; //子弹的left值
			$.each($(".cartridge"),function(){
				cartridgeTop=$(this).position().top;
				cartridgeLeft=$(this).position().left;
				cartridge=$(this)
				$(this).css("top",cartridgeTop-CrtridgeSpeed) //获取子弹的top值并在该top值的基础上减
				if(cartridgeTop<0){
					$(this).remove(); //当子弹到达顶部删除子弹
				}
				$.each($(".foe"),function(){ //摧毁敌人
					foeTop=$(this).position().top;
					foeLeft=$(this).position().left;
					foeWidth=$(this).width();
					foeHeight=$(this).height();
					// 小于敌人上面的距离加敌人本身的高度
					// 大于敌人左边的距离，小于敌人左边的距离加敌人本身的宽度等于敌人右边的距离
					if((cartridgeTop<foeTop+foeHeight) && (cartridgeLeft>foeLeft) && (cartridgeLeft<foeLeft+foeWidth)){
						num--//当子弹命中目标
						cartridge.remove(); //删除子弹
						$(this).children(".life").html("生命"+num)
						if(num==0){ //每命中一次生命-1,减至零删除
							$(this).empty();
							$(this).addClass("blast").animate({padding:"0"},100,function(){
								$(this).remove();
							})
							num=foeLife;
							mark++
						}
						$("#mark span").html(mark);
					}
				})
			});
		},8)
	}
	function foe(V){ //敌人
		foeT=setInterval(function(){ //创造敌人
			var foeX=Math.floor(Math.random()*$("body").width()); //敌人的生成坐标;
			var lifeNum=0;
			$.each($(".life"),function(i,v){
				lifeNum=i;
			})
			if(lifeNum<2){//控制敌人飞机数量，太多会很卡
				$("body").append("<div class='foe' style='left:"+foeX+"px;'><p></p><p class='life'>生命"+foeLife+"</p></div>");
			}
		},800) //创造敌人速度
		foeBottm=setInterval(function(){ //敌人前进
			$.each($(".foe"),function(){
				$(this).css("top",$(this).position().top+1);
				if($(this).position().top>$("body").height()){
					$(this).remove(); //到达小于屏幕宽度消失
				}
			})
		},100)
		foeCartridge=setInterval(function(){ //生成敌人子弹
			$.each($(".foe"),function(i,v){
				foeTop=$(this).position().top;
				foeLeft=$(this).position().left;
				foeWidth=$(this).width();
				foeHeight=$(this).height();
				$.each($(".foeCartridge"),function(i){
					foeCartridgeNum=i;
				})
				if(foeCartridgeNum<30){ //子弹数量在屏幕上永远不超过三十个
					$(this).before("<p class='foeCartridge' style='top:"+(foeTop+foeHeight)
					+"px; left:"+(foeLeft+(foeWidth/2))+"px;'></p>");
				}
			})
		},2000)
		foeCartridgeTopTime=setInterval(function(){ //敌人子弹移动
			$.each($(".foeCartridge"),function(){
				foeCartridgeTop=$(this).position().top;
				foeCartridgeLeft=$(this).position().left;
				foeCartridgeHeight=$(this).height();
				foeCartridgeWidth=$(this).width();
				if(foeCartridgeTop>$("body").height()){
					$(this).remove();
				}
				if(V==1){ //难度
					foeCartridgeTopNum++
					if(foeCartridgeLeft>$("body").width()){
						flag=false;
					}else if(foeCartridgeLeft<0){
						flag=true;
					}
					if(flag==true){ //困难模式
						$(this).css("left",foeCartridgeLeft+45) //敌人子弹移动距离
					}else if(flag==false){
						$(this).css("left",foeCartridgeLeft-45) //敌人子弹移动距离
					}
					$(this).css("top",foeCartridgeTop+8) //敌人子弹移动距离
				}else{ //简单
					$(this).css("top",foeCartridgeTop+8) //敌人子弹移动距离
				}
				$.each($(".main"),function(){
					mainWidth=$(this).width();
					mainHeight=$(this).height();
					mainTop=$(this).position().top;
					mainLeft=$(this).position().left;
					// 摧毁飞机判断,当小于飞机四周的top、left值的时候，游戏失败
					if(mainTop<(foeCartridgeTop+(foeCartridgeHeight/2)) && (foeCartridgeLeft+(foeCartridgeWidth/2))>mainLeft && (foeCartridgeLeft+(foeCartridgeWidth/2))<(mainLeft+mainWidth) && foeCartridgeTop<(mainTop+mainHeight)){
						start=false;
						stop()
					}
				})
			})
		},10) //敌人子弹移动速度
	}
	function stop(){ //结束 按部就班的清除
		clearInterval(cartridgeT);
		clearInterval(cartridgeTopT);
		clearInterval(foeT);
		clearInterval(foeBottm);
		clearInterval(foeCartridge);
		clearInterval(foeCartridgeTopTime)
		$(".cartridge,.foeCartridge,.foe,.main").remove();
		$(".begin").show();
		$("html").css("cursor","default"); //鼠标箭头消失
		$("#mark span").html(0)
		$("body").append("<h1>您上次的分数为："+mark+"分<h1>")
		mark=0;
		$(".difficulty").show()
	}
})
