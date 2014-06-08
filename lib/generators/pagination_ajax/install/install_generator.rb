module PaginationAjax
  module Generators
    class InstallGenerator < Rails::Generators::Base

      def inject_pagination_ajax
        # for JavaScript application.js manifest:        
        if File.exists? "#{Rails.root}/app/assets/javascripts/application.js"
          append_to_file "app/assets/javascripts/application.js" do
            "//= require pagination_ajax\n"
          end    
        # ...or for CoffeeScript application.js.coffee manifest:
        elsif File.exists? "#{Rails.root}/app/assets/javascripts/application.js.coffee"   
          append_to_file "app/assets/javascripts/application.js.coffee" do
            "\n#= require pagination_ajax\n"
          end
        end
      end
      
    end
  end
end