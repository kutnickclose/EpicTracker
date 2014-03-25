window.Epictracker.Views.StoryShow = Backbone.CompositeView.extend({
	template: JST["stories/show"],
	
	initialize: function (options) {
		this.list = options.list
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
		return this;
	},
	
	renderEditForm: function (event) {
		debugger
		var editView = new Epictracker.Views.StoryEdit({
			model: this.model,
			list: this.list,
			collection: this.collection
		});
		this.$(".storyBlock").addClass("hidden")
		this.addSubView(".storyShow", editView.render())
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