$(function(){ 
	var arrOffset=[]
	var arrElement=[]
	$.each($(".roll"),function(){
		arrOffset.push($(this).offset().top)
	})
	$.each($("a[href^=roll]"),function(i,v){
		arrElement.push($(this))
	})
	$.each(arrElement,function(i,v){ //因为索引的问题需要单独领出来
		$(this).click(function(){
			$('body,html').animate({scrollTop:arrOffset[i]},500)
			return false;
		})
	});
})