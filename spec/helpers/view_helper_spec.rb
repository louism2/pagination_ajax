require 'spec_helper'

class DummyViewClass
  require "active_support"
  require "action_view"
  require "pagination_ajax/view_helpers"
  include ActionView::Helpers::TagHelper
  include PaginationAjax::ViewHelpers
end

describe 'helper method' do
  describe "calling the view helper" do
    it "should return a valid html string given a complete list of arguments to the method" do
      pagination_options = {:per_page => 2, :current_page => 0, :url => '/comments/get_comments', :total => 20, :template => 'templates/test'}
      expected_html = '<div class="pagination_container" data-current_page="0" data-per_page="2" data-template="templates/test" data-total="20" data-url="/comments/get_comments"><span class="link_canvas"><a href="#" class="pagination_link selected_page" data-element_number="0">1</a></span><div class="pagination_canvas"></div></div>'
      
      returned_html = DummyViewClass.new.draw_pagination_links(pagination_options)
      returned_html.should eq(expected_html)
    end
    
    it "should return an error message if no url is given in the arguments to the method" do
      pagination_options = {:per_page => 2, :current_page => 0, :total => 20, :template => 'templates/test'}
      expected_html = '<div class="pagination_container" data-current_page="0" data-per_page="2" data-template="templates/test" data-total="20">You must provide a url to send the ajax request to!</div>'
      
      returned_html = DummyViewClass.new.draw_pagination_links(pagination_options)
      returned_html.should eq(expected_html)
    end
    
    it "should return an error message if no template is given in the arguments to the method" do
      pagination_options = {:per_page => 2, :current_page => 0, :url => '/comments/get_comments', :total => 20}
      expected_html = '<div class="pagination_container" data-current_page="0" data-per_page="2" data-total="20" data-url="/comments/get_comments">You must provide a template with which to render the results!</div>'
      
      returned_html = DummyViewClass.new.draw_pagination_links(pagination_options)
      returned_html.should eq(expected_html)
    end
  end
end






