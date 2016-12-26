/**
 * 可如此扩展验证方法：$.fn.bootstrapValidator.extendRules({
                        cardid: function(){
                        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.val());
                        }
                     })

 *回调事件：验证成功：success，监控此事件并添加this.submit()可进行表单提交
 *         验证失败：error
 */

(function(root,factory,plug){
  factory(root.jQuery,plug);
})(window, function($,plug){
  /*
     require 必须填
     regex 正则表达式
     equalto 和XX相等
     length 长度要求
     maxlength 最大长度
     minlength 最小长度
     betweenl 两者长度之间  8-16
     greaterthan 大于
     lessthan 大于
     between 两个数值之间  18-30
     integer 必须是数字
     number 必须是数字
     email 必须是邮箱地址
     mobile 必须是手机号码
     phone 必须是座机号码
     url 必须是有效的url
     cardid 身份证号码
     bankid 银行卡号码
     ...其他的规则
   */
//验证规则
  var __RULES__ = {
    require : function(){
      return this.val()!='';
    },//必须填
    regex : function(){
      return new RegExp(this.data('bv-regex')).test(this.val());
    },//正则表达式
    length : function(){
      return this.val().length === Number(this.data('bv-length'));
    },//长度要求
    maxlength : function(){
      return this.val().length <= Number(this.data('bv-maxlength'));
    },//最大长度
    minlength : function(){
      return this.val().length >= Number(this.data('bv-minlength'));
    },//最小长度
    betweenl : function(){
      var valueL = this.val().length;
      var betArray= this.data('bv-betweenl').split('-');
      return valueL>=Number(betArray[0])&&valueL<=Number(betArray[1]);
    },//两者长度之间  8-16
    greaterthan : function(){
      if(!this.val()) return true;
      return Number(this.val()) > Number(this.data('bv-greaterthan'));
    },//大于
    lessthan : function(){
      return Number(this.val()) < Number(this.data('bv-lessthan'));
    },//大于
    between : function(){
      var value = this.val();
      var betArray= this.data('bv-betweenl').split('-');
      return Number(value)>=Number(betArray[0])&&Number(value)<=Number(betArray[1]);
    },//两个数值之间  18-30
    integer : function(){
      return /^\-?\d+$/.test(this.val());
    },//必须是数字
    number : function(){
      return !isNaN(Number(this.val()));
    },//必须是数字
    email : function(){
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.val());
    },//必须是邮箱地址
    mobile : function(){
      return /^1\d{10}$/.test(this.val());
    },//必须是手机号码
    phone : function(){
      return /^\d{4}\-\d{8}$/.test(this.val());
    },//必须是座机号码
    url : function(){
      return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g.test(this.val());
    },//必须是有效的url
    equalto : function(_this){
      var $other = $(this.data("bv-equalto"));
      if($other.val() == this.val()){
        //添加样式表明验证结果
        $other.parent('.input-group').next().remove('p');
        $other.parent('.input-group').removeClass('has-error').addClass('has-success');
        return true;
      }else{
        return false;
      }
      return $(this.data("bv-equalto")).val() == this.val();
    },//和XX相等
    money : function(){
      if(!this.val())return true;
      return /^([\d]+)(\.[\d]{1,2})?$/.test(this.val());
    }
  };
  //原型功能
  var __PROTOTYPE__ = {
    _init: function(){
      //初始化验证对象，并获得一些常用对象
      this.$field = this.find(".form-group .form-control:visible");
    },
    //封装自定义事件的触发
    _attachevent : function(event,args) {
      this.trigger(event,args);
    },
    //主事件
    _bind: function(){
      var _this = this;
      this.$field.on(this.triggerWay,function(){
        var $field = $(this);//被验证的表单元素
        var $group = $field.parent('.input-group');
        var result = true;//默认验证结果为true
        $group.next('p').remove();
        $.each(__RULES__,function(key,rule){
          if($field.data('bv-'+key)){
            result = rule.call($field,_this);
            (!result)&&$group.after('<p class="text-danger">'+($field.data('bv-'+key+'-message')||_this.erroMessage)+'</p>');
            return result;
          }
        });
        $group.removeClass('has-error has-success').addClass('has-'+(result?'success':'error'));
      });
      this.on('submit', function() {
        var $group = _this.$field.trigger(_this.triggerWay).parent('.input-group');
        if($group.filter('.has-error').size() ===0){
          _this._attachevent('success', {});
        }else{
          _this._attachevent('erro', {});
        }
    		return false;
      })
    }
  };
//默认参数
  var __DEFAULTS__ = {
    triggerWay: 'change',//默认触发方式为change
    erroMessage: 'invalid input'
  }
  $.fn[plug]= function(options){
    $.extend(this, __PROTOTYPE__, __DEFAULTS__, options);
    //判断目标是否form标签，如果不是则抛出异常
    if(!this.is('form')){
      throw new Error('the target is not form tag');
    };
    //初始化
    this._init();
    //绑定主事件
    this._bind();
    return this;
  };

  //设置外部扩展验证规则的方法
  $.fn[plug].extendRules= function(newRule){
    $.extend(__RULES__, newRule);
  };
},'bootstrapValidator');
