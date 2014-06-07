JST = {
	'templates/test': function(obj){
		var __p=[];
		print=function(){
			__p.push.apply(__p,arguments);
		};
		with(obj||{}){
			__p.push('<div class=\'comment\'>\n\t',  comment ,' - ',  author ,'\n</div>\n');
		}
		
		return __p.join('');
	}
}