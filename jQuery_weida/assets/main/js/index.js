$(function(){
	$('#mainForm').bootstrapValidator().on('success', function() {
		$.getJSON("data/data2.json",dataDriver.changeQuerys(this),function(data){
						dataDriver.load(data);
				});
	});
	$.getJSON('data/data1.json', function(json, textStatus) {
		dataDriver.load(json);
		// var dataDetail = json.detail;
		// for(var pro in dataDetail){
		// 	var $obj = $('#'+pro);
		// 	$obj.text(Utils.format($obj, dataDetail[pro]));
		// }
	});

	var $checkBtn = $('.btn-check');
	var $checkAll = $('.form-horizontal .ico-check.chk-all').on('click',function(){
		if($(this).hasClass('checked')){
			$checkBtn.filter('.checked').trigger('click');
		}else {
			$checkBtn.not('.checked').trigger('click');
		}
	});
	$checkBtn.on('click',function() {
		var $check = $(this);
		var checkedLength = $check.next().prop('checked',$check.toggleClass('checked').hasClass('checked'))
		                                 .parents('.check-group').find('.btn-check.checked').size();
		if(checkedLength === 6) {
			$checkAll.addClass('checked');
		}else {
			$checkAll.removeClass('checked');
		}
	});

//选择项目并改变展示数据
	$("#billList tbody").on("click","tr",function(){
			$(this).find("td:first span").toggleClass("checked");
			var totalBillAmt=0,
					totalBillCnt=0,
					totalDueYield=0,
					totalInvestmentAmt=0,
					weightedAverageYield=0;
			$.each($(this).parent().find("td span.checked"),function(){
					var meta = $(this).data("meta");
					totalBillAmt+=meta.subscriptionAmt;
					totalBillCnt++;
					totalBillAmt+=meta.yearlyRate;
					totalInvestmentAmt+=meta.faceAmt;
					weightedAverageYield+=meta.discountRate;
			});
			totalBillAmt /= totalBillCnt;
			weightedAverageYield /= totalBillCnt;
			dataDriver.load({
					detail:{
						"totalBillAmt": totalBillAmt||0,
						"totalBillCnt": totalBillCnt||0,
						"totalDueYield": totalDueYield||0,
						"totalInvestmentAmt": totalInvestmentAmt||0,
						"weightedAverageYield": weightedAverageYield||0
					}
			});
	});

})
