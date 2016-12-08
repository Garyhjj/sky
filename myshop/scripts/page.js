function _GET(name, foward) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);//去网址？后的内容

  //如果没匹配到结果 则返回默认值
  return r != null ? r[2] : foward;
}

window.onload = function () {
  // 获取当前页码
  var currIndex = _GET("paper", 1);
  var paper = new Paper({
    paper: "pager", // 分页容器盒子的id
    currIndex: parseInt(currIndex), //当前页码
    totalCount: 555, //数据条数
    showNum: 5 //中间显示页面个数
  })
}

function Paper(opts) {
  if(!opts || !opts.paper || !opts.totalCount){
    return;
  }
  this.paper = document.getElementById(opts.paper);
  this.currIndex = opts.currIndex || 1;
  this.limit = opts.limit || 20; //每页显示条数
  this.totalCount = opts.totalCount || 0;
  this.showNum = opts.showNum || 5;

  //取出页面路径 不包含参数
  // this.url = window.location.pathname;

  this._calucate();
  this.render();
}

/**
 * [_calucate description]
 * @return {[type]} [description]
 */
Paper.prototype._calucate = function() {
  //计算最大页码
  this.maxPage = this.totalCount % this.limit === 0 ? this.totalCount / this.limit : Math.floor(this.totalCount / this.limit) + 1;
  var stepper = (this.showNum - 1) / 2;
  //计算中间页面的开始下标
  this.startNum = this.currIndex > stepper ? this.currIndex - stepper : 1
  //计算中间页面的截止下标
  if( this.maxPage < this.showNum) {
    this.endNum =this.maxPage;
  }else {
    this.endNum = this.currIndex + stepper >=this.maxPage ? this.maxPage : (this.currIndex + stepper);
  }
  console.log(this.endNum);
  console.log(this.startNum);
}
Paper.prototype.render = function() {
  var html = [];
  html.push('<div class="page-info">');
  html.push('共<span>' + this.maxPage + '</span>页&#12288;&#12288;到第');
  html.push('<input type="text" id="pageNum" onkeyup="this.value=this.value.replace(/[^0-9]/g,\'\');" />页');
  html.push('<a href="javascript:;" id="jumpBtn">确定</a>');
  html.push('</div>');

  html.push('<div class="page-nav">');

  //判断输出上一页标签
  if(this.maxPage > 2 && this.currIndex > 1) {
    html.push('<a href ="?paper='+(this.currIndex - 1)+'">< 上一页</a>');
  }else {
    html.push('<a href="javascript:;" class="disable">< 上一页</a>');
  }

  //如果中间开始页码大于等于3，则输出1和省略号
  if(this.startNum >=3) {
    html.push('<a href="?paper=1">1</a>');
    html.push('<span class="ellipise">...</span>');
  }

  //如果中间开始页码等于2，则输出1
  if(this.startNum === 2) {
    html.push('<a href="?paper=1">1</a>');
  }

  // 循环输出中间的页码

  for(var i = this.startNum; i <=this.endNum; i++){
    if(this.currIndex == i) {
      html.push('<a href="#" class="active">'+this.currIndex+'</a>')
    }else {
      html.push('<a href="?paper='+i+'">'+i+'</a>')
    }
  }

  if(this.endNum < this.maxPage - 1) {
    html.push('<span class="ellipise">...</span>');
    html.push('<a href="?paper='+this.maxPage+'">'+this.maxPage+'</a>');
  }else if(this.endNum === this.maxPage - 1){
    html.push('<a href="?paper='+this.maxPage+'">'+this.maxPage+'</a>');
  }

  //判断输出下一页
  if(this.currIndex < this.maxPage) {
    html.push('<a href="?paper='+(this.currIndex+1)+'">下一页 ></a>')
  }else {
    html.push('<a href="#" class="disable">下一页 ></a>')
  }

  this.paper.innerHTML = html.join('');

  document.getElementById("jumpBtn").onclick = function() {
    this.pageJump();
  }.bind(this)
  document.getElementById("pageNum").onkeydown = function(event) {
    if(event.keyCode === 13){
      this.pageJump();
    }
  }.bind(this)
}

// 输入页数页面进行跳转
Paper.prototype.pageJump = function() {
  var goPage = document.getElementById('pageNum').value;

  goPage = goPage > this.maxPage ? this.maxPage : goPage;

  if(!!goPage) {
    window.location.href = "?paper=" + goPage;
  }
}
