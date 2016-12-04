// JavaScript Document
function loadXMLDoc()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("myDiv").innerHTML="xmlhttp.responseText";
		}
	}
	xmlhttp.open("GET","user.json",true);
	xmlhttp.send();
}

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



funSearch();
});
