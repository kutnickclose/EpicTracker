window.Epictracker.Views.StoryShow = Backbone.View.extend({
	template: JST["stories/show"],
	
	initialize: function () {
		
	},
	
	render: function () {
		content = this.template({
			story: this.model
		});
		this.$el.html(content);
		return this;
	}
	
	
})