window.Epictracker = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		Epictracker.projects = new Epictracker.Collections.Projects();
		Epictracker.projects.fetch({
			success: function() {
				new Epictracker.Routers.AppRouter({
					$rootEl: $("#content"),
					projects: Epictracker.projects
				});
				Backbone.history.start()
			},
			error: function () {
				console.log("failure")
			}
		});
  }
};

$(document).ready(function() {
  Epictracker.initialize();
});
