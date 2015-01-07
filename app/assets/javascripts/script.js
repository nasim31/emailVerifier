$(document).ready(function() {
	function setHeight() {
		windowHeight = $(window).innerHeight();
		$('.sidebar, .main').css('min-height', windowHeight);
	};
	setHeight();

	$(window).resize(function() {
		setHeight();
	});
	$(window).scroll(function(){
		var sticky = $('.headermenu'),
		scroll = $(window).scrollTop();

		if (scroll >= 60) sticky.addClass('fixed');
		else sticky.removeClass('fixed');

	});
});