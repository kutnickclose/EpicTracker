window.Epictracker.Collections.Lists = Backbone.Collection.extend({
	model: Epictracker.Models.List,
	
	initialize: function(models, options) {
		this.project = options.project
	},
	
	url: function () {
		return this.project.url() + "/lists"
	}
	
})