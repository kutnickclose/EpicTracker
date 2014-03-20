window.Epictracker.Views.ProjectShow = Backbone.CompositeView.extend({
	template: JST["projects/show"],
	
	initialize : function () {
		this.model.lists().fetch();
		this.listenTo(this.model.lists(), "add sync", this.render)
	},
	
	events : {
		
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
			console.log("this far")
			this.addSubView('#lists', view.render());
		}, this );
	}
	
	
})