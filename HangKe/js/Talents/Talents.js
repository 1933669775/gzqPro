$(function(){ //tab选项卡
	$(".tab_nav li").click(function(){
		$("#tab .tab_container:eq("+ $(this).index() +")").addClass("active").siblings().removeClass("active");
		$(this).addClass("active").siblings().removeClass("active");
	})
})
$(function(){
	var text1="社招"; //初始是固定的
	var text2="行政部";
	var time="2019-08-06";
	var arrBranch=[];
	var arrTime=[];
	var arrText=[];
	$.ajax({
		url:"json/Talents.json",
		type:"get",
		dataType: "json",
		success:function(data){
			$(".Talents4 .btn button").click(function(){
				text1=$(this).text();
				$(this).addClass("btn_active").siblings().removeClass("btn_active");
				json(data,"0");
			})
			$(".Talents4 select:eq(0)").change(function(){
				text2=$("#branch option:selected").text();
				json(data);
			})
			$(".Talents4 select:eq(1)").change(function(){
				time=$("#time option:selected").text();
				json(data);
			})
			$(".get button").click(function(){
				var val=$(".get input").val();
				json(data,"1",val)
			})
			json(data)
		}
	})
	function json(Data,num,val){
		$(".Talents4 ul").empty();
		$.each(Data,function(k,v){
			if(text1==k || num=="1"){
				if(num=="0"){
					$("#time").empty();
					$("#time").append("<option>更新时间</option>");
					$.each(v,function(k,v){
						$("#time").append("<option value='"+k+"'>"+k+"</option>");
					})
				}
				$.each(v,function(k,v){
					if(num=="0"){
						$("#branch").empty();
						$("#branch").append("<option>所属部门</option>");
						$.each(v,function(k,v){
							arrBranch.push(k);
							$.unique(arrBranch);
						})
						$.each(arrBranch,function(i,v){
							$("#branch").append("<option value='"+v+"'>"+v+"</option>");
						})
						arrTime.push(k)
						time=arrTime[0];
						return false;
					}
				})
				$.each(v,function(k,v){
					if(time==k || num=="1"){
						$.each(v,function(k,v){
							if(num=="0"){
								arrText.push(k)
								text2=arrText[0]
							}
							if(k==text2 || num=="1"){
								$.each(v,function(i,v){
									if(v.pots!=undefined){
										if(val!="" && num=="1"){
											jsonContent()
											$(".post:not(:contains("+val+"))").parent().parent().remove()
											console.log(11)
										}else if(num!="1"){
											jsonContent()
										}
										function jsonContent(){
											$(".Talents4 ul").append("<li class='wow fadeInUp'><div class='icon'><p class='post'>"
											+v.pots+"</p><p>"+v.branch+"</p><p>"+v.time+"</p><p>详情</p></div><div class='cont_bott clearfix'><div class='box'><span>岗位职责：</span>"+v.text.responsibility+"</div><div class='box'><span>岗位要求：</span>"+v.text.Job+"</div></div></li>");
										}
									}
								})
							}
						})
					}
				})
			}
		})
		arrBranch=[]
		arrTime=[]
		arrText=[]
		$(".Talents4 ul li .icon").click(function(){
			$(this).toggleClass("icon_active").siblings().stop(true,true).slideToggle();
			$(this).parent().siblings().children(".cont_bott").slideUp().siblings().removeClass("icon_active")
		})
	}
})