$(document).ready(function(){
	resize();

	/* Verify if the ng-filter.min.js file has been imported (it adds ng-filter true to the html.data) */
	if($('html').data('ng-filter')!=null) {

		/* Class that contains the list of all images / div to filter */
		var img_list = $('.img_list');

		/* Call the NG_Filter function to initialize it */
		NG_Filter(img_list, 'Winter');
	}

	function resize() {
		$('body, #container').css({
			"min-height": ($(window).height()),
		});

		var headerHeight = $('header').outerHeight(true);
		var footerHeight = $('footer').outerHeight(true);
		var contentPadding = parseFloat($('.content').css('padding-top')) + parseFloat($('.content').css('padding-bottom')) + 10;
		var contentHeight = $(window).height() - (headerHeight + footerHeight + contentPadding);

		$('.content').css({
			"min-height": (contentHeight),
		});

	}

});
