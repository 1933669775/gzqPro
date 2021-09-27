$(function(){
	$.ajax({
		url:"json/news.json",
		type:"get",
		dataType: "json",
		success:function(data){
			$.each(data,function(k,v){
				$("#menu_bar .wrap .box").click(function(){
					var index=$(this).index();
					$(this).addClass("bar_active").siblings().removeClass("bar_active");
					if(index==k){
						$(".news .wrap").empty();
						$(".paging_btn").empty();
						json(k)
					}
				})
				if(k=="0"){
					json(k)
				}
				function json(K){
					$.each(v,function(i,v){
						$(".news .wrap").append("<a href='son/news/"+ 
						v.href +"' class='content'><div class='box'><div class='num'>"
						+v.num+"</div><div class='time'>"
						+ v.time +"</div><div class='img'><img src='img/news/"+
						v.img+"'></div><div class='text'>"
						+ v.text +"</div><div class='btn'><span>VIEW MORE</span><img src='img/news/newjt.png' ></div></div></a>");
					})
					if(k=="0"){
						$(".news .wrap").paging({
							PageNum:4,
							pagingBtnPaging:true,
							pageMax:true,
							pagingDisplay:"block",
							pageDownUpHide:false,
							pagingBtnHide:true,
							pagingBtnPost:true,
							pagingBtnNum:true,
						})
					}else{
						$(".news .wrap").paging({
							PageNum:4,
							pagingBtnPaging:true,
							pageMax:true,
							pagingDisplay:"block",
							pageDownUpHide:false,
							pagingBtnHide:true,
							pagingBtnPost:true,
							pagingBtnNum:true,
						})
						$(".paging_down,.paging_up").unbind();
					}
				}
			})
		}
	})
})
