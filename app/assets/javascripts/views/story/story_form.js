window.Epictracker.Views.StoryForm = Backbone.View.extend({
	initialize: function (options) {
		this.list = options.list
	},
	
	template: JST["stories/form"],
	
	render: function () {
		content = this.template()
		this.$el.html(content)
		return this
	},
	
	events: {
		"click .save" : "saveStory"
	},
	
	saveStory: function(event) {
		event.preventDefault()
		view = this
		
		var storyTitle = this.$(".storyTitle").val();
		var storyType = this.$(".storyType option:selected").val();
		var storyPoints = this.$(".storyPoints").val();
		var storyDescription = this.$(".storyDescription").val();
		var storyRank = this._getRank()
		// console.log(storyTitle)
		// console.log(storyType)
		// console.log(storyPoints )
		// console.log(storyDescription)
		// console.log(storyRank)
		
		var savedStory = new Epictracker.Models.Story({
			title: storyTitle,
			story_type: storyType,
			points: storyPoints,
			description: storyDescription,
			rank: storyRank,
			list_id: this.list.get('id')
		});
		
		savedStory.save({}, {
			success: function () {
				view.collection.add(savedStory);
			}
		});
		
	},
	
	_getRank: function () {
		if (!this.collection.first()) {
			return 100
		} else {
			return this.collection.sort().first().get('rank') / 2
		}
	}
	
	
})