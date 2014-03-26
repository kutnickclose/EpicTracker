window.Epictracker.Models.List = Backbone.Model.extend({
	
	
	urlRoot: function () {
		return "api/projects/" + this.get("project_id") + "/lists"
	},
	
	parse: function(response) {
		if (response.stories){
			this.stories().set(response.stories, {parse: true});
			this.weeks().set(response.weeks, {parse: true});
			delete response.stories;
			delete response.weeks;
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
	
	weeks: function() {
		if (!this._weeks) {
			this._weeks = new Epictracker.Collections.Weeks([], { list: this });
		}
		return this._weeks
	},
	
})