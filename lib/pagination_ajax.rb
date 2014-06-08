require 'rails'
require "pagination_ajax/version"
require 'pagination_ajax/railtie' if defined?(Rails)
require 'pagination_ajax/view_helpers'

module PaginationAjax
  class Engine < Rails::Engine
  end
end
