require 'pagination_ajax/view_helpers'

module PaginationAjax
  class Railtie < Rails::Railtie
    initializer "pagination_ajax.view_helpers" do
      ActionView::Base.send :include, ViewHelpers
    end
  end
end