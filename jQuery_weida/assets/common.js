$(function() {
  if($(".form-date").datetimepicker){
    $(".form-date").datetimepicker({
      language: 'zh-CN',//国际化语言种类
      format: "yyyy-mm-dd",
      weekStart: 1,
      todayBtn: 1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      minView: 2,
      forceParse: 0
    }).on('changeDate', function(ev){
      var $t = $($(ev.target).attr("date-relative"));
      if($t.size()>0){
        $t.datetimepicker('setStartDate', ev.date);
        if(ev.date>$t.datetimepicker('getDate')){
          $('input',$t).val("");
        }
      }
    });
    //移除输入框内容按钮
    $(document).on('click', '.glyphicon-remove', function() {
      $(this).parent().prev().val('');
    });

  }
  if($.fn.bootstrapValidator){
    //扩展验证规则
    $.fn.bootstrapValidator.extendRules({
      //只有银行系统才会有这样的验证规则
      //必须是小数，正书，1-24之间的两位小数
      rate : function(){
        if(!this.val())return true;
        return /^([\d]+)(\.[\d]{1,2})?$/.test(this.val())&&
             Number(this.val())<=24;
      }
    });
  }
});

//工具
var Utils = {
  //金额格式化
  format : function(o, s, n) {
    var type = $(o).data('format-type');
    switch(type){
      case 'money':
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      case 'integer':
        return parseInt(s);
      case 'rate':
        return Number(s)*100;
      case 'toAcount':
        var str = s;
        str = str+'';
        var len = str.length-1;
        var idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
        var num = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];
        return str.replace(/([1-9]|0+)/g,function( $, $1, idx, full) {
          console.log($1[0]);
        var pos = 0;
        if( $1[0] != '0' ){
         pos = len-idx;
         if( idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
          return idxs[len-idx];
         }
         return num[$1[0]] + idxs[len-idx];
        } else {
         var left = len - idx;
         var right = len - idx + $1.length;
         if( Math.floor(right/4) - Math.floor(left/4) > 0 ){
          pos = left - left%4;
         }
         if( pos ){
          return idxs[pos] + num[$1[0]];
         } else if( idx + $1.length >= len ){
          return '';
         }else {
          return num[$1[0]]
         }
        }
        });
      default :
        return s;
    }

  }
}
