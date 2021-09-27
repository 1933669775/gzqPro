$(function(){
	//渲染json
	var $box;
	var arrIndexMax=0;
	$.ajax({
		type: "GET",
		url: "json/products.json",
		dataType: "json",
		success:function(data){
			var index=0;
			var data=data;
			$.each(data,function(k,v){
				if(k==0){
					json(v)
				}
			})
			$("#menu_bar .box").click(function(){
				$(".products_wrap1").show();
				$(".products_wrap2").hide();
				index=$(this).index();
				$(".h2").html($(this).text())
				$(this).addClass("bar_active").siblings().removeClass("bar_active")
				$.each(data,function(k,v){
					if(index==k){
						json(v)
					}
					if(index==4 || index==6){
						$(".paging_content").hide()
					}else{
						$(".paging_content").show()
					}
				})
				$box=$(".products_wrap1 .box")
				skip($box)
			})
			$box=$(".products_wrap1 .box")
			skip($box)
			function skip($Box){
				$Box.click(function(){
					$(".products_wrap1").hide();
					$(".products_wrap2").show();
					$(".products_wrap2 .products_son_content").empty();
					var ThisIndex=$(this).index()
					var Content;
					$.each(data,function(k,v){
						var son="1" + index;
						if(k==son){
							$.each(v,function(i,v){
								Content=v
								$.each(v,function(k,v){
									if(ThisIndex==i){
										$("#h3").html(Content.title)
										if(k=="text"){
											$(".products_wrap2 .products_son_content").append("<img src='img/products/"+
											Content.img+"'/>" + Content.text);
										}else if(k=="Parameter"){
											$(".products_wrap2 .products_son_content").append("<img alt='' src='img/products/"+
											Content.img+"'/><h4>▶▶设备功能</h4><p>"+ Content.DeviceFunction 
											+"</p><h4>▶▶技术特性</h4>" + Content.feature + "<h4>▶▶性能参数</h4><table width='500' class='table' border='1' cellpadding='0' cellspacing='0'></table>");
											var $td;
											var num=-1;
											$.each(Content.Parameter,function(i,v){
												$.each(v,function(k,v){
													num++
													$(".table").append("<tr></tr>")
													$(".table tr:eq("+ num +")").append("<td>"+ k +"</td><td>"+ v +"</td>")
												})
											})
										}else if(k=="Img"){
											$(".products_wrap2 .products_son_content").append("<img src='img/products/"+
											Content.Img+"'/>")
										}
									}
								})
							})
						}
					})
				})
			}
		}
	})
	function json(V){
		$("#products .wrap").empty();
		$(".paging_btn").empty();
		$(".paging_max").remove()
		$.each(V,function(i,v){
			$(".products_wrap1 #products .wrap").append("<a href='"+
			v.url+"' class='box wow fadeInUp' data-wow-duration='.3s' data-wow-delay='.4s'><div class='left' style='background: url(img/products/"+
			v.img+") top center/cover;'></div><div class='right'><p>"+
			v.text+"</p><div class='btn'>查看详情</div></div></a>")
		})
		$(".products_wrap1 #products .wrap").paging({
			PageNum:4,
			pagingBtnPaging:false,//按钮是否分页
			pageMax:true,
			pagingDisplay:"flex",
			pageDownUpHide:true,
		})
	}
})