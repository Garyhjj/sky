$(function(){
	$('#mainForm').bootstrapValidator().on('success', function() {
		alert('correct');
	});
	$.getJSON('/data/data1.json', function(json, textStatus) {
		var dataDetail = json.detail;
		for(var pro in dataDetail){
			var $obj = $('#'+pro);
			$obj.text(Utils.format($obj, dataDetail[pro]));
		}
	});
})
