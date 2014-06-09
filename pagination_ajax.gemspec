# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pagination_ajax/version'

Gem::Specification.new do |spec|
  spec.name          = "pagination_ajax"
  spec.version       = PaginationAjax::VERSION
  spec.authors       = ["louism2"]
  spec.email         = ["louiscmancini@gmail.com"]
  spec.summary       = %q{Extremely simple pagination using ajax}
  spec.description   = %q{Designed to provide basic pagination functionality using ajax with minimal effort. If you provide a JST(Javascript Template) file and a url to send requests to this gem will essentially do the rest.}
  spec.homepage      = "https://github.com/louism2/pagination_ajax"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_dependency('jquery-rails')
  spec.add_dependency('ejs')
  
  #spec.add_development_dependency 'rails'
  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_development_dependency 'actionpack', '~> 4.1.1'
  
  ## Dependencies for testing gem ##
  spec.add_development_dependency "rspec", "~> 2.6"
  spec.add_development_dependency 'jasmine', '~> 2.0.1'
  
  
end
