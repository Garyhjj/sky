$(function(){
	$('#frmRegist').bootstrapValidator({
		// triggerWay: 'keyup'
	}).on('erro', function(event, result) {

	}).on('success', function(event, result) {
		this.submit();
	});

  //根据手机号码的验证改变获取验证码按钮的状态
	var $btnCode =$('#btnMobileValidCode');
	$('[name="registerParam.mobilePhone"]').on('change',function(){
		$btnCode.prop('disabled',!$(this).parent('.input-group').hasClass('has-success'));

	})
	//设置验证码等待的秒数
  var second = 60;
	$btnCode.on('click',function() {
		$(this).prop('disabled',true).text('请在'+second+'s后重试');
		var timeIn = setInterval(function(){
			$btnCode.text('请在'+(--second)+'s后重试');
			if(second ===0){
				$btnCode.prop('disabled',false).text('获取验证码');
				clearInterval(timeIn);
				second =60;
			}
		},1000);
	})
});
