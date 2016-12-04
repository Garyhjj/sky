// JavaScript Document

$(function(){

/*定位效果*/


   $('#footer li').click(function(){
	   $(this).toggleClass("selected")
	          .siblings().removeClass("selected");
   });

	 $.ajax({
	 	type:"GET",
	 	url:"user.json",
	 	dataType:"json",
	 	success:function(){
	 		alert("success");
	 	},
	 	error:function(){
	 		alert("error");
	 	}
	 });
});
