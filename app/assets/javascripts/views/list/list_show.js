window.Epictracker.Views.ListShow = Backbone.CompositeView.extend({
	template: JST["lists/show"],
	
	initialize: function (){
		this.model.stories().fetch();
		this.listenTo(this.model, "all", this.render)
		this.listenTo(this.model.stories(), "all", this.render)
	},
	
	events: {
		
	},
	
	render: function () {
		var content = this.template({
			list : this.model
		});
		this.$el.html(content);
		
		this.renderStories();
		return this
	},
	
	renderStories: function () {
		this.model.stories().each(function(story) {
			var view = new Epictracker.Views.StoryShow({
				model: story
			})
			this.addSubView('#stories', view.render());
		}, this);
	}
	
})