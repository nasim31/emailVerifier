$(document).ready(function() {
	function setHeight() {
		windowHeight = $(window).innerHeight();
		$('.sidebar, .main').css('min-height', windowHeight);
	};
	setHeight();

	$(window).resize(function() {
		setHeight();
	});
});