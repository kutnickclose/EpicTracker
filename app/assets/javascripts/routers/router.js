window.Epictracker.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(options) {
		this.projects = options.projects;
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"" : "index",
		"projects/new" : "new",
		"projects/:id" : "show"
	},
	
	index : function () {
		var projectIndex = new Epictracker.Views.ProjectsIndex({
			collection: this.projects
		})
		this._swapView(projectIndex)
	},
	
	show : function (id) {
		var that = this
		this._getProject(id, function(project) {
			projectShow = new Epictracker.Views.ProjectShow({
				model: project
			});
			that._swapView(projectShow);
		});
	 },
	
	_swapView : function(view) {
		if (this._currentView) {
			this._currentView.remove()
		};
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
	
	_getProject : function (id, callback) {
		var that = this;
		var project = Epictracker.projects.get(id);
		if (!project) {
			project = new Epictracker.Models.Post({
				id: id
			});
			project.collection = this.project;
			project.fetch({
				success: function () {
					that.projects.add(project)
					callback(project)
				}
			});
		} else {
			callback(project);
		}
	}
	
});