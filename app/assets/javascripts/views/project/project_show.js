window.Epictracker.Views.ProjectShow = Backbone.View.extend({
	template: JST["projects/show"],
	
	initialize : function () {

	},
	
	events : {
		
	},
	
	render: function () {
		var content = this.template({
			project : this.model
		});
		this.$el.html(content);
		return this	;
	}
	
	
})