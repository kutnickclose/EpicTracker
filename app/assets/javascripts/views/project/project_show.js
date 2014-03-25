window.Epictracker.Views.ProjectShow = Backbone.CompositeView.extend({
	template: JST["projects/show"],
	
	initialize : function () {
		this.model.lists().fetch();
		this.listenTo(this.model, "change:velocity", this.render)
		this.listenTo(this.model.lists(), "add remove sync", this.render)
	},
	
	events : {
		"click .addStory" : "addStory",
		"click .currentButton" : "toggleCurrent",
		"click .backlogButton" : "toggleBacklog",
		"click .iceboxButton" : "toggleIcebox",
		"dblclick .velocity" : "changeVelocity",
		"click .resetVelocity" : "resetVelocity"
	},
	
	render: function () {
		var content = this.template({
			project : this.model
		});
		this.$el.html(content);
		
		this.renderLists();
		
		return this	;
	},
	
	renderLists : function () {
		this.model.lists().each(function (list) {
			var view = new Epictracker.Views.ListShow({
				model: list,
				project: this.model
			});
			this.addSubView('#lists', view.render());
		}, this );
	},
	
	addStory: function () {
		var view = new Epictracker.Views.StoryForm({
			//stories-collection
			collection: this._getIceBoxCollectionOfStories(),
			//list
			list: this._getList()
		});
		this.addSubView('div.icebox .iceboxList1', view.render());
		// come back and finish this
	},
	
	_getIceBoxCollectionOfStories: function () {
		var iceboxStories = this.model.lists().findWhere({name: "icebox"}).stories()
		return iceboxStories
	},
	
	_getList: function () {
		var list = this.model.lists().findWhere({name: "icebox"})
		return list
	},
	
	toggleCurrent: function() {
		$(".current").toggleClass("hidden")
	},
	
	toggleBacklog: function() {
		$(".backlog").toggleClass("hidden")
	},
	
	toggleIcebox: function() {
		$(".icebox").toggleClass("hidden")
	},
	
	changeVelocity : function () {
		$(".velocity").toggleClass("hidden")
		$(".editVelocity").toggleClass("hidden")
	},
	
	resetVelocity : function (event) {
		event.preventDefault();
		var newVelo = this.$(".newVel").val();
		console.log(newVelo)
		var project = this.model;
		project.set({
			velocity: newVelo
		});
		project.save();
		
		// $(".velocity").toggleClass("hidden")
		// $(".editVelocity").toggleClass("hidden")
	}
	
	
})