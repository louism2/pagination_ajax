describe('Rendering content to the page', function(){
	
	it('should render the template to the view', function(){
		loadFixtures('complete_pagination_dom.html');
		
		var $canvas = $('.pagination_canvas');
		var template = $('.pagination_container').data('template');
		var response = {status: 'success', 
						data: [{"author":"Louie Mancini","comment":"here is a comment"},
							   {"author":"Robert Duval","comment":"The Godfather was the best movie ever"}]
					   }
		ajaxPagination.buildDomElements($canvas, template, response);
		expect($('.comment').length).toEqual(2);
	});

});