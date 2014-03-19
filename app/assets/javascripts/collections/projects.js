window.Epictracker.Collections.Projects = Backbone.Collection.extend({
	model: Epictracker.Models.Project,
	
	url: "/api/projects"
})