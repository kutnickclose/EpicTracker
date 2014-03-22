window.Epictracker.Views.ProjectsIndex = Backbone.View.extend({
	template: JST["projects/index"],
	
	initialize : function () {
		this.listenTo(this.collection, "all", this.render)
	},
	
	events : {
		"click .add-project" : "addProject"
	},
	
	render: function () {
		var content = this.template({
			projects : this.collection
		});
		this.$el.html(content)
		return this	
	},
	
	addProject: function (event) {
		event.preventDefault()
		var that = this
		var projectName = this.$(".add-project-text").val()
		var newProject = new Epictracker.Models.Project({
			name: projectName
		});
		newProject.save({
			success: function () {
				that.collection.add(newProject)
				that.collection.fetch()
			}
		})
		
	}
	
	
})