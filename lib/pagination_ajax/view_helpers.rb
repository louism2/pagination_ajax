require "pagination_ajax"

module PaginationAjax
  module ViewHelpers
    
    def draw_pagination_links(options = {})
      ## template -- cut off anything starting at a "."
      ## no template = no dice
      options.transform_keys!{|key| "data-#{key.to_s}"}
      options["data-current_page"] ||= 0
      options["class"] = "pagination_container"
      content = create_pagination_links(options)
      content_tag(:div, content, options)
    end

    def create_pagination_links(options)
      if options["data-url"].nil?
        return "You must provide a url to send the ajax request to!"
      elsif options["data-template"].nil?
        return "You must provide a template with which to render the results!"
      end  
      current_page = options["data-current_page"]
      link = "<a href=\"#\" class=\"pagination_link selected_page\" data-element_number=\"#{current_page}\">#{current_page+1}</a>"
      "<span class=\"link_canvas\">#{link}</span><div class=\"pagination_canvas\"></div>".html_safe
    end
    
  end
end