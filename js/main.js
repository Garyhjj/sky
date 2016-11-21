(function($) {

	"use strict";	

  
    $('.navigation').singlePageNav({
        currentClass : 'active'
    });


    $('.toggle-menu').click(function(){
        $('.responsive-menu').stop(true,true).slideToggle();
        return false;
    });
	
	$("ul#myjob span").hover(function(){
		$(this).next("dl").toggle();
	})



})(jQuery);






