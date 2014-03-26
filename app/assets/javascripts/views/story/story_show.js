window.Epictracker.Views.StoryShow = Backbone.CompositeView.extend({
	template: JST["stories/show"],
	
	initialize: function (options) {
		this.list = options.list

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
		if (this.model.get("state") === "started" || this.model.get("state") === "finished" || this.model.get("state") === "delivered") {
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
		this.model.set({
			state: "started"
		});
		this.model.save()

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
		this.model.set({
			state: "accepted"
		});
		this.model.save()
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