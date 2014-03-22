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
		"click .save" : "updateStory",
		"click .delete" : "deleteStory"
	},
	
	updateStory: function(event) {
		event.preventDefault()
		view = this
		
		var storyTitle = this.$(".storyTitle").val();
		var storyType = this.$(".storyType option:selected").val();
		var storyPoints = this.$(".storyPoints").val();
		var storyDescription = this.$(".storyDescription").val();
		var storyRank = this.model.get('rank')
		var storyState = this.$(".storyState").val()
		
		this.model.set({
			title: storyTitle,
			story_type: storyType,
			points: storyPoints,
			description: storyDescription,
			rank: storyRank,
			list_id: this.list.get('id'),
			state: storyState
		});
		this.model.save();
		
	},
	
	deleteStory: function(event) {
		event.preventDefault()
		this.collection.remove(this.model)
		this.model.destroy()
	}
	
	
})