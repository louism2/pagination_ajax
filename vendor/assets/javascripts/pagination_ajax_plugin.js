(function ($) {
  $.fn.handleLinkClick = function(){
  	$(this).on('click', function(e){
		e.preventDefault();
		var $el = $(this);
		var $parent = $el.closest('.pagination_container');
		var $p_canv = $el.parent().siblings('.pagination_canvas');
		var data_attributes = $parent.data();	
		var server_response = ajaxPagination.sendPaginationRequest(data_attributes);
		var response;
		server_response.done(function(data){
			response = {status: 'success', data: data};
			ajaxPagination.buildDomElements($p_canv, data_attributes.template, response);
			ajaxPagination.drawLinkIcons($el, $parent, response);
		}).fail(function(jqXHR, textStatus, errorThrown){
			response = {status: 'fail', data: []};
			ajaxPagination.buildDomElements($p_canv, data_attributes.template, response);
		});
	});
  };
})(jQuery);