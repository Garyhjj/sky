// JavaScript Document

$(function(){
	
/*定位效果*/


   $('#footer li').click(function(){
	   $(this).toggleClass("selected")
	          .siblings().removeClass("selected");
   });

  
});