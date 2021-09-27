$(function(){
	$(".Investor2_btn .btn").click(function(){
		$(this).addClass("active_btn").siblings().removeClass("active_btn");
		$(".box .Investor2_box:eq("+ $(this).index() +")").removeClass("none").siblings().addClass("none");
	});
	$.ajax({
		url:"json/Investor.json",
		type:"get",
		dataType: "json",
		success:function(data){
			$.each(data,function(k,v){
				function json(){
					$.each(v,function(i,v){
						$(".tab_content .box").append("<li><a class='ellipsis' target='_blank' title='"+ v.text +"' href='"+ v.href +"'><i class='icon ion-arrow-right-b'></i>"+ v.text +"</a><span class='time'>"+ v.time +"</span></li>");
					})
					$(".announcement .box").paging({
						PageNum:10,
						pagingBtnPaging:true,//按钮是否分页
						pageMax:false,
						pagingDisplay:"flex",
						pageDownUpHide:true,
					})
				}
				if(k=="0"){
					 json()
				}
				$(".announcement .btn").click(function(){
					var index=$(this).index()
					$(this).addClass("ann_active").siblings().removeClass("ann_active");
					if(index==k){
						$(".tab_content .box").empty();
						$(".paging_btn").empty();
						json()
						if(index=="1"){
							$(".paging_btn").empty();
							$(".announcement .box").paging({
								PageNum:10,
								pagingBtnPaging:false,
								pageMax:false,
								pagingDisplay:"flex",
								pageDownUpHide:true,
							})
						}
					}
				})
			})
		}
	})
})