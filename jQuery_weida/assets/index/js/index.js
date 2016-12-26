$(function(){
  var $wrapper =$('.section-wrap');
  var $header = $('header');
  var $menu = $header.find('.menubar');
  var $wrapSection2 = $('.section-2');
  //使用sectionWrapper插件
  $('#wrapper').sectionWrapper({
    showSerial: true,//使用页码提示
    operateSerial: true//开启页码点击跳转功能
  }).on('beforeMove',function(event,opts){
      $header.addClass('hide');
      if(opts.beforeIndex == 1){
        opts.beforeDOM.removeClass('action');
      }
  }).on('afterMove',function(event,opts){
      $header.removeClass('hide');
      if(opts.index==1){
        $menu.removeClass('white').addClass('black');
        opts.afterDOM.addClass('action');
      }
      if(opts.index==0){
        $menu.removeClass('black').addClass('white');
      }
  }).on('afterClick',function(event,opts) {
    $header.removeClass('hide');
    if(opts.index != 0){
      $menu.removeClass('white').addClass('black');
    }else{
      $menu.removeClass('black').addClass('white');
    }
    if(opts.index == 1){
      opts.afterDOM.addClass('action');
    }
  }).on('beforeClick', function(event,opts) {
    $header.addClass('hide');
    if(opts.beforeIndex == 1){
      opts.beforeDOM.removeClass('action');
    }
  });
});
