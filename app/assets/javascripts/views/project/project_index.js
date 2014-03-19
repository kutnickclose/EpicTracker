window.Epictracker.Views.ProjectsIndex = Backbone.View.extend({
	template: JST["projects/index"],
	
	initialize : function () {

	},
	
	events : {
		
	},
	
	render: function () {
		console.log(this.collection)
		var content = this.template({
			projects : this.collection
		});
		this.$el.html(content)
		return this	
	}
	
	
})