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
### Setup 
Once you have installed the gem you need to run the install generator:
    
    rails g pagination_ajax:install
    
This will look for a javascript file in your assets directory named ```application.js``` or ```application.js.coffee``` and add several require statements that will load the needed javascript for this gem to work.  

### Drawing content to the page
Once you have ran the install generator you can now use the provided ```draw_pagination_links()``` view helper to automatically build pagination links into the page.  This method takes one argument, a hash, and requires that two key/value pairs be present:

1) A ```template``` key/value pair must present in the passed in hash so the response from the server can be automatically drawn to the page.  By default, rails will convert any files in the ```app/assets/templates``` folder with a ```.jst``` exstention into a javascript template.  Provide the template argument in the format of ```templates/<name_of_file_without_exstention>```.  
2) A ```url``` key/value pair must be present so that the gem knows where to issue the request for data.  Provide this argument in the form of ```/<controller_name>/<action_name>```.

Given just these two arguments, the view helper will create a set of directional links with the text values ```prev``` and ```next```.  But you probably want numbered links rather than just those simple directional links.  This gem will automatically draw numbered links as long as you provide two additional key/value pairs in the hash:

1) A ```per_page``` key/value pair. And 
2) a ```total``` key/value pair.

These two values will be used to determine the total number of pages that will be needed to display your content and will create the pagination links accordingly.  If the number of pages needed to display all the data is greater than seven, the gem will truncate the links so that only the first and last pages, as well as two pages in either direction of the current page, are visible.

#### What gets sent to the server when someone clicks a pagination link?
Along with the four key/value pairs mentioned above you are free to provide any additional data by simply passing it into the hash.  Every key/value pair in the hash that is passed to the ```draw_pagination_links()``` helper method will be added to the container div of what is drawn to the page as a html data attribute.  All these data attributes will be sent to the sever each time a pagination link is clicked.  So, given a hash of the following values:
```Ruby
    @pagination_options = {:per_page => 2, :current_page => 0, 
                           :url => '/comments/get_comments', 
                           :total => 20, :template => 'templates/comment', 
                           :parent_id => 22, :created_at => "2014-05-23 18:10:00" }
```    
The following html will be rendered to the view:
```Html
<div class="pagination_container" data-created_at="2014-05-23 18:10:00" data-current_page="0" data-parent_id="22" data-per_page="2" data-template="templates/comment" data-total="20" data-url="/comments/get_comments">
<span class="link_canvas">
    <a href="#" class="pagination_link selected_page" data-element_number="0">1</a></span><div class="pagination_canvas">
</span>
<div class='pagination_canvas'>
</div>
</div>
```
Notice that at this point there is only one child element in the ```link_canvas``` span and no child elements in the ```pagination_canvas``` span.  The gem will first render the "scaffolding" to the page and then trigger a click event on the single link inside of ```link_canvas```.  This click event will then send a ```get``` request the url you specified in the ```url``` argument.  The request that will hit your server will contain all the data attributes that are listed in the ```pagination_container``` div.  The above html would send the following data to the server whenever a ```pagination_link``` is clicked:
```
Processing by CommentsController#get_comments as */*
Parameters: {"url"=>"/comments/get_comments", "total"=>"20", "template"=>"templates/comment", "per_page"=>"2",    
"parent_id"=>"22", "current_page"=>"0", "created_at"=>"2014-05-23 18:10:00"}
```
By default, even if you don't provide a ```current_page``` value in your hash argument to the ```draw_pagination_links()``` helper method, the gem will default the ```current_page``` value to the ```0``` on the first request and then start updating it as the user clicks on the pagination links.  The ```current_page``` value, along with the ```per_page``` value can be used create an offset value with which you can query the database.  An example implmentation could be something like:
```Ruby
  def get_comments
    offset_value = params[:current_page].to_i*params[:per_page].to_i
    comments = Comment.where(:parent_id => params[:parent_id]).offset(offset_value).limit(params[:per_page])
    respond_to do |format|
      format.json {render json: comments}
    end
  end
```  
#### How is the response from the server handled?
**IMPORTANT** The response from the server must be an array as the response will be looped through and each contained value will be passed to the JST template you specified.  If you are new to javascript templates I would suggest using Embedded Javascript(EJS) as it provides familiar ERB syntax.  There is an EJS gem so just add the follwing line to your gemfile: ```gem 'ejs'``` and you can now include files inside your ```assets/javascripts/templates``` directory with the file extension ```.jst.ejs``` and write templates that look exactly like ERB:
```
### filename: comment.jst.ejs
<div class='comment'>
	<%= comment %> - <%= author %>
</div>
```
The responses will be rendered inside the ```pagination_canvas``` div.  

### Styling the links
Styling the links is entirely up to you.  Regardless of any what you pass into the view helper, the "scaffold" of what is rendered to the page will remain the same:
```Html
<div class="pagination_container" <!-- all the data attributes will be contained in here --> >
	<span class="link_canvas">
   	<!-- The links will be drawn here -->
	</span>
	<div class='pagination_canvas'>
	<!-- The templates will be rendered here --> 
	</div>
</div>
```
No styling has been applied to any element so, by default, your links will be a block element that sits at the top left of the element in which it is contained.  The links that are generated will all be of class ```pagination_link``` and the currently selected page's link will have an added class of ```selected_page```. 
## Contributing

1. Fork it ( https://github.com/[my-github-username]/pagination_ajax/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
