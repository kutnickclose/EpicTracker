window.Epictracker.Models.List = Backbone.Model.extend({
	
	
	urlRoot: function () {
		return "api/projects/" + this.get("project_id") + "/lists"
	},
	
	parse: function(response) {
		if (response.stories){
			this.stories().set(response.stories, {parse: true});
			delete response.stories;
		}
		return response
	},
	// 
	stories: function() {
		if (!this._stories) {
			this._stories = new Epictracker.Collections.Stories([], { list: this });
		}
		return this._stories
	},
	
})