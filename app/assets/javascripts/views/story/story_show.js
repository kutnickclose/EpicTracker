window.Epictracker.Views.StoryShow = Backbone.CompositeView.extend({
	template: JST["stories/show"],
	
	initialize: function (options) {
		this.list = options.list
	},
	
	events: {
		"click .edit" : "renderEditForm"
	},
	
	render: function () {
		content = this.template({
			story: this.model
		});
		this.$el.html(content);
		return this;
	},
	
	renderEditForm: function (event) {
		var editView = new Epictracker.Views.StoryEdit({
			model: this.model,
			list: this.list
		});
		this.$(".storyBlock").addClass("hidden")
		this.addSubView(".storyShow", editView.render())
		//come back and change icebox to right element
	}
	
	
})