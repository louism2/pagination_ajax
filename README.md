# PaginationAjax

Extremely simple pagination using ajax -- Designed to provide basic pagination functionality using ajax with minimal effort.

## Installation

Add this line to your application's Gemfile:

    gem 'pagination_ajax'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install pagination_ajax

## Usage
    
Once you have installed the gem you need to run the install generator:
    
    rails g pagination_ajax:install
    
This will look for a javascript file in your assets directory named 'application.js' or 'application.js.coffee' and add several require statements that will load the needed javascript for this gem to work.  

Once you have ran the install generator you can now use the provided ```draw_pagination_links``` view helper to automatically build pagination links into the page.  This method takes a hash of arguments, of which, two are required:

1) A ```template``` argument must present in the passed in hash so the response from the server can be automatically drawn to the page.  By default, rails will convert any files in the ```app/assets/templates``` folder with a ```.jst``` exstention into a javascript template.  Provide the template argument in the format of ```templates/<name_of_file_without_extention>```.  
2) A ```url``` argument must be present so that the gem knows where to issue the request for data.  Provide this argument in the form of ```/<controller_name>/<action_name>```.






## Contributing

1. Fork it ( https://github.com/[my-github-username]/pagination_ajax/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
