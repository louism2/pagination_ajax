describe('Pagination Link Interaction', function(){
	
	beforeEach(function(){
		loadFixtures('complete_pagination_dom.html');
	});
		
	describe('sending a request to the server', function(){
		
		it('should call ajaxPagination.sendPaginationRequest() with the data_attributes from the dom when the user clicks on .pagination_link', function(){
			var d = $.Deferred();
			d.resolve();			
			
			spyOn(ajaxPagination,'sendPaginationRequest').and.returnValue(d.promise());
			spyOn(ajaxPagination,'buildDomElements');
			
			var $link = $('.selected_page');
			$link.handleLinkClick();
			$link.trigger('click');
			
			var data_attributes = $('.pagination_container').data();
			expect(ajaxPagination.sendPaginationRequest).toHaveBeenCalledWith(data_attributes);
		});
		
	});
	
	describe('updating the dom given a successful ajax request', function(){
		
		it('should increment current page by one if the user clicks the "next" link and add the "selected_page" class to the new link', function(){
			var d = $.Deferred();
			d.resolve([{comment: 'value', author: 'Louie'}]);	
			spyOn(ajaxPagination,'sendPaginationRequest').and.returnValue(d.promise());
			
			var $container = $('.pagination_container');
			
			expect($container.data('current_page')).toEqual(4);
			
			var $next = $('.pagination_link[data-element_number="next"]');	
			$next.handleLinkClick();	
			$next.trigger('click');	
					
			expect($container.data('current_page')).toEqual(5);
			expect($('.selected_page[data-element_number="5"]').length).toBeGreaterThan(0);
		});
		
		it('should decrement current page by one if the user clicks the "prev" link and add the "selected_page" class to the new link', function(){
			var d = $.Deferred();
			d.resolve([{comment: 'value', author: 'Louie'}]);	
			spyOn(ajaxPagination,'sendPaginationRequest').and.returnValue(d.promise());
			
			var $container = $('.pagination_container');
			
			expect($container.data('current_page')).toEqual(4);
			
			var $prev = $('.pagination_link[data-element_number="prev"]');		
			$prev.handleLinkClick();
			$prev.trigger('click');	
					
			expect($container.data('current_page')).toEqual(3);
			expect($('.selected_page[data-element_number="3"]').length).toEqual(1);
		});
		
		it('should set the current page to the icon that was clicked and add the "selected_page" class to the clicked link', function(){
			var d = $.Deferred();
			d.resolve([{comment: 'value', author: 'Louie'}]);	
			spyOn(ajaxPagination,'sendPaginationRequest').and.returnValue(d.promise());
			
			var $container = $('.pagination_container');
			
			var $link = $('.pagination_link[data-element_number="5"]');
			$link.handleLinkClick();
			$link.trigger('click');
					
			expect($container.data('current_page')).toEqual(5);
			expect($('.selected_page[data-element_number="5"]').length).toEqual(1);
		});
		
	});
	
	describe('failed ajax request', function(){
		
		it('should not update the data attributes or link list given a failed ajax request', function(){
			var d = $.Deferred();
			d.reject();	
			spyOn(ajaxPagination,'sendPaginationRequest').and.returnValue(d.promise());
			
			var $container = $('.pagination_container');
			
			var $links_before_click = $('.pagination_link');
			console.log($links_before_click);
			var $current_page_before_click = $container.data('current_page');
			
			var $link = $('.pagination_link[data-element_number="6"]');
			$link.handleLinkClick();
			$link.trigger('click');
			
			var $links_after_click = $('.pagination_link');
			var $current_page_after_click = $container.data('current_page');
			
			for(x=0;x<=$links_after_click.length;x++){
				var b = $links_before_click[x];
				var a = $links_after_click[x];
				expect(a).toEqual(b);
			}
		});
		
	});
	
});