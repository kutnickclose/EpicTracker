window.Epictracker.Views.ProjectShow = Backbone.CompositeView.extend({
	template: JST["projects/show"],
	
	initialize : function () {
		this.model.lists().fetch();
		this.listenTo(this.model.lists(), "add sync", this.render)
	},
	
	events : {
		"click .addStory" : "addStory"
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
				model: list
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
		this.addSubView('.icebox', view.render());
		// come back and finish this
	},
	
	_getIceBoxCollectionOfStories: function () {
		var iceboxStories = this.model.lists().findWhere({name: "icebox"}).stories()
		return iceboxStories
	},
	
	_getList: function () {
		var list = this.model.lists().findWhere({name: "icebox"})
		return list
	}
	
	
})