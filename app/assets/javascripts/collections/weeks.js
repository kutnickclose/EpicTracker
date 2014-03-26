window.Epictracker.Collections.Weeks = Backbone.Collection.extend({
	initialize: function (models, options) {
		this.list = options.list;
	},
	
	model: Epictracker.Models.Week,
	
	url: function() {
		 return "api/lists/" + this.list.id + "/weeks"
	},
	
	comparator: function (week) {
		return week.get('week_num')
	}
})

