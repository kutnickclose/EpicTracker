window.Epictracker.Views.ProjectsIndex = Backbone.View.extend({
	template: JST["projects/index"],
	
	initialize : function () {

	},
	
	events : {
		
	},
	
	render: function () {
		var content = this.template({
			projects : this.collection
		});
		this.$el.html(content)
		return this	
	}
	
	
})