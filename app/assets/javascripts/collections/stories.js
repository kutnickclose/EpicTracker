window.Epictracker.Collections.Stories = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.list = options.list;
	},
	
	model: Epictracker.Models.Story,
	
	url: function() {
		 return "api/lists/" + this.list.id + "/stories"
	},
	
	comparator: function (story) {
		return story.get('rank')
	}
})