// JavaScript Document
$(function(){
	
/*定位效果*/

    $("#location em").click(function(){
		var text = $(this).text();
		text ="位置："+text;
		$("#location >a").text(text);
		$("#location .jnNav").hide() ;
	})
	
/*导航效果*/
	
	$(".nav li,.nav1 li, #firstCar").hover(function(){
		$(this).toggleClass("selected");
		$(this).find(".jnNav").show();
	},function(){
		$(this).toggleClass("selected");
		$(this).find(".jnNav").hide();
	});
	$("#bigNav .jian").hover(function(){
		$(this).parent().find("#jianNav").toggle();
	},function(){
		$(this).parent().find("#jianNav").toggle();
	});
	
	/*搜索框文字效果*/
	var $inputSearch =$("#inputSearch");
	$inputSearch.focus(function(){
		$(this).addClass("focus");
		if($(this).val()==this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		$(this).removeClass("focus");
		if($.trim($(this).val())==""){
			$(this).val(this.defaultValue);
		}
	}).keyup(function(e){
		if(e.which==13&&($.trim($(this).val())!="")){
			alert("搜索进行中");
		}
	});
	
	$("#find").click(function(){
		if($inputSearch.val()!=$inputSearch[0].defaultValue){
			alert("搜索进行中")
		}
	});
	
	/*广告牌效果*/
	var $imgrolls =$("#jnImageroll div a");
	$imgrolls.css("opacity","0.7");
	var len = $imgrolls.length;
	var index = 0;
	var adTimer =null;
	$("#jnImageroll div a").mouseover(function(){
		index =$("#jnImageroll div a").index(this);
		showImg(index);
	}).eq(0).mouseover();
	$("#jnImageroll").hover(function(){
		if(adTimer){
			clearInterval(adTimer);
		}
	},function(){
		adTimer = setInterval(function(){
			showImg(index);
			index++;
			if(index==len){index=0;}
		},3000)
	}).trigger("mouseleave");
	
	function showImg(index){
		var $rollobj =$("#jnImageroll");
		var $rolllist = $rollobj.find("div a");
		var newhref = $rolllist.eq(index).attr("href");
		$("#JS_imgWrap").attr("href",newhref)
		                .find("img").eq(index).stop(true,true).fadeIn()
						.siblings().fadeOut();
		$rolllist.removeClass("chos").css("opacity","0.7")
		         .eq(index).addClass("chos").css("opacity","1");
	};
	
	/*登录框效果*/
	$("#loginUl>li").hover(function(){
		$(this).toggleClass("selected");
	},function(){
		$(this).toggleClass("selected");
	});
	
	/*快速出标签效果*/
	var x =10;
	var y=20;
	$("#smallNav ul li a").hover(function(e){
		this.mytitle = this.title;
		this.title="";
		var txt = "<div id='tooltip'>"+this.mytitle+"</div>";
		$("body").append(txt);
		$("#tooltip").css({
			               "left":(e.pageX+x)+"px",
						   "top":(e.pageY+y)+"px"
		}).show("fast")
	},function(){
		this.title =this.mytitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip").css({
			               "left":(e.pageX+x)+"px",
						   "top":(e.pageY+y)+"px"
		});
	});
	
	/* 选项卡 */
	var $div_li = $("div.tab_menu ul li.haveContent");
	$div_li.mouseenter(function(){
		$(this).addClass("selected")
		       .siblings().removeClass("selected");
		var index = $div_li.index(this);
		
		$("div.tab_box>div").eq(index).show()
		                    .siblings().hide();
	}).hover(function(){
		$(this).toggleClass("hover");
	});
	
	/* 倒计时 */
	
	function timing(){
		var hour = $("span#hour").text();
		var minute = $("span#minute").text();
		var second = $("span#second").text();
		if(hour==0&&minute==0&&second==0){
			return;
		}
		if(second!=0){
			second--;
		}else{if(minute!=0){
			      minute--; 
				  second=59;
			  }else{if(hour!=0){
				      minute=59;
					  second=59;
					  hour--;
				  }
			  }
		}
		hour=hour-0;
		minute=minute-0;
		$("span#hour").text(addZero(hour));
		$("span#minute").text(addZero(minute));
		$("span#second").text(addZero(second));
		
		
	};
	function addZero(string){
		if(string<10){
			string="0"+string;
		}
		return string;
	}
	CTimer = setInterval(function(){
			timing();
		},1000);
		
    /* 商品上移效果 */
	var $upimg =$("#miaogood img");
	var position =$upimg.css("bottom");
	$(".moveup").hover(function(){
		var position1 = parseInt(position)+4;
		position1 = position1+"px";
		$(this).closest("dl").find("img").animate({bottom:position1},600);
	},function(){
		$(this).closest("dl").find("img").stop(true,true).animate({bottom:position},600);
	})
	
});