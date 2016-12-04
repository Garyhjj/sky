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

	 function funSearch() {
var fso, ts, s;
var ForReading = 1;
try{
fso = new ActiveXObject("Scripting.FileSystemObject");
      ts = fso.OpenTextFile("user.json", ForReading);
      s = ts.ReadLine();
      var json = eval('(' + s + ')');
      alert(json.MyData[0].id);
}catch(err){


}finally{
ts.Close();
}
}

funSearch();
});
