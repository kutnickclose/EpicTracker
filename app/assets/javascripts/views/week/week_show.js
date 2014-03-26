window.Epictracker.Views.WeekShow = Backbone.CompositeView.extend({
	template: JST["weeks/show"],
	
	render: function () {
		content = this.template({
			week: this.model
		});
		this.$el.html(content);
		return this;
	},
	
	
})