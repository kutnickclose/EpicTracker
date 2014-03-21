window.Epictracker.Views.StoryEdit = Backbone.View.extend({
	initialize: function (options) {
		this.list = options.list
	},
	
	template: JST["stories/edit"],
	
	render: function () {
		content = this.template({
			story: this.model	
		});
		this.$el.html(content)
		
		return this
	},
	
	events: {
		"click .save" : "updateStory"
	},
	
	updateStory: function(event) {
		event.preventDefault()
		view = this
		
		var storyTitle = this.$(".storyTitle").val();
		var storyType = this.$(".storyType option:selected").val();
		var storyPoints = this.$(".storyPoints").val();
		var storyDescription = this.$(".storyDescription").val();
		var storyRank = this.model.get('rank')
		
		this.model.set({
			title: storyTitle,
			story_type: storyType,
			points: storyPoints,
			description: storyDescription,
			rank: storyRank,
			list_id: this.list.get('id')
		});
		this.model.save();
		
	}
	
	
})