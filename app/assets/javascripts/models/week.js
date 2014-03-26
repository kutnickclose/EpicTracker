window.Epictracker.Models.Week = Backbone.Model.extend({
	urlRoot: function() {
		 return "api/lists/" + this.get("list_id") + "/weeks"
	}
	
})