var ajaxPagination = {
	sendPaginationRequest : function(data_attributes){
		return $.get(data_attributes.url, data_attributes);
	}, drawLinkIcons : function($el, $parent, response){
		var self = this;
		var links_arr = [];
		var new_page = $el.data('element_number');
		var current_page = $parent.data('current_page');
		if(isNaN(new_page)){
			if(response.data.length > 0){
				if(new_page === 'next'){
					current_page+=1
				}else{
					if(current_page !== 0){
						current_page-=1;					
					}
				}
			}else{
				//if clicking 'next' returned no results then do nothing
			}
			$parent.data('current_page', current_page);
		}else{
			$parent.data('current_page', new_page);
		}
		
		var links_arr = self.buildLinkList($parent, response.data);
		
		str_arr = [];
		links_arr.forEach(function(element, index, array){
			var class_name = (element-1 === $parent.data('current_page')) ? 'pagination_link selected_page' : 'pagination_link';
			if(isNaN(element)){
				if(element === '...'){
					str_arr.push("<span>"+element+"</span>");
				}else{
					str_arr.push("<a href='#' class='"+class_name+"' data-element_number='"+element+"'>"+element+"</a>");	
				}
			}else{
				str_arr.push("<a href='#' class='"+class_name+"' data-element_number='"+(element-1)+"'>"+element+"</a>");	
			}
		});	
		$parent.children('a').remove();
		var str = ''
		$parent.find('.link_canvas').html(String.prototype.concat.apply(str,str_arr));
		$parent.find('.link_canvas a').handleLinkClick();
	}, buildDomElements : function($canvas, template, response){	
		$canvas.html('');
		if(response.status == 'success'){
			$.each(response.data, function(k,v){
				var content = JST[template](v);
				$canvas.append(content);	
			});			
		}else{
			$canvas.html('There was an error.  Try again or reload the page');
		}
	}, buildLinkList: function($parent, data){
		var current_page = $parent.data('current_page');
		var link_list;
		if($parent.data('per_page') === undefined || $parent.data('total') === undefined || $parent.data('omit_n_and_p')){
			if(data.length < 1){
				link_list = ['prev'];
			}else if(current_page != 0){
				link_list = ['prev','next'];
			}else{
				link_list = ['next'];
			}
		}else{
			var total = $parent.data('total');
			var offset = $parent.data('per_page');
			var new_page = $parent.data('current_page');
	      	var pages = Math.ceil(total/offset);
		    if(pages > 7){
				if(new_page >= 4 && new_page <= pages-5){
					link_list = ['prev',1,'...',new_page-1,new_page,new_page+1,new_page+2,new_page+3,'...',pages,'next'];
				}else if(new_page <= 3){
					link_list = new_page === 0 ? [1,2,3,4,5,'...',pages,'next'] : ['prev',1,2,3,4,5,'...',pages,'next']
				}else if(new_page >= pages-4){      //////  Should be able to cut off the if statement
					link_list = new_page === pages-1 ? ['prev',1,'...',pages-4,pages-3,pages-2,pages-1,pages] : ['prev',1,'...',pages-4,pages-3,pages-2,pages-1,pages,'next'];
				}
			}else{
				link_list = [];
				if(new_page !== 0){
					link_list.push('prev');
				}	
				for(var x = 1; x <= pages; x++){
					link_list.push(x);
				}
				if(new_page !== pages-1){
					link_list.push('next');
				}	
			}	
		}
		return link_list
	}
	
} // end object	

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

	
$(document).ready(function(){
	
	if($('.selected_page').length > 0){
		$link = $('.selected_page');
		$link.handleLinkClick();
		$link.trigger('click');
	}
	
});



