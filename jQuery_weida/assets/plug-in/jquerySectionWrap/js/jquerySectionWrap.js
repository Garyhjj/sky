/**
 * 插件名字：sectionWrapper //可更改
 * 插件使用格式要求：
  <div id=‘wrapper’//可自定义>
   <ul>
     <li></li>//li数量不限制,内嵌内容无限制
   </ul>
 </div>
 *插件使用方法：1.$('#wrapper'//与自定义一致).sectionWrapper({
                   showSerial: true,//可选
                  operateSerial: true//可选
               })

               2.面向对象式 var wapper = new sectionWrapper({
                               DOM: document.getElementById("wrapper")
                           });

  *可传入参数：showSerial  //判定是否增加页码提示，默认为增加
              operateSerial  //判定是否增加页码跳转功能，默认为增加

  *对目标DOM设置的自定义事件：beforeClick //触发点击跳转前的事件
                            afterClick //触发点击跳转后的事件
                            beforeMove //触发滑动跳转前的事件
                            afterClick //触发滑动跳转后的事件

              以上事件传出的参数：{
                beforeIndex //跳转前页码
                index //当前页码
                beforeDOM //跳转前页码内dom元素
                afterDOM //当前页码内dom元素
              }
 */

(function(root,factory,plug) {
  root[plug] = factory(root.jQuery,plug);
})(window,function($,plug){
  var __PROTOTYPE__ ={
    _init : function() {
      //初始化架构层面的dom的样式,初始化一些属性
      this.$wrapper = this.addClass('wrapper')
                          .find('ul:first').addClass('section-wrap section-animate')
                          .children('li').addClass('section').parent();
      this.sections = this.$wrapper.children('li');
      this.index = 0;//当前页码
      this.last = this.sections.length-1;
      this.lock = true;//用来作锁标识，避免连续多次触发时间
    },
    //创建对应的序列按钮
    _serials : function() {
      if(!this.showSerial) return;
      this.$serials = $("<ul></ul>");
      for(var i=0;i<this.sections.length;i++){
        //初始化按钮，并对第一个增加样式
        this.$serials.append("<li class="+(!i?'curr':'')+"><a href='#'></a></li>");
      }
      //增加样式
      this.$serials.addClass('serial');
      this.append(this.$serials);
      this.$serialLists = this.$serials.find('li');
      var _this = this;
      if(!this.operateSerial) return;
      //增加可点击的样式
      this.$serialLists.addClass('opera');
      this.$serialLists.on('click', function() {
        var beforeIndex = _this.index;
        _this.index = _this.$serialLists.index(this);
        //触发点击前的事件
        _this._attachevent('beforeClick',{
          beforeIndex : beforeIndex,
          index : _this.index,
          beforeDOM : _this.sections.eq(beforeIndex),
          afterDOM : _this.sections.eq(_this.index)
        });
        _this.$wrapper.css({
          "transform": "translateY(-"+ _this.index +"00%)",
          "-moz-transform": "translateY(-"+ _this.index +"00%)",
          "-webkit-transform": "translateY(-"+ _this.index +"00%)",
          "-o-transform": "translateY(-"+ _this.index +"00%)"
        });
        //改变被选中的样式
        $(this).addClass('curr')
            .siblings()
            .removeClass('curr');
        setTimeout(function() {
          //触发点击后的事件
          _this._attachevent('afterClick',{
            beforeIndex : beforeIndex,//跳转前页码
            index : _this.index,//当前页码
            beforeDOM : _this.sections.eq(beforeIndex),//跳转前dom元素
            afterDOM : _this.sections.eq(_this.index)//当前页码内dom元素
          });
        },1000);
      });

    },
    //封装自定义事件的触发
    _attachevent : function(event,args) {
      this.trigger(event,args);
    },
    //主事件
    _bind : function() {
      var _this = this;
      this.on('mousewheel',function(e){
        if(_this.lock){
          //锁上事件，防止瞬间多次触发
          _this.lock = false;
          //判定滑动的方向
          var moveUp = e.originalEvent.deltaY<0;
          var beforeIndex = _this.index;
          moveUp? _this.index--: _this.index++;
          //判定页码是否超出范围
          _this.index = Math.min(_this.index,_this.last);
          _this.index = Math.max(_this.index,0);
          if(beforeIndex == _this.index) {
            _this.lock = true;
            return;
          }
          //触发滑动前的事件
          _this._attachevent('beforeMove',{
            beforeIndex : beforeIndex,
            index : _this.index,
            beforeDOM : _this.sections.eq(beforeIndex),
            afterDOM : _this.sections.eq(_this.index)

          });
          _this.$wrapper.css({
            "transform": "translateY(-"+ _this.index +"00%)",
            "-moz-transform": "translateY(-"+ _this.index +"00%)",
            "-webkit-transform": "translateY(-"+ _this.index +"00%)",
            "-o-transform": "translateY(-"+ _this.index +"00%)"
          });
          setTimeout(function(){
            //打开事件
            _this.lock=true;
            //触发滑动后的事件
            _this._attachevent('afterMove',{
              beforeIndex : beforeIndex,
              index : _this.index,
              beforeDOM : _this.sections.eq(beforeIndex),
              afterDOM : _this.sections.eq(_this.index)
            });
            if(_this.showSerial) {
              _this.$serials.find('li')
                            .eq(_this.index)
                            .addClass('curr')
                            .siblings()
                            .removeClass('curr');
            }
          },1000);
        }
      });
    }
  };
  var __DEFAULTS__ = {
    showSerial: true,//判定是否增加页码提示，默认为增加
    operateSerial: true//判定是否增加页码跳转功能，默认为增加
  };
  $.fn[plug] = function(options){
    $.extend(this, __PROTOTYPE__, __DEFAULTS__, options);
    this._init();//初始化样式及获取常用dom
    this._serials();//初始化页码提示部分
    this._bind();//绑定主事件
    return this;
  };
  return function(options) {
    var dom = options.DOM;
    return $(dom)[plug].call($(dom),options);
  };
},"sectionWrapper");
