window.Epictracker.Views.StoryShow = Backbone.CompositeView.extend({
	template: JST["stories/show"],
	
	initialize: function (options) {
		this.list = options.list;
		this.project = options.project;

	},
	
	tagName: "li",
	
	attributes: function () {
		return {
			"class": "storyShow " + "story" + this.model.get('id'),
			"data-rank": this.model.get('rank'),
			"data-id": this.model.get('id'),
			"data-list-id": this.model.get('list_id')
		}
	},
	
	events: {
		"click .edit" : "renderEditForm",
		"click .setZero" : "setZero",
		"click .setOne" : "setOne",
		"click .setTwo" : "setTwo",
		"click .setThree" : "setThree",
		"click .start" : "start",
		"click .finish" : "finish",
		"click .deliver" : "deliver",
		"click .accept" : "accept",
		"click .reject" : "reject",
		"click .restart" : "restart",
		"click .cancel" : "cancelStory"
	},
	
	cancelStory: function (event) {
		event.preventDefault()
		this.$(".storyBlock").removeClass("hidden");
		this.$(".editForm").addClass("hidden");
	},
	
	render: function () {
		content = this.template({
			story: this.model
		});
		this.$el.html(content);
		this.setStoryColors()
		return this;
	},
	
	setStoryColors: function () {
		if (this.model.get("state") === "started" || this.model.get("state") === "finished" || this.model.get("state") === "delivered" || this.model.get("state") === "rejected") {
			this.$el.addClass("started")
		} else if (this.model.get("state") === "accepted") {
			this.$el.addClass("accepted")
		}
	},
	
	
	
	renderEditForm: function (event) {
		var editView = new Epictracker.Views.StoryEdit({
			model: this.model,
			list: this.list,
			collection: this.collection
		});
		this.$(".storyBlock").addClass("hidden")
		
		this.addSubView(".storyEdit", editView.render())
		//come back and change icebox to right element
	},
	
	setZero: function () {
		this.model.set({
			points: '0',
			state: "unstarted"
		});
		this.model.save()
	},
	
	setOne: function () {
		this.model.set({
			points: '1',
			state: "unstarted"
		});
		this.model.save()
	},
	
	setTwo: function () {
		this.model.set({
			points: '2',
			state: "unstarted"
		});
		this.model.save()
	},
	
	setThree: function () {
		this.model.set({
			points: '3',
			state: "unstarted"
		});
		this.model.save()
	},
	
	start: function () {
		if (this.list.get("name") === "icebox") {
			var id = 2
		} else if (this.list.get("name") === "backlog") {
			var id = 1
		} else {
			var id = 0
		}
		var projectID = this.project.get('id') 
		var oldListId = this.list.get('id')
		var updatedStoryListId = this.list.get('id') + id
		var currentStoriesCollection = Epictracker.projects.get(projectID).lists().get(updatedStoryListId).stories()
		
		console.log(currentStoriesCollection.last())
		this.model.set({
			state: "started",
			list_id: this.list.get('id') + id,
			rank: currentStoriesCollection.last().get('rank') + 1
		});
		this.model.save();

	  Epictracker.projects.get(projectID).lists().get(oldListId).stories().remove(this.model);
	  Epictracker.projects.get(projectID).lists().get(updatedStoryListId).stories().add(this.model);

				// 
		// this.$el.attr("class", "storyShow started")
	},
	
	finish: function () {
		this.model.set({
			state: "finished"
		});
		this.model.save()
	},
	
	deliver: function () {
		this.model.set({
			state: "delivered"
		});
		this.model.save()
	},
	
	accept: function () {
		var rank = this.rankUponAcceptance()
		this.model.set({
			state: "accepted",
			rank: rank
		});
		this.model.save()
	},
	
	rankUponAcceptance: function () {
		var doneStories = new Array();
		
		this.collection.each(function(story) {
			if (story.get('state') === "accepted") {
				doneStories.push(story)
			}
		});
		
		if (doneStories[0]) {
			console.log(parseFloat(doneStories[doneStories.length-1].get('rank')))
			return parseFloat(doneStories[doneStories.length-1].get('rank')) + 0.01
		} else if (this.collection[0]){
			return parseFloat(this.collection[0].get('rank')) - 0.01
		} else {
			return 1
		};
	
	},
	
	
	reject: function () {
		this.model.set({
			state: "rejected"
		});
		this.model.save()
	},
	
	restart: function () {
		this.model.set({
			state: "started"
		});
		this.model.save()
	},
	
})