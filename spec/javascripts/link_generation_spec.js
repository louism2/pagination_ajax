describe('Pagination Link Generation', function(){

	beforeEach(function(){
		loadFixtures('pagination_canvas.html');
	});
	
	describe('drawing the list of links', function(){
		
		it('should create a link for every array item passed into drawLinkIcons()', function(){
			loadFixtures('complete_pagination_dom.html');
			spyOn(ajaxPagination,'buildLinkList').and.returnValue([1,2,3,4,5,'...',10,'next']);
			
			var $el = $('.selected_page');
			var $parent = $('.pagination_container');
			var response = {data: [{},{}]};
			
			ajaxPagination.drawLinkIcons($el, $parent, response);
			var html = $('.link_canvas').html();
			expect(html).toEqual('<a href="#" class="pagination_link" data-element_number="0">1</a><a href="#" class="pagination_link" data-element_number="1">2</a><a href="#" class="pagination_link" data-element_number="2">3</a><a href="#" class="pagination_link" data-element_number="3">4</a><a href="#" class="pagination_link selected_page" data-element_number="4">5</a><span>...</span><a href="#" class="pagination_link" data-element_number="9">10</a><a href="#" class="pagination_link" data-element_number="next">next</a>')
		});	
		
	});
	
	describe('displays a truncated listing of links if there are MORE THAN 7 pages', function(){
		
		it('should display the proper list of links given 10 pages of links and current_page being the first page', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',0);
			$parent.data('per_page',2);
			$parent.data('total',20);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual([1,2,3,4,5,'...',10,'next']);
		});
		
		it('should display the proper list of links given 10 pages of links and current_page == 1', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',1);
			$parent.data('per_page',2);
			$parent.data('total',20);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,2,3,4,5,'...',10,'next']);
		});
		
		it('should display the proper list of links given 10 pages of links and current_page == 5', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',5);
			$parent.data('per_page',2);
			$parent.data('total',20);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,'...',4,5,6,7,8,'...',10,'next']);
		});
		
		it('should display the proper list of links given 10 pages of links and current_page == 8', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',8);
			$parent.data('per_page',2);
			$parent.data('total',20);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,'...',6,7,8,9,10,'next']);
		});
		
		it('should display the proper list of links given 10 pages of links and current_page being the last page', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',9);
			$parent.data('per_page',2);
			$parent.data('total',20);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,'...',6,7,8,9,10]);
		});
		
	});
	
	describe('displays a listing of links if there are LESS THAN 7 pages', function(){
		
		it('should display all pages without the "prev" link given current_page being the first page', function(){
			loadFixtures('pagination_canvas.html');
			var $parent = $('.pagination_container');
			$parent.data('current_page',0);
			$parent.data('per_page',2);
			$parent.data('total',10);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual([1,2,3,4,5,'next']);
		});
		
		it('should display all pages without the "next" link given current_page being other than the first or last page', function(){
			loadFixtures('pagination_canvas.html');
			var $parent = $('.pagination_container');
			$parent.data('current_page',4);
			$parent.data('per_page',2);
			$parent.data('total',10);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,2,3,4,5]);
		});
		
		it('should display all pages and the "next" and "prev" links given current_page is not the first or last page', function(){
			loadFixtures('pagination_canvas.html');
			var $parent = $('.pagination_container');
			$parent.data('current_page',2);
			$parent.data('per_page',2);
			$parent.data('total',10);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev',1,2,3,4,5,'next']);
		});
		
	});
	
	describe('displays a combination of the "prev" and "next" links given incomplete information from the user', function(){
		
		it('should only display the "next" link if no per_page is given and the current_page == 0, ', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',0);
			$parent.data('total',10);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['next']);
		});	
		
		it('should only display the "prev" link if no per_page is given and the current_page != 0 and data.length == 0, ', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',4);
			$parent.data('total',10);
			var data = [];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev']);
		});	
		
		it('should display the "prev" link if no per_page is given and the current_page != 0 and data.length == 0, ', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',4);
			$parent.data('total',10);
			var data = [];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev']);
		});
		
		it('should display the "prev" and "next" links if no per_page is given and the current_page != 0 and data.length > 0, ', function(){
			var $parent = $('.pagination_container');
			$parent.data('current_page',4);
			$parent.data('total',10);
			var data = [{},{}];
			expect(ajaxPagination.buildLinkList($parent, data)).toEqual(['prev','next']);
		});
		
	});
	
});
