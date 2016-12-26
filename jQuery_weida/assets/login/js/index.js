$(function(){
	// $.fn.bootstrapValidator.extendRules({
	// 	cardid: function(){
	// 		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.val());
	// 	}
	// })
	$('#frmLogin').bootstrapValidator({
		// triggerWay: 'keyup'
	}).on('erro', function(event, result) {
	}).on('success', function(event, result) {
		this.submit();
	});
});
